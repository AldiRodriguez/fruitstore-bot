import { buildStartMessage, buildProductListMessage, buildOrderMessage,  buildDefaultMessage, buildOrderStatusMessage} from '../utils/parser';
import { FruitStoreApi } from './fruitstore_api'

export class Routes {
    public fruitStoreApi: FruitStoreApi;

    constructor() {
        this.fruitStoreApi = new FruitStoreApi();
    }

    message_handlers : { [key: string]: Function } = {
        "/start": this.start.bind(this),
        "/productos": this.products.bind(this),
        "/pedir": this.order.bind(this),
        "/estado": this.status.bind(this)
    }

    getHandler(message: string) {
        return this.message_handlers[message] || this.defaultMessage.bind(this);
    }

    shouldContainParams(command: string) {
        return command.match('pedir') || command.match('estado')
    }

    start(ctx:any, params: Array<string>) {
        let name = ctx.from?.first_name || ctx.from?.username;
        let message = buildStartMessage(name);
        ctx.telegram.sendMessage(ctx.message.chat.id, message);
    }

    products(ctx:any, params: Array<number>) {
        var products = this.fruitStoreApi.getProducts()
        var message = buildProductListMessage(products)
        ctx.telegram.sendMessage(ctx.message.chat.id, message, {parse_mode: 'markdown'});
    }

    order(ctx:any, params: string) {
        let orderInfo = this.fruitStoreApi.sendOrder(params.split(','));
        let message = buildOrderMessage(orderInfo)
        ctx.telegram.sendMessage(ctx.message.chat.id, message, {parse_mode: 'markdown'});
    }

    defaultMessage(ctx: any) {
        let message = buildDefaultMessage(ctx.message.text);
        ctx.telegram.sendMessage(ctx.message.chat.id, message)
    }

    status(ctx: any, orderId: string){
        let status = this.fruitStoreApi.getStatus(orderId);
        let message = buildOrderStatusMessage(status);
        ctx.telegram.sendMessage(ctx.message.chat.id, message)
    }
}
