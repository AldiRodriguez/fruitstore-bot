
export class Routes {
    
    message_handlers : { [key: string]: Function } = {
        "/start": this.start
    }

    getHandler(message: string) {
        return this.message_handlers[message];
    }

    start(ctx:any) {
    
        let name = ctx.from?.first_name || ctx.from?.username;
        ctx.telegram.sendMessage(ctx.message.chat.id, `Holaaaa ${name}, pedinos fruta`);
    }
}