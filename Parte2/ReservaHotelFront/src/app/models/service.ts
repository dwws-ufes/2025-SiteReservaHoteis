import { Food } from "./food";

export interface ServiceItem{
    foodId: number;
    food?: Food;
    qtd: number;
}

export interface Service {
    id:number;
    userId:string;
    price:number;
    serviceItems: ServiceItem[];
    deliveryTime: string;
    status: string;
}

export interface ServiceCreate {
    userId: string;
    price: number;
    serviceItems: ServiceItem[];
    deliveryTime: string;
    status: string;
}