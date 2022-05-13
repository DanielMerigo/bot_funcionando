const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("resume").setDescription("Resumes the music"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("**Não existem músicas na fila** 😔")

		queue.setPaused(false)
        await interaction.editReply("**A música está tocando!** use `/pause` para pausar a música 🎵")
	},
}
