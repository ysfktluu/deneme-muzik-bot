module.exports.run = async (client, bot, message, args, perms, Discord, db, rivalmarket, embed) => {
  const s = embed
  .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
  .addField('Davet Linki', `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
  .addField('Rival Market', `Bu tarz botların satıldığı yer RivalMarket'e [buraya tıklayarak](https://discord.gg/rivalmarket) gidebilirsin.`)
  .setColor('#3498db')
  .setDescription(`MC-AT botunun sahte halini kendi sunucuna davet edebilirsin.`)
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
  name: 'davet',
  description: '.',
  usage: ''
};
   