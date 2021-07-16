import { MessageParser } from '../utils/parser';
import { FruitStoreApi } from './fruitstore_api';
import {Pedido} from 'fruitstore_lib'
import { Context } from 'telegraf'

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
        ctx.replyWithMarkdown(message)
    }

    async products(ctx:Context) {
        var products = await this.fruitStoreApi.getProducts()
        var message = MessageParser.buildProductListMessage(products)
        ctx.replyWithMarkdown(message)
    }

    async order(ctx:Context, params: string) {
        let orderInfo = await this.fruitStoreApi.sendOrder(params.split(','), ctx.message?.from.username);
        let message = MessageParser.buildOrderMessage(orderInfo)
        ctx.replyWithMarkdown(message)
    }

    defaultMessage(ctx: Context) {
        let message = MessageParser.buildDefaultMessage();
        ctx.replyWithMarkdown(message)
    }

    async status(ctx: Context, orderId: string) {
        let order: Pedido = await this.fruitStoreApi.getStatus(orderId);
        let message = MessageParser.buildOrderStatusMessage(order.estado);
        ctx.replyWithMarkdown(message)
    }

    async address(ctx: Context, address: string) {
        let updatedOrder: Pedido = await this.fruitStoreApi.setAddress(ctx.message?.from.username, address);
        let message = MessageParser.buildAddressMessage(updatedOrder.id, updatedOrder.direccion)
        ctx.replyWithMarkdown(message)
    }
}
