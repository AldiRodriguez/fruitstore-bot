import { Context, Telegraf } from 'telegraf'
import { Routes } from './routes'

export class BotClient {
    
    start() {
        const bot = new Telegraf(String(process.env.BOT_TOKEN));
        this.handleMessage(bot);
        bot.launch()
    }

    handleMessage(bot: Telegraf) {
        let routing = new Routes();
        bot.on("text", (ctx) => {
            let command = ctx.message.text;
            let params;
            if (routing.shouldContainParams(command)) {
                [command, params] = ctx.message.text.split(' ');
            }
            routing.getHandler(String(command))(ctx, params)
        })
    }
}