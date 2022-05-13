const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("skipto").setDescription("Passa para música especifica")
    .addNumberOption((option) => 
        option.setName("tracknumber").setDescription("The track to skip to").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("**Não existem músicas na fila** 😔")

        const trackNum = interaction.options.getNumber("tracknumber")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Número invalido")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`Passando para a música número: ${trackNum}`)
	},
}
