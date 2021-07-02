import { MessageParser } from '../utils/parser';
import { FruitStoreApi } from './fruitstore_api';
import {Pedido} from 'fruitstore_lib'

export class Routes {
    private fruitStoreApi: FruitStoreApi;

    constructor() {
        this.fruitStoreApi = new FruitStoreApi();
    }

    message_handlers : { [key: string]: Function } = {
        "/start": this.start.bind(this),
        "/productos": this.products.bind(this),
        "/pedir": this.order.bind(this),
        "/estado": this.status.bind(this),
        "/direccion": this.address.bind(this)
    }

    getHandler(message: string) {
        return this.message_handlers[message] || this.defaultMessage.bind(this);
    }

    shouldContainParams(command: string) {
        return command.match('pedir') || command.match('estado') || command.match('direccion')
    }

    start(ctx:any) {
        let name = ctx.from?.first_name || ctx.from?.username;
        let message = MessageParser.buildStartMessage(name);
        ctx.telegram.sendMessage(ctx.message.chat.id, message);
    }

    async products(ctx:any) {
        var products = await this.fruitStoreApi.getProducts()
        var message = MessageParser.buildProductListMessage(products)
        ctx.telegram.sendMessage(ctx.message.chat.id, message, {parse_mode: 'markdown'});
    }

    async order(ctx:any, params: string) {
        let orderInfo = await this.fruitStoreApi.sendOrder(params.split(','), ctx.from.username);
        let message = MessageParser.buildOrderMessage(orderInfo)
        ctx.telegram.sendMessage(String(ctx.chat?.id), message, {parse_mode: 'markdown'});
    }

    defaultMessage(ctx: any) {
        let message = MessageParser.buildDefaultMessage(ctx.message.text);
        ctx.telegram.sendMessage(ctx.message.chat.id, message)
    }

    async status(ctx: any, orderId: string) {
        let order: Pedido = await this.fruitStoreApi.getStatus(orderId);
        let message = MessageParser.buildOrderStatusMessage(order.estado);
        ctx.telegram.sendMessage(ctx.message.chat.id, message)
    }

    async address(ctx: any, address: string) {
        let updatedOrder: Pedido = await this.fruitStoreApi.setAddress(ctx.from.username, address);
        let message = MessageParser.buildAddressMessage(updatedOrder.id, updatedOrder.direccion)
        ctx.telegram.sendMessage(ctx.message.chat.id, message)
    }
}
