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
            let command;
            let params;
            let message = ctx.message.text;
            if (routing.shouldContainParams(message)) {
                [command, params] = this.parseMessage(message)
            }
            routing.getHandler(String(command))(ctx, params)
        })
    }
}