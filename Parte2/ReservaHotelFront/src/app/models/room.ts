export interface Room {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
}

export interface RoomCreate {
    name: string;
    price: number;
    imageUrl: string;
    description: string;
}