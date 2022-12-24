import "dotenv/config";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.TOKEN || "");

bot.command("start", (ctx) => ctx.reply("Welcome!"));
bot.on("text", (ctx) => ctx.reply("Got another message!"));

bot.launch();
