import {Command, Flags} from '@oclif/core'
import {args} from "../logic/args";
import {save} from "../logic/save";
import {getConfig} from "../logic/config";

export default class Save extends Command {
  static description = "Save time entries to redmine. Full documentation in README.";

  static examples = [
    '$ <%= config.bin %> <%= command.id %> --config=config.json --date=2000-01-01 --rewrite --from-file=my-work-time.csv    # reading from csv file',
    '$ xsel -o | <%= config.bin %> <%= command.id %> --config=config.json --date=2000-01-01 --rewrite    # reading csv from stdin from Xorg clipboard',
  ]

  static flags = {
    config: Flags.string({char: 'c', description: 'Json config', required: true, default: 'redmine-time-manager-config.json'}),
    'from-file': Flags.string({description: 'Csv file. If undefined, will use stdin', default: ''}),
    date: Flags.string({description: 'Date. Must defined when config.date_source = "argument"', default: ''}),
    dry: Flags.boolean({description: 'For testing calls. Delete and write operations will be disabled.', default: false}),
    rewrite: Flags.boolean({description: 'Redmine data at choosed date will be rewrited.', default: false})
  }

  static args = []

  public async run(): Promise<void> {
    const {flags} = await this.parse(Save)
    args.cmd = 'save';
    args.dry = flags.dry;
    args.date = flags.date;
    args["from-file"] = flags["from-file"];
    args.config = flags.config;
    args.rewrite = flags.rewrite;
    getConfig(true);
    await save();
  }
}
