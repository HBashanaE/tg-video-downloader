const youtubedl = require("youtube-dl-exec");
const fs = require("fs");
import "dotenv/config";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.TOKEN || "");

bot.command("start", (ctx) => ctx.reply("Welcome!"));
bot.command("download", (ctx) => ctx.reply("Please enter video URL"));
bot.hears(/^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/, (ctx) => {
  youtubedl(ctx.message.text, {
    dumpSingleJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
  }).then((output: any) => {
    const { filesize, url } =
      output.requested_downloads[0].requested_formats[0];
    console.log(filesize);
    if(filesize < 20 * 1024 * 1024 * 1024){
      ctx.replyWithVideo(url);
    }
    ctx.reply(`I'm sorry. File size is greater than 20MB.\nHere is the url. You can manually downnload from it.\n${url}`);
  });
});

bot.launch();
