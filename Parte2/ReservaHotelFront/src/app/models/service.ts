export interface ServiceItem{
    food:string;
    quantity:number;
}

export interface Service {
    id:number;
    userId:string;
    totalprice:number;
    itens: ServiceItem[];
    deliveryTime: string;
    status: string;
}

export interface ServiceCreate {
    userId:string;
    totalprice:number;
    itens: ServiceItem[];
    deliveryTime: string;
    status: string;
}