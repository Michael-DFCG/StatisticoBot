const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Server Pronto')
});

app.listen(3000, () => {
  console.log('[SERVER] connesso');
});
var os = require('os');
const color = "GREEN";
const Discord = require('discord.js')
const fs = require('fs')
console.log("[V. D.JS] "+Discord.version)
console.log("[V. NODE] "+process.version)
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', (message) => {
  client.user.setActivity("/help")
  console.log("[BOT] Pronto!")
})
client.on('messageCreate', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner.id) {
	  message.channel.send("aspetta... sto facendo! l'operazione finirà 15 min fino ad 1 ora")
		const data = [
			{
				name: 'help',
				description: 'Visualizza i comandi del bot',
			},
			{
				name: 'ping',
				description: 'Pong!',
			},
			{
			  name: 'serverinfo',
			  description: 'Visualizza le info di questo server',
			},
			{
			  name: 'userinfo',
			  description: 'Visualizza le info di un utente',
			},
			{
			  name: 'botinfo',
			  description: 'Visualizza le info del bot',
			},
			{
			  name: 'channelinfo',
			  description: 'Visualizza le info di questo canale',
			},
			{
			  name: 'invito',
			  description: 'invitami nel tuo server!',
			},
      
		];

		const commands = await client.application?.commands.set(data);
		console.log(commands);
	}
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
	  let totalSeconds = (interaction.client.uptime / 1000);
	  let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);
let uptime = "`" + `${days} giorni, ${hours} ore, ${minutes} minuti e ${seconds} secondi` + "`";

	  const ping = new Discord.MessageEmbed()
	  .setColor('ORANGE')
        .setTitle('Pong!')
        .setDescription(`🏓 latenza API: \`\n${Date.now() - interaction.createdTimestamp}ms\`\n🤖 Ping del bot\`\n${Math.round(client.ws.ping)}ms\`\nUptime:\n${uptime}`)
        .setColor('GREEN')
		await interaction.reply({embeds: [ping] });
	} else if (interaction.commandName === 'help') {
	  const util = new Discord.MessageEmbed()
	  .setColor('BLURPLE')
	  .setTitle("help!")
	  .setDescription("**tutti i miei comandi**\nuserinfo | serverinfo | channelinfo | botinfo | ping")
	  await interaction.reply({embeds: [util]})
	} else if (interaction.commandName === 'botinfo') {
	  const DV = Discord.version
	  const NV = process.version
	  let totalUsers = interaction.client.guilds.cache.reduce((acc, value) => acc + value.memberCount, 0)
    let totalS = interaction.client.guilds.cache.size;
    
let arch = os.arch();
    let platform = os.platform();
  const info = new Discord.MessageEmbed()
	  .setColor('VIOLET')
	  .setTitle("info del bot")
	  .setDescription("**👑 Owner**\n`OnlyMichael#0001`\n**💽 linguaggio**\n`Javascript`\n**💾 Versioni**\n`"+`node.js: ${NV}`+`\ndiscord.js: ${DV}`+"`\n**💻 Comandi**\n`7 (altri in arrivo...)`\n**👀 Servers**\n`"+totalS+"`\n**👤 Utenti**\n`"+totalUsers+"`\n**🛰️ RAM**\n`"+(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)+"MB `\n**🏹 Architettura**\n\`"+arch+"\`\n**⚖️ Piattaforma**\n\`"+platform+"\`")
	  await interaction.reply({embeds: [info]})
	  

	  
	} else if (interaction.commandName === 'userinfo') {
	  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField(`${interaction.user.tag}`, `${interaction.user}`, true)
    .addField("ID", `${interaction.user.id}`, true)
    .addField("Nickname", `${interaction.member.nickname !== null ? `${interaction.member.nickname}` : 'Nessuno'}`, true)
    .addField("Entrato nel server il", `${interaction.member.joinedAt}`)
    .addField("Account creato il", `${interaction.user.createdAt}`)
    await interaction.reply({embeds: [embed]});
	} else if (interaction.commandName === 'serverinfo') {
	  
	  var message = interaction;
	  let server = message.member.guild;
	  let categoryCount = interaction.guild.channels.cache.filter(c => c.type == "category").size;
        let textCount = interaction.guild.channels.cache.filter(c => c.type == "text").size;
        let vocalCount = interaction.guild.channels.cache.filter(c => c.type == "voice").size;

	   const serverinfo = new Discord.MessageEmbed()
	   .setAuthor(message.guild.name, message.guild.iconURL)
  .setColor(3447003)
  .addField(`Owner`, `<@${message.guild.ownerId}> (${message.guild.ownerId})`)
  .addField('Membri', `${message.guild.memberCount}`, true)
  .addField('Timeout AFK', `${message.guild.afkTimeout / 60} minuti`, true)
  .addField('Regione', `${interaction.guild.preferredLocale}`, true)
  .addField('Creato il', message.guild.createdAt.toLocaleString(), true)
  .addField('Canali totali', `${textCount + vocalCount}`, true)
  .addField('Boosts', `${interaction.guild.premiumSubscriptionCount || '0'}`, true)
  .addField('Livello boosts', `${interaction.guild.premiumTier !== null ? `${interaction.guild.premiumTier}` : 'nessuno'}`, true)
  .addField('Membri massimi', `${interaction.guild.maximumMembers}`, true)
await interaction.reply({embeds: [serverinfo]})
	} else if (interaction.commandName === `channelinfo`) {
	  const ci = new Discord.MessageEmbed()
	  .setTitle('info di questo canale ')
	  .addField('Nome', interaction.channel.name)
	  .addField('ID', interaction.channel.id)
	  .addField('NSFW', `${interaction.channel.nsfw}`)
	  await interaction.reply({embeds: [ci]})
	} else if (interaction.commandName === `invito`) {
	  const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setURL('https://discord.com/api/oauth2/authorize?client_id=869547947468161074&permissions=280576&scope=applications.commands%20bot')
					.setLabel('Cliccami!')
					.setStyle('LINK'),
			);
			const inv = 
		await interaction.reply({ content: 'Link per invitarmi!', components: [row] });
		
	}  
}); 



client.on('messageCreate', message => {
  const wlc = new Discord.MessageEmbed()
  .setTitle("Hey!")
  .setThumbnail(client.user.displayAvatarURL())
  .setDescription("ciao! sono "+client.user.username+"! Il mio prefix è `/`, perché uso gli slash commands. Inizia facendo `/help`")
  .setColor(color)
  if(message.content.includes(`<@${client.user.id}`) || message.content.includes(`<@!${client.user.id}`)) return message.channel.send({embeds: [wlc]})
})

client.login(process.env.token).then(() => {
  console.log('[TOKEN] Loggato!')
})
console.log("[NODE] File Pronti!")
process.on('error', () => {
  console.log("[ERR] ", error)
})
