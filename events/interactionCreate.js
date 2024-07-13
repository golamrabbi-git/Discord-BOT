const {Events} = require('discord.js');
const { cpSync } = require('node:fs');
const wait = require('node:timers/promises').setTimeout;

module.exports ={
    name: Events.InteractionCreate,

    async execute(interaction){
        //console.log(interaction,'------------interaction--------------->')
        if (!interaction.isChatInputCommand()) return;

        	//const { commandName } = interaction;

        //edit reply
        // if (interaction.commandName === 'ping') {
        //     await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
        //     await wait(2_000);
		//     await interaction.editReply('Pong again!');
        // }


        //defer reply
        // if (interaction.commandName === 'ping') {
        //     await interaction.deferReply();
        //     await wait(4_000);
        //     await interaction.editReply('Pong deferred!');
        // }

        //follow up response
        // if (interaction.commandName === 'ping') {
        //     await interaction.reply('Pong!');
        //     await wait(2_000);
        //     await interaction.followUp('Pong again!');
        // }

        //delete response
        // if(interaction.commandName === 'ping'){
        //     // await interaction.reply('Pong Deleted!');
        //     // await interaction.deleteReply();
        //         // await interaction.reply('Pong!');
        //         // const message = await interaction.fetchReply();
        //         // console.log(message);
        //         const locales = {
        //             pl: 'Witaj Świecie!',
        //             de: 'Hallo Welt!',
        //         };
        //         interaction.reply(locales[interaction.locale] ?? 'Hello World (default is english)');
        // }


       

	const command = interaction.client.commands.get(interaction.commandName);
     //console.log('----------COMMAND---------->',command);

	
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
    

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!',
             ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!',
             ephemeral: true });
		}
	}
    }
}