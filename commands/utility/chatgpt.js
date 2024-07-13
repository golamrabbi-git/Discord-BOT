const { SlashCommandBuilder } = require('discord.js');
const {req} = require('../../events/fetchApi.js');

module.exports ={
    data: new SlashCommandBuilder()
    .setName('chatgpt')
    .setDescription('ask Me Anything')
    .addStringOption(option =>
		option.setName('enter')
			.setDescription('input your question here ')
            .setRequired(true)),


            async execute(interaction){
                await interaction.deferReply({ ephemeral: false });
               try{
                const ques = interaction.options.getString('enter');
                const response = await req({
                    base: 'openAi',
                    uri: 'v1/chat/completions',
                    method: 'POST',
                    withCredentials: false,
                    data: {
                      model: "gpt-3.5-turbo",
                      messages: [{
                        "role": "system", "content": `${ques}`
                      }],
                    }
                  });
                  const { data } = response;
                  const reply = data.choices[0].message.content;
                  return await interaction.editReply({
                    content: `Answer: \t ${reply}\n`,
                    ephemeral: true
                  });
               }
               catch(error){
                await interaction.editReply({ content: 'An error occurred while processing the command.', ephemeral: true });
                console.error(error)
               }
            }
          
};


