export interface ServiceItem{
    food:string;
    quantity:number;
}

export interface Booking {
    id:number;
    userId:number;
    totalprice:number;
    itens: ServiceItem[];
    deliveryTime: string;
    status: string;
}

export interface BookingCreate {
    userId:number;
    totalprice:number;
    itens: ServiceItem[];
    deliveryTime: string;
    status: string;
}