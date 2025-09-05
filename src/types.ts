export interface Dish {
  name: string;
  portions: number;
}

export type Plan = Record<string, Record<string, Dish[]>>;
