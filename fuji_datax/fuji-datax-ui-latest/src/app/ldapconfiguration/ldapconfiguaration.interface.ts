export interface LdapData {
  directoryType: string;
  remoteServer: string;
  accessGroup: string;
  searchRoot: string;
  ldapPort: number;
  userDn: string;
  manageDn: string;
  managePassword: any;
}
