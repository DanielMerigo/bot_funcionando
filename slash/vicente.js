const { SlashCommandBuilder, channelMention } = require("@discordjs/builders");
const Discord = require('discord.js')


module.exports = {
	data: new SlashCommandBuilder().setName("vicente").setDescription("mostra meu amigo Vicente"),
	run: async ({ client, interaction }) => {
        const embed = new Discord.MessageEmbed()
		.setDescription('Um cara gente boa')
		.setImage('attachment://Vicente.jpeg')
		.setColor('#490097')
        .setAuthor({name: 'VICENTE', url:'https://www.instagram.com/vica_damo/'});


        await interaction.editReply({ embeds: [embed], files: ['./images/Vicente.jpeg'] })
	},
}
