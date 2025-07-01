import { CartItem, CartItemAmenities } from "./CartItem";
import { User } from "./User";

export class ServiceItem{
    client!: User;
    items!:CartItem[];
    totalprice!: number;
    deliveryTime!: string;
}

export class ServiceItemAmenities{
    client!: User;
    itemsAmenities!:CartItemAmenities[];
    totalprice!: number;
    deliveryTime!: string;
}