//   * --cmd=load
//     * --date=YYYY-MM-DD
//     * --to-file=$CSV_FILE_NAME     если не указать, то вывод в stdout
//     * --calc-sum-time
//
//   * --cmd=calc-sum-time
//     * --from-file=$CSV_FILE_NAME   если не указать, то чтение из stdin

import {ConfigTypes, defaultConfig} from "./config";

export const helpMsg = `
* --help

* --dry    - в этом режиме вместо выполнения операций удаления и добавления записей
             в redmine, будут выводиться сообщения в консоль

* --config=$JSON_FILE_NAME

* --cmd=save
  * --date=YYYY-MM-DD            - если в конфиге указано значение "date_source": "argument"
  * --from-file=$CSV_FILE_NAME   - если не указать, то чтение из stdin
  * --rewrite
  
---

Пример команды:


  
---

Пример конфига:

${JSON.stringify(defaultConfig, null, "  ")}

* csv - для этой секции более подробное описание по ссылке https://csv.js.org/parse/options/
* rules.columns - правила мапинга полей к колонкам в csv-файле, должны быть указаны синонимы для ${Object.values(ConfigTypes.COLUMN_KEYS)}
* time_type - тип для времени "hours"/"minutes"/"time"
* date_source - где искать дату "column"/"argument"
* issue_regexp - регулярка для определения номера задачи, наверное достаточно будет указать такое значение - "\\\\d+"
* date_format - формат даты, например yyyy-MM-dd
* redmine - параметры для работы с redmine
  * url
  * user_id - идентификатор вашего пользователя в redmine
  * default_issue - номер задачи по-умолчанию для трекинга времени 
  * activities - правила замены названий активностей на activity_id в вашем экземпляре Redmine
  
Дополнительные параметры для конфига:

* query - фильтр данных из csv-шки в sql подобном синтаксисе
          например: select * from ? where category = 'Работа'
`;

export function printHelpMsg(): void {
    console.log(helpMsg);
    process.exit(0);
}