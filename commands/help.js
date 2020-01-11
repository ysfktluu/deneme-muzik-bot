const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle("Help - BetterMusic")
      .setDescription("List of all commands!")
    .addField('!help', `Display all commands and descriptions`)
    .addField('!loop', `Toggle music loop`)
    .addField('!pause', `Pause the currently playing music`)
    .addField('!play', `Plays audio from YouTube`)
    .addField('!playlist', `Play a playlist from youtube`)
    .addField('!queue', `Show the music queue and now playing.`)    
    .addField('!remove', `Remove song from the queue`)
    .addField('!resume', `Resume currently playing music`)
     .addField('!skip', `Skip the currently playing song`)
     .addField('!stop', `Stops the music`)
     .addField('!volume', `Change volume of currentply playing voiceConnection`)
    .addField('Links!', `\n-[İnvite Link](https://discordapp.com/oauth2/authorize?client_id=661927248483450920&scope=bot&permissions=8)\n-[Supporter Server](https://discord.gg/CvzYypW)`)
      .setColor("#F8AA2A");

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed);
    
  }
};
 