import { ID, ISODate, ISODateTime, MealType } from "./core";

export interface MealPlan {
    id: ID;
    userId: ID;
    startDate: ISODate;
    endDate: ISODate;
    slots: MealSlot[];
    createdAt: ISODateTime;
    updatedAt: ISODateTime;
}

export interface MealSlot {
    id: ID;
    date: ISODate;
    type: MealType;
    entries: MealEntry[];
}

export interface MealEntry {
    recipeId: ID;
    servings: number;
    notes?: string;
}
