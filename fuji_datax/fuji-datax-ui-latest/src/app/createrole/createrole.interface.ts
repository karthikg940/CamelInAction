export interface RoleData {
  roleName: string;
  description: string;
  permission: Object[];
  organization:object[];
}

export class Name {
	constructor(public id: number,
    public text: string) {}
}
