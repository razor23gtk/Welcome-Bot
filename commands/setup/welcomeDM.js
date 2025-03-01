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
const { WelcomeDM } = require("../../mongodb");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-welcomedm")
        .setDescription("Setup a welcome DM for new members.")
        .addBooleanOption(option =>
            option.setName("status")
                .setDescription("Enable or disable welcome DMs")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName("embed")
                .setDescription("Choose DM embed style (1, 2, 3, or 0 for random)")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const status = interaction.options.getBoolean("status");
        const embedType = interaction.options.getInteger("embed"); 

        if (![0, 1, 2, 3].includes(embedType)) {
            return interaction.reply({ content: "❌ Invalid embed type! Choose 1, 2, 3, or 0 for random.", ephemeral: true });
        }

        await WelcomeDM.findOneAndUpdate(
            { guildId: interaction.guild.id },
            { dmStatus: status, dmEmbedType: embedType },
            { upsert: true }
        );

        await interaction.reply(`✅ Welcome DMs are now **${status ? "enabled" : "disabled"}** using embed style ${embedType === 0 ? "random" : embedType}.`);
    }
};
