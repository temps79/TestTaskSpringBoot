import {RegionOptionInterface} from "./RegionOptionInterface";

export interface GroupedOptionInterface {
    readonly label: string;
    readonly options: readonly RegionOptionInterface[] | readonly RegionOptionInterface[];
}