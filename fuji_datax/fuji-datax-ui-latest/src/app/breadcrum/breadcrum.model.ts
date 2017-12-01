
export class Duration {
  constructor(
    public start: string,
    public end: string,
    public label: string
  ) {  }
}

export interface defaultDuration {
  start: any;
  end: any;
  label: string;
}
