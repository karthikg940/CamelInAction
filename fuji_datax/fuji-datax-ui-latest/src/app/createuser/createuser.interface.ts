export interface User {
  title: string;
  firstName: string;
  prefix: string;
  lastName: string;
  userName: string;
  phone: any;
  email: string;
  phoneCountryCode:any;
  phoneStateCode:any;
  activePrivilegeList: Object[];
  activeRoleList: Object[];
  activeGroupList: Object[];
  activeOrgList: Object[];
}
export class Name {
	constructor(public id: number,
    public text: String) {}
}