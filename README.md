Redmine Time Manager
====================

Cli tool for redmine time managment

Main idea:

* You prepare configuration for transformation your csv for redmine time entries api format only once
* Regularly call this script for transfering your time entries and saving it in redmine

Examples
========

Transformation from Microsoft Excel or LibreOffice Calc or GoogleDocs Spreadsheets:

Your configuration (`config.json`) may be as:

```json
{
  "csv": {
    "delimiter": "\t",
    "columns": true,
    "encoding": "utf8",
    "quote": false
  },
  "rules": {
    "columns": {
      "issue": "Issue",
      "activity": "Action",
      "comment": "Description",
      "time": "Time"
    }
  },
  "time_type": "time",
  "date_source": "argument",
  "date_format": "yyyy-MM-dd",
  "issue_regexp": "\\d+",
  "redmine": {
    "url": "http://token@redmine.example.org",
    "user_id": 123,
    "default_issue": 456,
    "activities": {
      "Code": 1,
      "Code Review": 2,
      "Test": 3
    },
    "default_activity_code": 1
  }
}
```

Next for GNU/Linux with Xorg, you can select table, tap CTRL+C for coping in system clipboard, and call command:

```bash
xsel -o | redmine-time-manager save --config=config.json --date=2022-02-01 --rewrite
```

Or for other system you can save into csv file (for example `my-daily-time.csv`), and call command:

```bash
redmine-time-manager save --config=config.json --from-file=my-daily-time.csv --date=2022-02-01
```

Transformation from [Hamster Time Tracker](https://github.com/projecthamster/hamster):

Your configuration (`config.json`) may be as:

```json
{
  "csv": {
    "delimiter": "\t",
    "columns": true,
    "encoding": "utf8",
    "quote": false
  },
  "rules": {
    "columns": {
      "issue": "занятие",
      "activity": "метки",
      "comment": "описание",
      "time": "длительность в минутах",
      "date": "время начала",
      "category": "категория"
    }
  },
  "time_type": "minutes",
  "date_source": "column",
  "date_format": "yyyy-MM-dd HH:mm",
  "issue_regexp": "\\d+",
  "query": "select * from ? where category = 'Work'",
  "redmine": {
    "url": "http://token@redmine.example.org",
    "user_id": 123,
    "default_issue": 456,
    "activities": {
      "Code": 1,
      "Code Review": 2,
      "Test": 3
    },
    "default_activity_code": 1
  }
}
```

Hamster Time Tracker supported export reports to tsv format (csv by tab delimiters), and you can call command:

```bash
redmine-time-manager save --config=config.json --from-file=my-daily-time.tsv
```

Description of config params
============================

* `csv` - for this section see https://csv.js.org/parse/options/
* `rules.columns` - mapping rules for column names, must defined aliases for time, issue, activity, date, comment
* `time_type` - time format, may be "hours"/"minutes"/"time"
* `date_source` - source of date, may be "column"/"argument"
* `issue_regexp` - regexp of issue number, mostly - `"\\d+"`
* `date_format` - format of date, for example `yyyy-MM-dd`
* `redmine` - params for redmine
  * `url`
  * `user_id` - your user id
  * `default_issue` - default issue number
  * `activities` - mapping rules of activity_id aliases in your Redmine instance

Additional:

* `query` - filter of date like sql syntax \
  for example: `select * from ? where category = 'Work'`

# TOC

<!-- toc -->
* [TOC](#toc)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g redmine-time-manager
$ redmine-time-manager COMMAND
running command...
$ redmine-time-manager (--version)
redmine-time-manager/0.2.0 linux-x64 node-v16.13.1
$ redmine-time-manager --help [COMMAND]
USAGE
  $ redmine-time-manager COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`redmine-time-manager help [COMMAND]`](#redmine-time-manager-help-command)
* [`redmine-time-manager save`](#redmine-time-manager-save)

## `redmine-time-manager help [COMMAND]`

Display help for redmine-time-manager.

```
USAGE
  $ redmine-time-manager help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for redmine-time-manager.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `redmine-time-manager save`

Save time entries to redmine. Full documentation in README.

```
USAGE
  $ redmine-time-manager save -c <value> [--from-file <value>] [--date <value>] [--dry] [--rewrite]

FLAGS
  -c, --config=<value>  (required) [default: redmine-time-manager-config.json] Json config
  --date=<value>        Date. Must defined when config.date_source = "argument"
  --dry                 For testing calls. Delete and write operations will be disabled.
  --from-file=<value>   Csv file. If undefined, will use stdin
  --rewrite             Redmine data at choosed date will be rewrited.

DESCRIPTION
  Save time entries to redmine. Full documentation in README.

EXAMPLES
  $ redmine-time-manager save --config=config.json --date=2000-01-01 --rewrite --from-file=my-work-time.csv    # reading from csv file

  $ xsel -o | redmine-time-manager save --config=config.json --date=2000-01-01 --rewrite    # reading csv from stdin from Xorg clipboard
```

_See code: [dist/commands/save.ts](https://github.com/pavel-g/redmine-time-manager-cli/blob/v0.2.0/dist/commands/save.ts)_
<!-- commandsstop -->
