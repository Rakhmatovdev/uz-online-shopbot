const TelegramBot = require("node-telegram-bot-api");
const token = "7273943241:AAGusZs_J2bSazfW0aLg-UTVq7tlkh8rfWs";
const express = require('express')
const cors =require('cors')


const bot = new TelegramBot(token, { polling: true });
const app=express()

app.use(express.json())
app.use(cors())



    // bot.on('polling_error', (error) => {
    //     console.error('Polling error:', error.code, error.message);
    
    //     if (error.code === 'EFATAL') {
    //         console.log('Attempting to reconnect...');
    //         setTimeout(() => {
    //             bot.startPolling();
    //         }, 5000); // Retry after 5 seconds
    //     }
    // });


bot.setMyCommands([
    {command:"/start",description:"Kurs ha'qida ma'lumot"},
    {command:"/courses",description:"Barcha kurslar"},
    
])

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "Jasur.inc platformasida bor kurslarni sotib olishingiz mumkin",
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: "Kurslarni ko'rish",
                  web_app: {
                    url: "https://uz-online-shopbot.vercel.app",
                  },
                },
              ],
            ],
          },
        }
      );
    }
    if (msg.web_app_data?.data) {
        console.log(msg.web_app_data?.data);
      try {
        const data = JSON.parse(msg.web_app_data?.data);
        await bot.sendMessage(
          chatId,
          "Bizga ishonch bildirganingiz uchun rahmat, siz sotib olgan kurslar ro'yhati"
        );
        for (item of data) {
            await bot.sendPhoto(chatId,item.Image)
          await bot.sendMessage(chatId, `${item.title}-${item.quantity}x`);
        }

        await bot.sendMessage(
          chatId,
          `Umumiy narx: ${data
            .reduce((a, c) => a + c.price * c.quantity, 0)
            .toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}`
        );
      } catch (error) {
        console.log(error);
      }
    }

    if(text==='/courses'){
        await bot.sendMessage(
            chatId,
            "Jasur.inc platformasida bor kurslarni sotib olishingiz mumkin",{
                reply_markup:{
                    inline_keyboard:[[{text:"Kurslarni ko'rish",web_app:{url:"https://uz-online-shopbot.vercel.app",}}]]
                }
            })
    }

  });


app.post("/web-data",async (req,res)=>{
const {queryID,products}=req.body
try {
   await bot.answerWebAppQuery(queryID,{
    type:"article",
    id:queryID,
    title:"Muvaffaqiyatli xarid qildingiz",
    input_message_content:{
        message_text:`Xaridingiz bilan tabriklayman, siz${products
            .reduce((a, c) => a + c.price * c.quantity, 0)
            .toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })} qiymatga ega mahsulot sotib oldingiz, ${products.map((pr)=>`${pr.title} ${pr.quantity}x`).join(", ")}`
    }
   })
    

   return res.status(200).json({})

} catch (error) {
    return res.status(500).json({})
}
})

app.listen(process.env.PORT ||8000,()=>{
    console.log("Server started...");
})
