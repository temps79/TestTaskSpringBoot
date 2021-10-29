import {DistrictInterface} from "./DistrictInterface";

export interface HomeAddress{
    adr_id?:number;
    address?:string;
    district?:DistrictInterface;
}