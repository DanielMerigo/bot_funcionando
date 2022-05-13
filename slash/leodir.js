const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("leodir").setDescription("mostra meu amigo Leo"),
	run: async ({ client, interaction }) => {
        await interaction.editReply(`Te amo amigo!`)
	},
}
