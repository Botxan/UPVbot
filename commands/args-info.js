module.exports = {
    name: 'args-info',
    description: 'Information about the arguments provided.',
    args: true,
    execute(message, args) {
        if (args[0] === 'pavo') {
            return message.channel.send('pibe');
        }
        message.channel.send(`Argumentos: ${args}\nLongitud de argumentos: ${args.length}`);
    }
};