const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("pause").setDescription("Pauses the music"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("**Não existem músicas na fila** 😔")

		queue.setPaused(true)
        await interaction.editReply("**A música esta pausada!** use `/resume` para continuar ouvindo 🎵")
	},
}
