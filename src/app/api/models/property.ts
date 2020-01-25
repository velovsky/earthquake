export interface Properties {
  mag: number;
  place: string;
  time: number;
  updated: number;
  tz: number;
  url: string;
  detail: string;
  felt: number;
  cdi: number;
  mmi: number;
  alert: Properties.AlertEnum;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst: number;
  dmin: number;
  rms: number;
  gap: number;
  magType: string;
  type: string;
}

// tslint:disable-next-line: no-namespace
export namespace Properties {
  export type AlertEnum = 'green' | 'yellow' | 'orange' | 'red';
  export const AlertEnum = {
      GREEN: 'green' as AlertEnum,
      YELLOW: 'yellow' as AlertEnum,
      ORANGE: 'orange' as AlertEnum,
      RED: 'red' as AlertEnum
  };
}
