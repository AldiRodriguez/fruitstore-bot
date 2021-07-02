import {Producto, Pedido} from 'fruitstore_lib'

export module MessageParser {

    export function buildStartMessage(name: string): string {
        return `Hola, ${name}! Bienvenido a verdubot.\nLos comandos disponibles son los siguientes:\n 
        - /productos: obtener la lista de productos disponibles
        - /pedir: realizar un pedido. Para eso tenes que enviar la lista de codigos de los productos que deseas pedir y la cantidad luego del comando. Ejemplo /pedir 1-4,2-5
        - /estado: obtener el estado de un pedido. Ejemplo /estado 897
        - /direccion: indicar la dirección de entrega. Ejemplo /direccion Mi calle 321
        `;
    }

    export function buildOrderMessage(orderInfo: Pedido): string {
        if (!orderInfo) {
            return "Tenes que enviar los codigos del producto para realizar el pedido.\nEjemplo /pedir 1,2,3 ";
        }
        return `El pedido fue registrado exitosamente en nuestro sistema!
        Numero de pedido: ${orderInfo.id}
        Precio total: $${orderInfo.precio}
        Es importante que nos indiques la dirección de entrega utilizando el comando /direccion
        Recorda que podes consultar el estado del mismo ingresando a /estado seguido del numero de pedido
        `;
    }

    export function buildDefaultMessage(text: string): string {
        return `El comando ${text} no es válido. Para ver los comandos disponibles ingresa /start`;
    }

    export function buildProductListMessage(products: Array<Producto>) {
        let message = "Productos disponibles: \n\n"
        products.forEach(element => {
            let formatedMessage = `*${element.nombre}*
            - Código: ${element.id}
            - Descripción: ${element.descripcion}
            - Precio: $${element.precio}\n`
            message += formatedMessage;
        });
        return message;
    }

    export function buildOrderStatusMessage(status: string) {
        return `Tu pedido se encuentra ${status}`;
    }

    export function buildAddressMessage(orderId: number, address: string) {
        return `La dirección de su pedido: ${orderId} fue actualizada correctamente. El pedido se entregará a ${address}`
    }
}