const { SlashCommandBuilder, channelMention } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')


module.exports = {
	data: new SlashCommandBuilder().setName("andre").setDescription("mostra meu amigo André"),
	run: async ({ client, interaction }) => {
		const embed = new Discord.MessageEmbed()
		.setDescription('Um cara gente boa')
		.setImage('attachment://Andre.jpeg')
		.setColor('#490097')
        .setAuthor({name: 'ANDRE', url:'https://www.instagram.com/aa.carvalho_/'});


        await interaction.editReply({ embeds: [embed], files: ['./images/Andre.jpeg'] })
	},
}
