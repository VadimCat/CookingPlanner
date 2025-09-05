import { ID, ISODateTime, MealType, Unit } from "./core";

export interface Recipe {
    id: ID;
    title: string;
    description?: string;
    mealTypes?: MealType[];
    tags?: string[];
    servings: number;
    ingredients: RecipeIngredient[];
    steps?: string[];
    prepTimeMin?: number;
    cookTimeMin?: number;
    createdBy?: ID;
    createdAt: ISODateTime;
    updatedAt: ISODateTime;
}

export interface RecipeIngredient {
    ingredientId: ID;
    quantity: number; // на базовые servings
    unit: Unit;
    optional?: boolean;
    note?: string;
}
