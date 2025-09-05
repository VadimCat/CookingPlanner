import {ID, ISODateTime, MeasurementSystem, WeekStart} from "./core";

export interface User {
    id: ID;
    displayName: string;
    email?: string;
    createdAt: ISODateTime;
    settings: UserSettings;
}

export interface UserSettings {
    locale?: string;
    measurementSystem: MeasurementSystem;
    weekStart: WeekStart;
    defaultStoreLayoutId?: ID;
}