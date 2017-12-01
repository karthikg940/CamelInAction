export interface IPasswordConfig {
  pwdregex: string;
  isUpperCase: boolean;
  isLowerCase: boolean;
  isNumber: boolean;
  isSplChar: boolean;
  pwdminlen: number;
  sysgenpwd: number;
  userdfndpwdexp: number;
  pwdReuseRestriction: number;
  accntlockmax: number;
  tmplock:number;
  comments:string;
}