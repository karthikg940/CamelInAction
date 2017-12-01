import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import {EndPoint} from './app.endpoints';
import { IDuration } from './app.model';

export abstract class AbstractService {

    constructor () {

    }



    protected getDurationString(duration:IDuration){

        console.log('duration',duration);
        if(duration && duration.label == "Past 24Hrs")
            return "fromDate=&toDate=";
        if(duration && duration.start && duration.end)
            return "fromDate="+duration.start.format('YYYY-MM-DD')+"&toDate="+duration.end.format('YYYY-MM-DD');
        return "fromDate=&toDate=";

    }

    protected getFilterString(filter:Object){
        let filterStr = "";
        for (let key in filter){
            if (filter.hasOwnProperty(key)) {
                filterStr = filterStr + "&" + key + "=" + filter[key];
            }
        }
        return filterStr;
    }

    protected getParamString(filter:Object){
        let paramStr:string;
        let first:boolean = true;
        for (let key in filter){
            if (filter.hasOwnProperty(key)) {
                if(first){
                    paramStr =  key + "=" + filter[key];
                    first = false;
                } else {
                    paramStr = paramStr + "&" + key + "=" + filter[key];
                }

            }
        }
        return paramStr;
    }

}
