import { IOrderInfo, IProduct } from "../app/fruitstore_api";


export function buildStartMessage(name: string): string {
    return `Hola, ${name}! Bienvenido a verdubot.\nLos comandos disponibles son los siguientes:\n 
    - /productos: obtener la lista de productos disponibles
    - /pedir: realizar un pedido. Para eso tenes que enviar la lista de codigos de los productos que deseas pedir seguido del comando. Ejemplo /pedir 1,2,3 
    `;
}

export function buildOrderMessage(orderInfo: IOrderInfo): string {
    if (!orderInfo) {
        return "Tenes que enviar los codigos del producto para realizar el pedido.\nEjemplo /pedir 1,2,3 ";
    }
    return `El pedido fue registrado exitosamente en nuestro sistema!
    Numero de pedido: ${orderInfo.orderId}
    Precio total: ${orderInfo.totalPrice}
    Recorda que podes consultar el estado del mismo ingresando a /estado seguido del numero de pedido
    `;
}

export function buildDefaultMessage(text: string): string {
    return `El comando ${text} no es válido. Para ver los comandos disponibles ingresa /start`;
}

export function buildProductListMessage(products: Array<IProduct>) {
    let message = "Productos disponibles: \n\n"
    products.forEach(element => {
        let formatedMessage = `*${element.name}*
         - Código: ${element.id}
         - Descripción: ${element.description}
         - Precio: $${element.price}\n`
        message += formatedMessage;
    });
    return message;
}

export function buildOrderStatusMessage(status: string) {
    return `Tu pedido se encuentra ${status}`;
}