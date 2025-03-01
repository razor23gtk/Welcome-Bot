/*

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
                                                 
  _________ ___ ___ ._______   _________    
 /   _____//   |   \|   \   \ /   /  _  \   
 \_____  \/    ~    \   |\   Y   /  /_\  \  
 /        \    Y    /   | \     /    |    \ 
/_______  /\___|_  /|___|  \___/\____|__  / 
        \/       \/                     \/  
                    
DISCORD :  https://discord.com/invite/xQF9f9yUEM                   
YouTube : https://www.youtube.com/@GlaceYT                         

Command Verified : ✓  
Website        : ssrr.tech  
Test Passed    : ✓

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
*/
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Invite }= require("../../mongodb");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invites")
        .setDescription("Check how many people a user has invited.")
        .addUserOption(option => 
            option.setName("user")
                .setDescription("Select a user to check invites")
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("user") || interaction.user;
        const inviteData = await Invite.find({ guildId: interaction.guild.id, inviterId: user.id });

        const totalInvites = inviteData.length;
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`📩 Invite Stats for ${user.username}`)
            .setDescription(`🔹 **Total Invites:** ${totalInvites}`)
            .setFooter({ text: "Invite Tracker System", iconURL: interaction.guild.iconURL() });

        await interaction.reply({ embeds: [embed] });
    }
};
