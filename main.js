// Import node filesystem module (command handling)
const fs = require('fs');
// Import discord module
const Discord = require('discord.js');

// Create discord client
const client = new Discord.Client();
// Create commands collection
client.commands = new Discord.Collection();
// get all command names (and exclude non js files)
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Config file
const { prefix, token } = require('./config.json');

// Console output when client is ready (when using 'node .')
client.once('ready', () => {
    console.log('UPV ready!');
    client.user.setPresence({ activity: { name: 'Hermano QUÉ LO QUÉ sí o no mi gente SI O NOOO!' } });
});

client.on('message', message => {
    // Check if message starts with prefix and hasn't been sent by a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Delete prefix, removes leftover whitespaces and splits all words in an array
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    // Get first word (which is the command, and remove it from args)
    const commandName = args.shift().toLowerCase();

    // Check if command exist
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    // Check if command requires args
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}`;
        // If command has usage, reply it
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // Execute command
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error while executing the command');
    }

});


// Login to discord with app's token
client.login(token);

