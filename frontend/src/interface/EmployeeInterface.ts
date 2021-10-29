import {OperationMode} from "./OperationModeInterface";
import {HomeAddress} from "./HomeAddressInterface";

export interface Employee{
    emp_id?:number
    fullName:string;
    age:number;
    operationMode?:OperationMode;
    homeAddresses?:HomeAddress;
}