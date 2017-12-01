export interface IGraphicalDetailData {
  result: IGraphicalResult;
}
export interface IGraphicalResult {
	examtype:String[],
    series:IGraphicalSeries[]
}

export interface IGraphicalSeries{
	label:string;
  	data:Object[];
}

export interface IDuration{
	label:string;
  start:any;
  end:any;
}
