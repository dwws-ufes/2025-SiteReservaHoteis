import { Room } from "./Room";
import { User } from "./User";

export class Booking {
  id!: number;
  user!: User;
  checkIn!: Date;
  checkOut!: Date;
  room!: Room;
  roomQtd!: number;
  adultsNumber!: number;
  childNumber!: number;

  get totalPrice(): number{
        return this.room.price * this.roomQtd;
    }
 }
