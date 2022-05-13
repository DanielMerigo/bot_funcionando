const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("shuffle").setDescription("Shuffles the queue"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("**Não existem músicas na fila** 😔")

		queue.shuffle()
        await interaction.editReply(` ${queue.tracks.length} mósicas embaralhadas com sucesso 🔀`)
	},
}
