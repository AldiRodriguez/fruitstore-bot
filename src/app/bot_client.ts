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
            routing.getHandler(String(ctx.message.text))(ctx)
        })
    }
}