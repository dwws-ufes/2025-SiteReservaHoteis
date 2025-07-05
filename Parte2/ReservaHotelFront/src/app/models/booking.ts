import { Room } from "./room";

export class BookingItem{
    room!:Room;
    quantity:number = 1;

    get price():number{
        return this.room.price * this.quantity;
    }
}

export interface Booking {
    id: number;
    userId: number;
    price:number;
    checkIn: Date;
    checkOut: Date;
    roomId:number;
    roomQtd:number;
    adultsNumber:number;
    childNumber:number;
}

export interface BookingCreate {
    name:string;
    price:number;
    tags?:string[];
    favorite:boolean;
    stars:number;
    imageUrl:string;
    origins:string[];
    cookTime:string;
}