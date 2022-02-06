import {config} from "./config";
import axios from "axios";

export async function loadEntries(date: string): Promise<Record<string, any>> {
    const url = `${config.redmine.url}/time_entries.json`;
    const params = {
        user_id: config.redmine.user_id,
        from: date,
        to: date
    };
    const resp = await axios.get<Record<string, any>>(url, {params: params});
    if (!resp || resp.status !== 200 || !resp.data || !resp.data.time_entries) {
        throw new Error('Не удалось загрузить записи за дату');
    }
    return resp.data.time_entries;
}