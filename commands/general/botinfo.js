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
const os = require("os");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Get detailed information about the bot."),

    async execute(interaction) {
        const uptime = process.uptime();
        const uptimeFormatted = formatUptime(uptime);

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("🤖 Bot Information")
            .addFields(
                { name: "📡 Ping", value: `${interaction.client.ws.ping}ms`, inline: true },
                { name: "⏳ Uptime", value: uptimeFormatted, inline: true },
                { name: "🌍 Servers", value: `${interaction.client.guilds.cache.size}`, inline: true },
                { name: "👤 Users", value: `${interaction.client.users.cache.size}`, inline: true },
                { name: "💾 RAM Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
                { name: "🖥 OS", value: `${os.type()} ${os.arch()}`, inline: true }
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};


function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}
