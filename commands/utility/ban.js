const { ButtonBuilder, 
	ButtonStyle, 
	SlashCommandBuilder , 
	PermissionFlagsBits, 
	ActionRowBuilder,
	ButtonInteraction,
	ComponentType,
	PermissionsBitField,
	EmbedBuilder} = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them.')

		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to ban')
				.setRequired(true))

		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)      
		.setDMPermission(false),



        async execute(interaction) {
			const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm Ban')
			.setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(confirm,cancel);

		const banEmbed = new EmbedBuilder()
			.setColor('Blue')
			.setDescription(`:white_check_mark : banned.`)
            
			try {
				const user = interaction.options.getUser('target');
				const reply = await interaction.reply({content:`Do you want to ban ${user}?`,components:[row],ephemeral:true});
				
				const ID = user.id;
				//const banUser = client.users.cache.get(ID);
				//console.log(interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers));
				if(interaction.member.id === ID){
					return await interaction.reply({content:"You Can not ban yourself!",ephemeral: true})
				}
				console.log(interaction.guild.members.fetch(ID));

				const collector = reply.createMessageComponentCollector({
					componentType: ComponentType.Button,
					time: 5_000,

				})
				collector.on('collect',(interact)=>{
					if(interact.customId === 'confirm'){
						try{
							interact.guild.members.ban(user);
							interact.reply(`${user} has been banned.`)
						}
					catch(error){
						console.error(error.message);
					}	
				}
					if(interact.customId === 'cancel'){
						interact.reply(`${user} is not banned.`);
						return;
					}

				})
				collector.on('end',()=>{
					confirm.setDisabled(true)
					cancel.setDisabled(true)

					reply.edit({
						components:[row]
					})
				})
			} catch (error) {
				console.log(error.message);
				interaction.editReply(error.message);
			}

			//channel.send({embeds :[banEmbed]})
        },
};