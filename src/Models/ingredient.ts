import { ID, Unit } from "./core";

export interface Ingredient {
    id: ID;
    name: string;
    defaultUnit: Unit;
    defaultSectionId?: ID;
    densityGPerMl?: number;
    notes?: string;
    createdBy?: ID;
}

export interface Product {
    id: ID;
    ingredientId: ID;
    brand?: string;
    packageSize: number;
    packageUnit: Unit;
    sectionId?: ID;
    barcode?: string;
}
