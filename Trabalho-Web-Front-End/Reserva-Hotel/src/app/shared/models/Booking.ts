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
  totalPrice!: number;

//   constructor(init?: Partial<Booking>) {
//     Object.assign(this, init);
//     this.calcularPrecoTotal();
//   }

//   private calcularPrecoTotal() {
//     this.totalPrice = this.roomQtd * this.room.price;
//   }
 }
