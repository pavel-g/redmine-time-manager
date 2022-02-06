import * as fs from "fs";
import * as Args from "./args";

export const defaultConfig: ConfigTypes.Config = {
    csv: {
        delimiter: "\t",
        columns: true,
        encoding: 'utf8',
        quote: false
    },
    rules: {
        columns: {
            "issue": "Задача",
            "activity": "Действие",
            "comment": "Комментарий",
            "time": "Время",
            "date": "Дата"
        }
    },
    date_format: 'yyyy-MM-dd',
    time_type: 'hours',
    date_source: "argument",
    issue_regexp: "\\d+",
    redmine: {
        url: 'http://token@redmine.example.org',
        user_id: 0,
        default_issue: 0,
        activities: {
            "Design": 8,
            "Code": 9,
            "Code Review": 90,
            "Analysis": 96,
            "Discuss": 10,
            "Test": 11,
            "Management": 12,
            "Documentation": 13,
            "Support": 14
        },
        default_activity_code: 96
    }
};

export function getConfig(force: boolean = false): ConfigTypes.Config {
    if (!force && !Args.args['config']) {
        return defaultConfig;
    }
    const configFileName = Args.args['config'];
    const configFileContent = fs.readFileSync(configFileName, {encoding: 'utf8'});
    const parsedConfig = JSON.parse(configFileContent);
    Object.assign(config, parsedConfig);
    return config;
}

export const config = getConfig();

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ConfigTypes {
    export const COLUMN_KEYS = {
        TIME: "time",
        ISSUE: "issue",
        ACTIVITY: "activity",
        DATE: "date",
        COMMENT: "comment"
    };
    export type Time = "hours"|"minutes"|"time";
    export type DateSource = "argument"|"column";
    export type DateFormat = string;
    export type Csv = {
        delimiter: string;
        columns: boolean;
        encoding: string;
        quote: boolean|string;
    };
    export type Rules = {
        columns: Record<string, string>
    };
    export type Redmine = {
        url: string;
        user_id: number;
        default_issue: number;
        activities: Record<string, number>,
        default_activity_code: number
    };
    export type Config = {
        csv: Csv;
        rules: Rules;
        time_type: Time;
        date_source: DateSource;
        redmine: Redmine;
        date_format: DateFormat;
        issue_regexp: string;
        query?: string;
    };
}
