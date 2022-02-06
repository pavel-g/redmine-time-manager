import {Options, parse as CsvParse} from 'csv-parse/sync';
import {args} from './args';
import * as fs from 'fs';
import {config} from "./config";
import axios from "axios";
import {loadEntries} from "./open";
import {ColumnConverter, filterByQuery, getDate, getItemForRedmine, TimeEntryForRedmine} from "./csv";
import {uniq} from "./utils";

function readContentFromFile(fileName: string): string {
    return fs.readFileSync(fileName, {encoding: 'utf8'});
}

async function readContentFromStdin(): Promise<string> {
    const GetStdin = await import('get-stdin');
    return await GetStdin.default();
}

async function readContent(): Promise<string> {
    let content;
    if (args['from-file']) {
        content = readContentFromFile(args['from-file']);
    } else {
        content = await readContentFromStdin();
    }
    return content;
}

function backupEntries(entries: Record<string, any>): void {
    const fileName = `entries-${args['date']}.json`;
    const content = JSON.stringify(entries);
    fs.writeFileSync(fileName, content, {encoding: "utf8"});
}

async function deleteEntries(entries: Record<string, any>): Promise<void> {
    await Promise.all(
        entries.map(async (entry: Record<string, any>) => {
            const url = `${config.redmine.url}/time_entries/${entry.id}.xml`;
            if (args['dry']) {
                console.log('Delete time entry:', {url, entry});
            } else {
                await axios.delete(url);
            }
        })
    );
}

async function cleanTimeEntries(items: TimeEntryForRedmine[]): Promise<void> {
    const dates = getUniqDates(items);
    for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        const entries = await loadEntries(date);
        backupEntries(entries);
        await deleteEntries(entries);
    }
}

async function saveItem(item: TimeEntryForRedmine): Promise<boolean> {
    const url = `${config.redmine.url}/time_entries.json`;
    const data = {
        time_entry: {
            issue_id: item.issue,
            spent_on: item.date,
            hours: item.time,
            activity_id: item.activity,
            comments: item.comment,
        }
    };
    const params = {
        user_id: config.redmine.user_id
    };
    if (args['dry']) {
        console.log('Save time entry:', {url, data, params: params});
    } else {
        const resp = await axios.post(url, data, {params: params});
        if (!resp || !resp.data) {
            console.error(`Не удалось сохранить в redmine запись `, item);
            return false;
        }
    }
    return true;
}

async function saveCsv(csvData: TimeEntryForRedmine[]): Promise<void> {
    let successCount = 0;
    for (let i = 0; i < csvData.length; i++) {
        const item = csvData[i];
        if (!item) {
            console.warn(`Не удалось получить данные для сохранения из записи:`, item);
            continue;
        }
        const saveResult = await saveItem(item);
        if (saveResult) successCount++;
    }
    console.log(`Сохранено записей: ${successCount}`);
}

export async function save(): Promise<void> {
    const content = await readContent();

    let csv: Record<string, any>[] = CsvParse(content, config.csv as Options);
    csv = ColumnConverter.convert(csv);
    csv = await filterByQuery(csv) as Record<string, any>[];

    const items = csv
      .map(item => {
          return {item: getItemForRedmine(item), raw: item};
      })
      .filter(item => {
          const exists = Boolean(item.item);
          if (!exists) console.warn('Не удалось получить данные из исходной записи', item.raw);
          return exists;
      })
      .map(item => item.item) as TimeEntryForRedmine[];

    if (args['rewrite']) await cleanTimeEntries(items);
    await saveCsv(items);
}

export function getUniqDates(items: TimeEntryForRedmine[]): string[] {
    if (config.date_source === "argument") {
        return [getDate(args['date'])];
    } else if (config.date_source === "column") {
        const dates = items.map(item => {
            return item.date;
        });
        return uniq(dates);
    }
    return [];
}
