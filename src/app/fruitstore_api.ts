const axios = require('axios')
import {Pedido, Producto} from 'fruitstore_lib'

interface IProductRequest {
    id_producto: number,
    cantidad: number
}

export class FruitStoreApi {

    private apiUrl:string;

    constructor() {
        this.apiUrl = String(process.env.BASE_API_URL);
    }

    async getProducts(): Promise<Producto[]> {
        const response = await axios.get(`${this.apiUrl}/producto`)
        const products:Array<Producto> = await response.data
        return products;
    }

    async sendOrder(products: Array<string>, telegramUser:string): Promise<Pedido> {
        var productsRequest: Array<IProductRequest> = new Array();

        products.forEach( element => {
            let [id,qty] = element.split('-');
            productsRequest.push({"id_producto": Number(id), "cantidad": Number(qty)})
        })
        var request = {"productos": productsRequest, "us_telegram": telegramUser, "estado": "En progreso"}
        const response = await axios.post(`${this.apiUrl}/pedido`, request)
        const order:Pedido = await response.data
        return order;
    }

    async getStatus(orderId: string): Promise<Pedido> {
        const response = await axios.get(`${this.apiUrl}/pedido/${orderId}`)
        const order:Pedido = await response.data
        return order;
    }

    async setAddress(telegramUser: string, address: string): Promise<Pedido> {
        const response = await axios.put(`${this.apiUrl}/pedido/telegram/${telegramUser}`, {"direccion": address})
        const updatedOrder:Pedido = await response.data;
        return updatedOrder;
    }
}