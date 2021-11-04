import {RegionInterface} from "./RegionInterface";

export interface TerritoryInterface{
    id?:number;
    name?:string;
    territory?:TerritoryInterface;
}