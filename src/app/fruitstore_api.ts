const axios = require('axios')

export interface IProduct {
    id: number,
    nombre: string,
    descripcion: string,
    precio: number
}

export interface IOrderInfo {
    totalPrice: number,
    orderId: number
}
export interface Order {
    id: number,
    precio: number
    us_telegram: string,
    estado: string,
    productos: Array<IProduct>,
    direccion: string
}

interface IProductRequest {
    producto_id: number,
    cantidad: number
}

export class FruitStoreApi {

    private apiUrl:string;

    constructor() {
        this.apiUrl = String(process.env.BASE_API_URL);
    }

    async getProducts(): Promise<IProduct[]> {
        const response = await axios.get(`${this.apiUrl}/producto`)
        const products:Array<IProduct> = await response.data
        return products;
    }

    async sendOrder(products: Array<string>, telegramUser:string) {
        var productsRequest: Array<IProductRequest> = new Array();

        products.forEach( element => {
            let [id,qty] = element.split('-');
            productsRequest.push({"producto_id": Number(id), "cantidad": Number(qty)})
        })
        var request = {"productos": productsRequest, "us_telegram": telegramUser, "estado": "En progreso"}
        const response = await axios.post(`${this.apiUrl}/pedido`, request)
        const order:Order = await response.data
        return {"totalPrice": order.precio, "orderId": order.id}
    }

    async getStatus(orderId: string): Promise<Order> {
        const response = await axios.get(`${this.apiUrl}/pedido/${orderId}`)
        const order: Order = await response.data
        return order;
    }

    async setAddress(telegramUser: string, address: string): Promise<Order> {
        const response = await axios.put(`${this.apiUrl}/pedido/telegram/${telegramUser}`, {"direccion": address})
        const updatedOrder: Order = await response.data;
        return updatedOrder;
    }
}