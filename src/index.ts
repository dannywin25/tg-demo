import "dotenv/config";
import TelegramBot, {
  InlineKeyboardMarkup,
  CallbackQuery,
} from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TG_BOT_TOKEN, { polling: true });
const CHANNEL_ID = process.env.TG_CHANNEL_ID;

// define buttons
const options: { reply_markup: InlineKeyboardMarkup } = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "Button1", url: "https://example.com" }, // URL
        { text: "Button2", callback_data: "button2" }, // Callback
      ],
    ],
  },
};

// send message with buttons to channel
bot.sendMessage(CHANNEL_ID, "Please choose:", options).then(() => {
  console.log("Send message successfully");
});

// handle callback
bot.on("callback_query", (query: CallbackQuery) => {
  const chatId = query.message?.chat.id;
  if (chatId) {
    bot.sendMessage(chatId, `You choose: ${query.data}`);
  }
  // answer callback to prevent timeout
  bot.answerCallbackQuery(query.id);
});
