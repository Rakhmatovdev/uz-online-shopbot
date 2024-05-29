const TelegramBot = require("node-telegram-bot-api");
const token = "7273943241:AAGusZs_J2bSazfW0aLg-UTVq7tlkh8rfWs";

const bot = new TelegramBot(token, { polling: true });

const botStart = () => {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "Jasur.inc platformasida bor kurslarni sotib olishingiz mumkin",{
            reply_markup:{
                keyboard:[
                    [
                        {
                            text:"Kurslarni ko'rish",
                            web_app:{
                                url:"https://uz-online-shopbot.vercel.app"
                            }
                        }
                    ]
                ]
            }
        }
      );
    }
  });
};
botStart();
