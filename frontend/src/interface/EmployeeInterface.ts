import {OperationMode} from "./OperationModeInterface";
import {HomeAddress} from "./HomeAddressInterface";

export interface Employee{
    fullName:string;
    age:number;
    operationMode?:OperationMode;
    homeAddresses?:HomeAddress;
}