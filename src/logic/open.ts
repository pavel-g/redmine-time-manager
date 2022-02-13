import {config} from "./config";
import axios from "axios";

type TimeEntry = Record<string, any>;
type TimeEntriesResponse = {time_entries: TimeEntry[]};

export async function loadEntries(date: string): Promise<TimeEntry[]> {
    const url = `${config.redmine.url}/time_entries.json`;
    const params = {
        user_id: config.redmine.user_id,
        from: date,
        to: date
    };
    const resp = await axios.get<TimeEntriesResponse>(url, {params: params});
    if (!resp || resp.status !== 200 || !resp.data || !resp.data.time_entries) {
        throw new Error('Не удалось загрузить записи за дату');
    }
    return resp.data.time_entries;
}
