import { ID, ISODate, ISODateTime, Unit } from "./core";

export interface PantryItem {
    id: ID;
    userId: ID;
    ingredientId: ID;
    quantity: number;
    unit: Unit;
    expiresAt?: ISODate;
    updatedAt: ISODateTime;
}