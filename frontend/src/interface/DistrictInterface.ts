import {RegionInterface} from "./RegionInterface";

export interface DistrictInterface{
    district_id?:number;
    district_name?:string;
    region?:RegionInterface;
}