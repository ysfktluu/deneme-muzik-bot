const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "help",
  description: "Yardım komutlarını gösterir.",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(`Yardım - Rythm Bot`)
      .setDescription("Bütün komutlar!")
    .addField('!help', `Bütün komutları ve açıklamaları gösterir.`)
    .addField('!loop', `Yeniden oynatmayı açıp kapatmanızı sağlar.`)
    .addField('!stop', `Çalan müziği durdurur.`)
    .addField('!play', `Youtube'den şarkı açmanızı sağlar.`)
    .addField('!playlist', `Youtube'den oynatma listesi açmanızı sağlar.`)
    .addField('!queue', `Müzik kuyruğunu gösterir.`)    
    .addField('!remove', `Müzik kuyruğundan şarkı kaldırmanıza yarar.`)
    .addField('!resume', `Durdurulan müziği oynatmaya devam eder.`)
     .addField('!skip', `Çalan şarkıyı geçer.`)
     .addField('!stop', `Müziği durdurur.`)
     .addField('!volume', `Müziğin sesini değiştirir`)
    .addField('Links!', `\n-[İnvite Link](https://discordapp.com/oauth2/authorize?client_id=661927248483450920&scope=bot&permissions=8)\n-[Supporter Server](https://discord.gg/CvzYypW)`)
      .setColor("#F8AA2A");

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed);
    
  }
};
 