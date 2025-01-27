const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	cooldown : 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	async execute(interaction) {
		await interaction.reply('Pong!');
		// await wait(4_000);
		// await interaction.followUp({ content: 'Pong again!', ephemeral: true });
		// await wait(2_000);
		// await interaction.deleteReply();
		const message = await interaction.fetchReply();
		console.log(message);
	},
};