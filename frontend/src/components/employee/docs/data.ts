import {RegionOptionInterface} from "../../../interface/RegionOptionInterface";
import {GroupedOptionInterface} from "../../../interface/GroupOptionInterface";

export const CaoOptions: readonly RegionOptionInterface[] = [
    { label: 'Арбат', value: 'Арбат',region:'ЦАО' },
    { label: 'Замоскворечье', value: 'Замоскворечье',region:'ЦАО' },
    { label: 'Мещанский', value: 'Мещанский',region:'ЦАО' },
    { label: 'Таганский', value: 'Таганский',region:'ЦАО' },
    { label: 'Хамовники', value: 'Хамовники',region:'ЦАО' }
];

export const ZaoOptions: readonly RegionOptionInterface[] = [
    { label: 'Кунцево', value: 'Кунцево',region:'ЗАО' },
    { label: 'Раменки', value: 'Раменки',region:'ЗАО' },
    { label: 'Можайский', value: 'Можайский' ,region:'ЗАО'},
    { label: 'Новопеределкино', value: 'Новопеределкино',region:'ЗАО' },
    { label: 'Очаково-Матвеевское', value: 'Очаково-Матвеевское',region:'ЗАО' },
    { label: 'Проспект Вернадского', value: 'Проспект Вернадского' ,region:'ЗАО'}
];

export const UaoOptions: readonly RegionOptionInterface[] = [
    { label: 'Южный округ', value: 'Южный округ' ,region:'ЮАО'},
    { label: 'Бирюлево Восточное', value: 'Бирюлево Восточное',region:'ЮАО' },
    { label: 'Бирюлево Западное', value: 'Бирюлево Западное' ,region:'ЮАО'},
    { label: 'Братеево', value: 'Братеево' ,region:'ЮАО'},
    { label: 'Даниловский', value: 'Даниловский' ,region:'ЮАО'},
    { label: 'Донской', value: 'Донской',region:'ЮАО' },
    { label: 'Зябликово', value: 'Зябликово',region:'ЮАО' }
];




export const groupedOptions: readonly GroupedOptionInterface[] = [
    {
        label: 'ЦАО',
        options: CaoOptions,
    },
    {
        label: 'ЗАО',
        options: ZaoOptions,
    },
    {
        label: 'ЮАО',
        options: UaoOptions,
    },
];
