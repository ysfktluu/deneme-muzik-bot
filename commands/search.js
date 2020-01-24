  const { Util } = require("discord.js");
const { play } = require("../include/play");
const { YOUTUBE_API_KEY } = require("../config.json");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ara",
  description: "YouTube'da ses arar",
  async execute(message, args) {
    const { channel } = message.member.voice;

    if (!args.length) return message.reply("Kullanım: !ara <YouTube URL'si | Video Adı>").catch(console.error);
    if (!channel) return message.reply("Önce bir ses kanalına katılmanız gerekiyor!").catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.reply("Ses kanalına bağlanamıyor, Bağlan izini eksik");
    if (!permissions.has("SPEAK"))
      return message.reply("Bu ses kanalında konuşamıyorum, uygun izinlere sahip olduğumdan emin olun!");

    const search = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = videoPattern.test(args[0]);

    // Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.client.commands.get("playlist").execute(message, args);
    }

    const serverQueue = message.client.queue.get(message.guild.id);
    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let songInfo = null;
    let song = null;

    if (urlValid) {
      try {
        songInfo = await ytdl.getInfo(url);
        song = {
          title: songInfo.title,
          url: songInfo.video_url,
          duration: songInfo.length_seconds
        };
      } catch (error) {
        if (error.message.includes("copyright")) {
          return message
            .reply("⛔ Bu Video, telif hakkı koruması nedeniyle oynatılamadı ⛔")
            .catch(console.error);
        } else {
          console.error(error);
        }
      }
    } else {
      try {
        //const results = await youtube.searchVideos(search, 1);
        var results = await youtube.searchVideos(search, 10);
        let index = 0;
        
        message.channel.send(new MessageEmbed()
         .setAuthor(message.author.username, message.author.displayAvatarURL)
         .setDescription(`${results.map(video2 => `\`${++index}.\` ${video2.title}`).join('\n \n')}`)
         .setFooter('**Bir rakam seçiniz veya çıkış yazarak çıkınız.**'));
          message.delete(5000)
        let videoIndex;
        var response = await message.channel.awaitMessages(msg2 => msg2.author.id === message.author.id, {//msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
				});
					try {
            console.log(response.first().content)
            videoIndex = parseInt(response.first().content);
          } catch (err) {
            console.log(response.first().content)
					  //console.error(err);
						return message.channel.send(new MessageEmbed()
            .setColor('0x36393E')
            .setDescription('❎ | **10 Saniye İçinde Şarkı Seçmediğiniz İçin seçim İptal Edilmiştir!**.'));
          }
				//var video = await youtube.getVideoByID(results[videoIndex - 1].id);
        songInfo = await ytdl.getInfo(results[videoIndex - 1].url);
        song = {
          title: songInfo.title,
          url: songInfo.video_url,
          duration: songInfo.length_seconds
        };
      } catch (error) {
        console.error(error);
        return message.channel.send(new MessageEmbed()
        .setColor('0x36393E')
        .setDescription('❎ | YouTubede Böyle Bir Şarkı Yok !**'));
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
      return serverQueue.textChannel
          .send(`${message.author} tarafından **${song.title}** kuyruğa eklendi`)
        .catch(console.error);
    } else {
      queueConstruct.songs.push(song);
    }

    if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);

    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(`Ses Kanala katılamadım: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`Kanala katılamadım: ${error}`).catch(console.error);
      }
    }
  }
};
