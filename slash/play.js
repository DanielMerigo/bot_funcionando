const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("loads songs from youtube")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("song")
				.setDescription("Toca uma música pelo URL") 
				.addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("playlist")
				.setDescription("Adiciona músicas de uma playlist a fila") 
				.addStringOption((option) => option.setName("url").setDescription("the playlist's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("search")
				.setDescription("Pesquisa uma música pelo nome") 
				.addStringOption((option) =>
					option.setName("searchterms").setDescription("the search keywords").setRequired(true)
				)
		),
	run: async ({ client, interaction }) => {
		if (!interaction.member.voice.channel) return interaction.editReply("Você precisa estar em um **CANAL DE VOZ** para executar este comando")

		const queue = await client.player.createQueue(interaction.guild)
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new MessageEmbed()

		if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("No results")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** Foi adicionado a fila 👌`)
                .setThumbnail(song.thumbnail)
                .setColor('4F0000')
                .setFooter({ text: `Duração: ${song.duration}`})

		} else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Sem resultado")
            
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} músicas da [${playlist.title}](${playlist.url})** foram adicionadas na fila 👌`)
                .setThumbnail(playlist.thumbnail)
                .setColor('4F0000')

		} else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Sem resultado")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** foi adicionado na fila 👌`)
                .setThumbnail(song.thumbnail)
                .setColor('4F0000')
                .setFooter({ text: `Duração: ${song.duration}`})
		}
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
	},
}
