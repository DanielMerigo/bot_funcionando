const { SlashCommandBuilder, channelMention } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')


module.exports = {
	data: new SlashCommandBuilder().setName("dopke").setDescription("mostra meu amigo Dopke"),
	run: async ({ client, interaction }) => {
		const embed = new Discord.MessageEmbed()
		.setDescription('Um cara gente boa')
		.setImage('attachment://Dopke.jpeg')
		.setColor('#490097')       
		.setAuthor({name: 'DOPKE', url:'https://www.instagram.com/dopke_du/'});


        await interaction.editReply({ embeds: [embed], files: ['./images/Dopke.jpeg'] })
	},
}
