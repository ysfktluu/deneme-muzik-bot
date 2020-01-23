const np = require('../data/np.js')
const Discord = require('discord.js')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr-TR')
module.exports = {
  name: "np",
  description: "YouTube'dan ses çalar",
  async execute(message, args) {
        var inicio = np.queue.get(message.guild.id).inicio
    var timeAtual = (new Date() - inicio)/1000
        var atual = moment.duration.format([moment.duration((timeAtual*1000))], 'hh:mm:ss').toString()
    atual = atual.length === 2 ? `00:${atual}` : atual
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.reply("Şuan çalan bir müzik bulunmamakta.").catch(console.error);
        var npE = new Discord.RichEmbed()
        .setColor('x36393e')
            .setFooter(message.author.username, message.author.displayAvatarURL)
                .setTimestamp()
                    .addField(`▸ Şuan Çalan:`, `**${serverQueue.soms[0].title}**`, false)
                        .addField('▸ Süre:', `**\`[${atual} | LIVE]\`**`, true)
                            .addField('🌀 ▸ Ekleyen:', `**\`${serverQueue.soms[0].inserido}\`**`, true)
                                .setThumbnail(serverQueue.soms[0].thumb)
    message.channel.send(npE)
    }
}
