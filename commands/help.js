const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "help",
  description: "Yardım komutlarını gösterir.",
  execute(message) {
    let embed = new MessageEmbed()
    .setTitle(`Yardım - Rythm Bot`)
    .addField('!help', `Bütün komutları ve açıklamaları gösterir.`, true)
    .addField('!loop', `Yeniden oynatmayı açıp kapatmanızı sağlar.`, true)
    .addField('!stop', `Çalan müziği durdurur.`, true)
    .addField('!play', `Youtube'den şarkı açmanızı sağlar.`, true)
    .addField('!playlist', `Youtube'den oynatma listesi açmanızı sağlar.`, true)
    .addField('!queue', `Müzik kuyruğunu gösterir.`, true)
    .addField('!remove', `Müzik kuyruğundan şarkı kaldırmanıza yarar.`, true)
    .addField('!resume', `Durdurulan müziği oynatmaya devam eder.`, true)
    .addField('!skip', `Çalan şarkıyı geçer.`, true)
    .addField('!stop', `Müziği durdurur.`, true)
    .addField('!volume', `Müziğin sesini değiştirir`, true)
    //.addField('Links!', `\n-[İnvite Link](https://discordapp.com/oauth2/authorize?client_id=661927248483450920&scope=bot&permissions=8)\n-[Supporter Server](https://discord.gg/CvzYypW)`)
    .setColor("#F8AA2A")
    .setTimestamp();
    return message.channel.send(embed);
  }
};
 