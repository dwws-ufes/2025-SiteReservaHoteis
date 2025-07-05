export interface ServiceItem{
    food:string;
    quantity:number;
}

export interface Service {
    id:number;
    userId:number;
    totalprice:number;
    itens: ServiceItem[];
    deliveryTime: string;
    status: string;
}

export interface ServiceCreate {
    userId:number;
    totalprice:number;
    itens: ServiceItem[];
    deliveryTime: string;
    status: string;
}