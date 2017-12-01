export interface UserGroup {
  groupName: String;
  description: String;
  users: Object[];
  roles:Object[];
  permissions:Object[];
  userOrg:Object[];
}

export class Name {
	constructor(public id: number,
    public text: String) {}
}