import { IRestaurante } from "./restaurante";
export interface IPrato {
    id: number,
    name: string,
    restauranteId: number,
    price: number,
    restaurante: IRestaurante
}