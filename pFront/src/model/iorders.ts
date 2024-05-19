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
    id: number;
    cityName: string;
    statusName: IStatus;
    idOrdermaker: IOrderMaker;
    idOrdertaker: null | IOrderMaker;
    orderTypeName: IOrderType;
    duration: string;
    value: number;
    isActive: boolean;
    x: number;
    y: number;
}