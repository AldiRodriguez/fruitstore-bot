import { Context, Telegraf } from 'telegraf'
import { Routes } from './routes'

export class BotClient {

    private bot:Telegraf;

    constructor() {
        this.bot = new Telegraf(String(process.env.BOT_TOKEN));
    }
    
    start() {
        this.handleMessage(this.bot);
        this.bot.launch()
    }

    parseMessage(message:string) {
        let input = message.split(' ');
        let command = input[0]
        let params = input.slice(1).join(' ');
        return [command, params]
    }

    handleMessage(bot: Telegraf) {
        let routing = new Routes();
        bot.on("text", (ctx) => {
            let command = ctx.message.text;
            let params;
            if (routing.shouldContainParams(command)) {
                [command, params] = this.parseMessage(ctx.message.text)
            }
            routing.getHandler(String(command))(ctx, params)
        })
    }
}