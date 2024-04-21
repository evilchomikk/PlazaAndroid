export interface ICity {
    cityName: string;
    latitude: number;
    longitude: number;
}

export interface IStatus {
    statusesName: string;
}

export interface IOrderMaker {
    id: number;
    username: string;
    password: string;
    currency: number;
}

export interface IOrderType {
    ordertypeName: string;
}

export interface IOrders {
    idCity: ICity;
    idStatuses: IStatus;
    idOrdermaker: IOrderMaker;
    idOrdertaker: null | IOrderMaker;
    idOrdertype: IOrderType;
    duration: string;
    value: number;
    isActive: number;
}