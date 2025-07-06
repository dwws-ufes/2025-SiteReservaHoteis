import { Room } from "./room";

export interface Booking {
    id: number;
    price: number;
    checkIn: Date;
    checkOut: Date;
    roomQtd: number;
    adultsNumber: number;
    childNumber: number;
    
    userId: string;
    roomId: number;
    room?: Room;
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