import {config, ConfigTypes} from "./config";
import {DateTime, Duration} from "luxon";
import {args} from "./args";
import {invert} from "./utils";

export function getFieldNameByKey(key: string): string {
    if (!config.rules.columns[key]) {
        console.warn(`Не удалось найти название колонки для поля ${key}`);
        return "";
    }
    return config.rules.columns[key];
}

export const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

export namespace ColumnConverter {

    let rules: Record<string, string>|null = null;

    function getRules(): Record<string, string> {
        if (rules) return rules;
        rules = invert(config.rules.columns);
        return rules;
    }

    function convertItem(item: Record<string, any>): void {
        const rules = getRules();
        let key: string;
        for (key in item) {
            if (rules.hasOwnProperty(key)) {
                const newKey = rules[key];
                item[newKey] = item[key];
            }
        }
    }

    export function convert(data: Record<string, any>[]): Record<string, any>[] {
        for (let i = 0; i < data.length; i++) {
            convertItem(data[i]);
        }
        return data;
    }

}

export const FRACTION_DIGITS = 2;

export function getHours(src: string|number): number {

    if (typeof src === 'number') return Number(src.toFixed(FRACTION_DIGITS));

    if (typeof src !== 'string') throw new Error(`Недопустимое значение ${src}`);

    // time, for example 12:34
    const timeParts = src.split(':');
    if (timeParts && timeParts.length >= 2) {
        const [hours, minutes] = timeParts;
        const interval = Duration.fromObject({hours: Number(hours), minutes: Number(minutes)});
        return Number(interval.as('hours').toFixed(FRACTION_DIGITS));
    }

    // hours, for example 12.34 or 12,34
    let s = Number(src.replace(',', '.'));
    if (isFinite(s)) {
        if (config.time_type === "minutes") {
            s = s / 60;
        }
        return Number(s.toFixed(FRACTION_DIGITS));
    }

    throw new Error(`Не удалось определить время в часах из значения ${src}`);

}

export function getDate(src: string): string {
    return DateTime
      .fromFormat(src, config.date_format || DEFAULT_DATE_FORMAT)
      .toFormat(DEFAULT_DATE_FORMAT);
}

export async function filterByQuery(data: Record<string, any>[]): Promise<Record<string, any>[]> {
    if (!config.query) return data;
    const alasql: any = await import('alasql');
    return alasql(config.query, [data]);
}

export type TimeEntryForRedmine = {
    issue: number;
    activity: number;
    comment: string;
    time: number;
    date: string;
}

export function getItemForRedmine(item: Record<string, any>): TimeEntryForRedmine|null {

    const KEYS = ConfigTypes.COLUMN_KEYS;

    let issue: number;
    if (!item[KEYS.ISSUE]) {
        issue = config.redmine.default_issue;
    } else {
        const rawIssue: string = item[KEYS.ISSUE];
        const parseIssueRe = new RegExp(config.issue_regexp);
        const parsedResult = rawIssue.match(parseIssueRe);
        if (!parsedResult) {
            issue = config.redmine.default_issue;
        } else if (parsedResult[0]) {
            issue = Number(parsedResult[0]);
        } else {
            issue = config.redmine.default_issue;
        }
    }

    let activity: number;
    if (!item[KEYS.ACTIVITY] || !config.redmine.activities[item[KEYS.ACTIVITY]]) {
        activity = config.redmine.default_activity_code;
    } else {
        const activityName = item[KEYS.ACTIVITY];
        activity = config.redmine.activities[activityName];
    }

    const comment: string = item[KEYS.COMMENT] || '';

    if (!item.hasOwnProperty(KEYS.TIME)) throw new Error(`Не указано время в записи ${JSON.stringify(item)}`);

    const time = getHours(item[KEYS.TIME]);

    let date: string;
    if (config.date_source === "column") {
        date = getDate(item[KEYS.DATE] || '');
    } else {
        date = getDate(args['date']);
    }

    return {
        issue: issue,
        activity: activity,
        comment: comment,
        time: time,
        date: date
    };

}
