const Discord = require('discord.js');


module.exports = {
  name: "temizle",
  description: "Şarkıyı kuyruktan kaldırır.",
  async execute(message, args) {
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`<:yes:663378512496951376> Başarıyla ${args[0]} Mesaj Silindi.`).then(msg => msg.delete(2000));
    
});


