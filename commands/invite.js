module.exports = {
  name: "invite",
  description: "Bot Links!",
  execute(message) {
    

${serverQueue.songs.map((song, index) => index + 1 + ". " + song.title).join("\n")}

Now playing: **${serverQueue.songs[0].title}**
		`,
        { split: true }
      )
      .catch(console.error);
  }
};





module.exports.run = async (client, bot, message, args, perms, Discord, db, rivalmarket, embed) => {
  const s = embed
  .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
  .setTitle(`Links`)
  .setDescription(`
-[İnvite](https://discordapp.com/oauth2/authorize?client_id=661927248483450920&scope=bot&permissions=8)

-[Supporter Server](https://discord.gg/CvzYypW)
`)
  .setFooter('© RivalMarket', client.user.avatarURL)
  .setTimestamp()
  rivalmarket(s)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permlevel: 0
};

exports.help = {
  name: 'invite',
  description: '.',
  usage: ''
};
   