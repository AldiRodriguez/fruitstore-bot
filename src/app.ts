import express from 'express';
import { BotClient } from './app/bot_client';
import 'dotenv/config'

const app = express();
const port = process.env.PORT;

new BotClient().start();

app.get('/', (req: any, res: any) => {
    res.send('OK')
});

app.listen(port, (err: any) =>{
    if (err){
        return console.error;
    }
    return console.log(`Server listening on port ${port}`);
})
