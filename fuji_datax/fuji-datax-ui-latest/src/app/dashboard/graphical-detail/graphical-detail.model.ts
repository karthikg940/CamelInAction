export interface IOptions {
  result: IScales
}
export interface IScales {
	xAxes:IxAxes[],
    yAxes:IyAxes[]
}

export interface IxAxes{
	stacked:Boolean
}

export interface IyAxes{
	stacked:Boolean,
  	ticks:Object
}
