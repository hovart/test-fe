import {Product} from "@/interfaces/Product";

export interface Cart {
    id: number;
    quantity: number;
    product: Product
}
