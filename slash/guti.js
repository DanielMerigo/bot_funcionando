const { SlashCommandBuilder, channelMention } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')


module.exports = {
	data: new SlashCommandBuilder().setName("guti").setDescription("mostra meu amigo Guti"),
	run: async ({ client, interaction }) => {
		const embed = new Discord.MessageEmbed()
		.setDescription('Um cara gente boa')
		.setImage('attachment://Guti.jpeg')
		.setColor('#490097')       
		.setAuthor({name: 'GUTI', url:'https://www.instagram.com/gustavo_chiarello/'});


        await interaction.editReply({ embeds: [embed], files: ['./images/Guti.jpeg'] })
	},
}
