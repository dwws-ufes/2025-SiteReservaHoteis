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
    userId: string;
    price:number;
    checkIn: Date;
    checkOut: Date;
    roomId:number;
    roomQtd:number;
    adultsNumber:number;
    childNumber:number;
}

export interface BookingCreate {
    userId: string;
    price: number;
    checkIn: Date;
    checkOut: Date;
    roomId:number;
    roomQtd:number;
    adultsNumber:number;
    childNumber:number;
}