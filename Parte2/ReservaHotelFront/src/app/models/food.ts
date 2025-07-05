export interface Food {
    id:number;
    name:string;
    price:number;
    tags?:string[];
    // favorite:boolean;
    // stars:number;
    imageUrl:string;
    origins:string[];
    cookTime:string;
}

export interface FoodCreate {
    name:string;
    price:number;
    tags?:string[];
    // favorite:boolean;
    // stars:number;
    imageUrl:string;
    origins:string[];
    cookTime:string;
}