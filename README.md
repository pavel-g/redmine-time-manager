oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g redmine-time-manager-2
$ redmine-time-manager COMMAND
running command...
$ redmine-time-manager (--version)
redmine-time-manager-2/0.0.0 linux-x64 node-v16.13.1
$ redmine-time-manager --help [COMMAND]
USAGE
  $ redmine-time-manager COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`redmine-time-manager hello PERSON`](#redmine-time-manager-hello-person)
* [`redmine-time-manager hello world`](#redmine-time-manager-hello-world)
* [`redmine-time-manager help [COMMAND]`](#redmine-time-manager-help-command)
* [`redmine-time-manager plugins`](#redmine-time-manager-plugins)
* [`redmine-time-manager plugins:inspect PLUGIN...`](#redmine-time-manager-pluginsinspect-plugin)
* [`redmine-time-manager plugins:install PLUGIN...`](#redmine-time-manager-pluginsinstall-plugin)
* [`redmine-time-manager plugins:link PLUGIN`](#redmine-time-manager-pluginslink-plugin)
* [`redmine-time-manager plugins:uninstall PLUGIN...`](#redmine-time-manager-pluginsuninstall-plugin)
* [`redmine-time-manager plugins update`](#redmine-time-manager-plugins-update)
* [`redmine-time-manager save [FILE]`](#redmine-time-manager-save-file)

## `redmine-time-manager hello PERSON`

Say hello

```
USAGE
  $ redmine-time-manager hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/pavel-g/redmine-time-manager-cli/blob/v0.0.0/dist/commands/hello/index.ts)_

## `redmine-time-manager hello world`

Say hello world

```
USAGE
  $ redmine-time-manager hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

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

## `redmine-time-manager plugins`

List installed plugins.

```
USAGE
  $ redmine-time-manager plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ redmine-time-manager plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `redmine-time-manager plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ redmine-time-manager plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ redmine-time-manager plugins:inspect myplugin
```

## `redmine-time-manager plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ redmine-time-manager plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ redmine-time-manager plugins add

EXAMPLES
  $ redmine-time-manager plugins:install myplugin 

  $ redmine-time-manager plugins:install https://github.com/someuser/someplugin

  $ redmine-time-manager plugins:install someuser/someplugin
```

## `redmine-time-manager plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ redmine-time-manager plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ redmine-time-manager plugins:link myplugin
```

## `redmine-time-manager plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ redmine-time-manager plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ redmine-time-manager plugins unlink
  $ redmine-time-manager plugins remove
```

## `redmine-time-manager plugins update`

Update installed plugins.

```
USAGE
  $ redmine-time-manager plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `redmine-time-manager save [FILE]`

Save time entries to redmine

```
USAGE
  $ redmine-time-manager save [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Save time entries to redmine

EXAMPLES
  $ redmine-time-manager save
```

_See code: [dist/commands/save.ts](https://github.com/pavel-g/redmine-time-manager-cli/blob/v0.0.0/dist/commands/save.ts)_
<!-- commandsstop -->
