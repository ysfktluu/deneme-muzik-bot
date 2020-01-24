const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] });
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json");

client.login(TOKEN);
client.commands = new discord.Collection();
client.prefix = PREFIX;
client.queue = new Map();

client.on("ready", () => {
	console.log(`${client.user.username} ready!`);
   const link = "https://discordapp.com/oauth2/authorize?client_id="+client.user.id+"&scope=bot&permissions=8";
   console.log(`Davet : [${link}]!!`)
});
client.on("warn", info => console.log(info));
client.on("error", console.error);


const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content.startsWith(PREFIX)) {
    const args = message.content
      .slice(PREFIX.length)
      .trim()
      .split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("Bu komut yürütülürken bir hata oluştu.").catch(console.error);
    }
  }
});
