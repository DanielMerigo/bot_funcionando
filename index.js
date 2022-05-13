const Discord = require("discord.js")
const dotenv = require("dotenv")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const fs = require("fs")
const { Player } = require("discord-player")
const CLIENT_ID = "953990381605912626"

const load_slash = async (guild_id) => {
    const rest = new REST({ version: "9" }).setToken(TOKEN)
    try{
    const response = await rest.put(Routes.applicationGuildCommands(CLIENT_ID,guild_id), {body: commands})
    console.log(`${guild_id} Sucesso`)
    }catch(err){
        console.log('Deu erro')
    }
} 

dotenv.config()
const TOKEN = process.env.TOKEN

//const GUILD_ID = null //Id do servidor q vai ser usado o bot

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_VOICE_STATES"
    ]
})

client.slashcommands = new Discord.Collection()
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

let commands = []

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for (const file of slashFiles){
    const slashcmd = require(`./slash/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    commands.push(slashcmd.data.toJSON())
}


    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`)
        client.guilds.cache.map(guild => guild.id).forEach(load_slash);

    })

    client.on('guildCreate', (guild) => {
        load_slash(guild.id)
    })

    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            if (!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName)
            if (!slashcmd) interaction.reply("Not a valid slash command")

            await interaction.deferReply()
            await slashcmd.run({ client, interaction })
        }
        handleCommand()
    })
    client.login(TOKEN)

    

