export type Args = {
  config: string;
  cmd: string;
  help: boolean;
  "from-file": string;
  date: string;
  dry: boolean;
  rewrite: boolean;
};

export const args: Args = {
  config: '',
  cmd: '',
  help: false,
  "from-file": '',
  date: '',
  dry: true,
  rewrite: false
};
