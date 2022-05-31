const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder().setName("leodir").setDescription("mostra meu amigo Leo"),
	run: async ({ client, interaction }) => {
		const embed = new Discord.MessageEmbed()
		.setDescription('Um cara gente boa')
		.setImage('attachment://Leodir.jpeg')
		.setColor('#490097')
		.setAuthor({name: 'LEODIR', url:'instagram.com/leodirmoro/'});


        await interaction.editReply({ embeds: [embed], files: ['./images/Leodir.jpeg'] })	},
}
