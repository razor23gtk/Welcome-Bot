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
const { Welcome, Leave, Autorole, WelcomeDM, LeaveDM, InviteSettings } = require("../../mongodb");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("allsetups")
        .setDescription("View the current server configuration settings."),

    async execute(interaction) {
        await interaction.deferReply({ flags : 64 });

        const guildId = interaction.guild.id;

       
        const welcomeSettings = await Welcome.findOne({ guildId });
        const leaveSettings = await Leave.findOne({ guildId });
        const autoroleSettings = await Autorole.findOne({ guildId });
        const welcomeDMSettings = await WelcomeDM.findOne({ guildId });
        const leaveDMSettings = await LeaveDM.findOne({ guildId });
        const inviteSettings = await InviteSettings.findOne({ guildId });

       
        const embed = new EmbedBuilder()
            .setColor("#3498db")
            .setTitle(`📜 Server Configuration: ${interaction.guild.name}`)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setFooter({ text: "Use /setup commands to modify settings.", iconURL: interaction.guild.iconURL() })
            .setTimestamp();

     
        embed.addFields({
            name: "🎉 Welcome System",
            value: welcomeSettings
                ? `📌 **Channel:** <#${welcomeSettings.channelId || "Not Set"}>\n📌 **Embed Type:** ${welcomeSettings.embedType}`
                : "🚫 Not Configured",
            inline: false
        });

        
        embed.addFields({
            name: "🚪 Leave System",
            value: leaveSettings
                ? `📌 **Channel:** <#${leaveSettings.channelId || "Not Set"}>\n📌 **Embed Type:** ${leaveSettings.embedType}`
                : "🚫 Not Configured",
            inline: false
        });

        embed.addFields({
            name: "✅ AutoRole System",
            value: autoroleSettings && autoroleSettings.status
                ? `📌 **Role Assigned:** <@&${autoroleSettings.roleId}>`
                : "🚫 Not Configured",
            inline: false
        });

       
        embed.addFields({
            name: "📩 Welcome DM",
            value: welcomeDMSettings && welcomeDMSettings.dmStatus
                ? `📌 **Enabled:** ✅\n📌 **Embed Type:** ${welcomeDMSettings.dmEmbedType === 0 ? "Random" : welcomeDMSettings.dmEmbedType}`
                : "🚫 Not Configured",
            inline: false
        });

        embed.addFields({
            name: "📤 Leave DM",
            value: leaveDMSettings && leaveDMSettings.dmStatus
                ? `📌 **Enabled:** ✅\n📌 **Embed Type:** ${leaveDMSettings.dmEmbedType === 0 ? "Random" : leaveDMSettings.dmEmbedType}`
                : "🚫 Not Configured",
            inline: false
        });

     
        embed.addFields({
            name: "📊 Invite Tracking",
            value: inviteSettings && inviteSettings.inviteLogChannelId
                ? `📌 **Log Channel:** <#${inviteSettings.inviteLogChannelId}>`
                : "🚫 Not Configured",
            inline: false
        });

        
        await interaction.editReply({ embeds: [embed] });
    }
};
