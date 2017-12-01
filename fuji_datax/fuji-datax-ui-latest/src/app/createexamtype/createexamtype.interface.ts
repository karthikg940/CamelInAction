export class CptCode {
	constructor(public id: number,
    public text: string) {}
}

export interface ExamType {
	examTypeName:string;
	examTypeDesc:string;
	examTypeAlias:object[];
	worksheets:string;
	manCptCode:object[];
	tagNames:object[];
	templateName:string;
	optCptCode:object[];
}
 