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
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { InviteSettings } = require("../../mongodb");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-invite")
        .setDescription("Set the invite tracking log channel.")
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Select the channel for invite logs.")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");

        // Store in InviteSettings database
        await InviteSettings.findOneAndUpdate(
            { guildId: interaction.guild.id },
            { inviteLogChannelId: channel.id },
            { upsert: true }
        );

        await interaction.reply(`✅ Invite tracking logs will be sent to ${channel}.`);
    }
};
