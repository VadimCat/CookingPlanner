import { ID, ISODateTime, Unit } from "./core";

export interface ShoppingList {
    id: ID;
    userId: ID;
    planId?: ID;
    storeLayoutId?: ID;
    items: ShoppingItem[];
    createdAt: ISODateTime;
    updatedAt: ISODateTime;
}

export type ShoppingItemSource =
    | { kind: "plan"; recipeId: ID; slotId: ID }
    | { kind: "manual" };

export interface ShoppingItem {
    id: ID;
    ingredientId?: ID;
    customName?: string;
    quantity: number;
    unit: Unit;
    sectionId?: ID;
    checked: boolean;
    note?: string;
    source: ShoppingItemSource;
}

// type guards
export const isManualItem = (s: ShoppingItemSource): s is { kind: "manual" } =>
    s.kind === "manual";

export const isPlanItem = (
    s: ShoppingItemSource
): s is { kind: "plan"; recipeId: ID; slotId: ID } => s.kind === "plan";
