export interface IProduct {
    id: number,
    name: string,
    description: string,
    price: number
}

export interface IOrderInfo {
    totalPrice: number,
    orderId: number
}
export class FruitStoreApi {

    private products = [
        {
            "id": 123,
            "name": "Bolson Verduras",
            "description": "5kg de verduras de estación",
            "price": 400
        },
        {
            "id": 879,
            "name": "Bolson Frutas",
            "description": "5kg de frutas de estación",
            "price": 400
        },
        {
            "id": 123879,
            "name": "Bolson Mix",
            "description": "8kg de frutas y verduras de estación",
            "price": 600
        },
        {
            "id": 1,
            "name": "Bandeja de champiñones",
            "description": "250gr de champiñones",
            "price": 250
        },
        {
            "id": 2,
            "name": "Bandeja de frutillas",
            "description": "250gr de frutillas",
            "price": 200
        },
        {
            "id": 3,
            "name": "Palta",
            "description": "Palta hass por unidad",
            "price": 100
        }
    ]

    getProducts(): Array<IProduct> {
        return this.products;
    }

    sendOrder(products: Array<string>) {
        var totalPrice:number = 0;
        console.log(products);
        products.forEach( element => {
            let price = this.products.filter(product => product.id == Number(element)).map(element => element.price).pop() || 0
            totalPrice += price;
        })

        return {"totalPrice": totalPrice, "orderId": Date.now()}
    }

    getStatus(orderId: string) {
        return "En preparación";
    }
}