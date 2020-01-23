module.exports = {
  name: "pause",
  description: "Pause the currently playing music",
  execute(message) {
    if (!message.member.voice.channel)
      return message.reply("Önce bir ses kanalına katılmanız gerekiyor!").catch(console.error);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return serverQueue.textChannel.send(`${message.author} ⏸ paused the music.`).catch(console.error);
    }
    return message.reply("Şuan çalan bir müzik bulunmamakta.").catch(console.error);
  }
};
