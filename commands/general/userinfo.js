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

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Get information about a user.")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("Select a user")
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("target") || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);

        const embed = new EmbedBuilder()
            .setColor("Purple")
            .setTitle(`👤 User Info - ${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "📌 Username", value: user.tag, inline: true },
                { name: "🆔 User ID", value: user.id, inline: true },
                { name: "📆 Joined Server", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: true },
                { name: "📅 Account Created", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true },
                { name: "🎭 Roles", value: member.roles.cache.map(role => role).join(", ") || "None", inline: false }
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
