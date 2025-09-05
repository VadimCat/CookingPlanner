import { ID, ISODateTime } from "./core";

export interface StoreLayout {
    id: ID;
    userId: ID;
    name: string;
    sections: StoreSection[];
    createdAt: ISODateTime;
    updatedAt: ISODateTime;
}

export interface StoreSection {
    id: ID;
    name: string;
}