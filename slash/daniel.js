const { SlashCommandBuilder, channelMention } = require("@discordjs/builders");
const Discord = require('discord.js')


module.exports = {
	data: new SlashCommandBuilder().setName("daniel").setDescription("mostra o criador do BOT"),
	run: async ({ client, interaction }) => {
        const embed = new Discord.MessageEmbed()
		.setDescription('O criador deste BOT,\nlindo,\nmaravilhoso,\ngostoso,\nperfeito...\n🤤🤤🤤🤤')
		.setImage('attachment://Daniel.jpeg')
		.setColor('#490097')
        .setAuthor({name: 'DANIEL MERIGO', url:'https://www.instagram.com/daniel.merigo/'});

        await interaction.editReply({ embeds: [embed], files: ['./images/Daniel.jpeg'] })
	},
}
