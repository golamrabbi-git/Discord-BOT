const {SlashCommandBuilder} = require('discord.js');
const { request } = require('undici');
const wait = require('node:timers/promises').setTimeout;

module.exports ={
    data: new SlashCommandBuilder()
    .setName('urban')
    .setDescription('Search your word in Urban Dictionary')
    .addStringOption(option =>
		option.setName('input')
			.setDescription('Input your word')
            .setRequired(true)),
    

    async execute(interaction){
        await interaction.deferReply();
		await wait(4_000);
       try {
        const target = interaction.options.getString('input');
        const query = new URLSearchParams({ term:target });
        //console.log(`https://api.urbandictionary.com/v0/define?${query}`)
		const dictResult = await request(`https://api.urbandictionary.com/v0/define?${query}`);
		const  {list } = await dictResult.body.json();
        const msg = list.reduce((scc,cur)=>{
            return {
                num:scc.num+1,
                msg:scc.msg+`${scc.num} : ${cur.definition}\n`
            } 
        },{num:1,msg:`word:${target}\n`,num:1});
        console.log(typeof msg)
        await interaction.editReply(msg.msg);
       
       } catch (error) {
        console.log(error.message)
       }
    }

}