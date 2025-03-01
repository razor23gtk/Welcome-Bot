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

Website        : ssrr.tech  
Test Passed    : ✓

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
*/

const { Leave, LeaveDM } = require("../mongodb");
const leaveEmbeds = require("../data/leaveEmbeds");
const leaveDMEmbeds = require("../data/leaveDMEmbeds");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    async execute(member) {
        const guild = member.guild;
        const user = member.user;

       
        const settings = await Leave.findOne({ guildId: guild.id });
        if (settings && settings.channelId) {
            const channel = guild.channels.cache.get(settings.channelId);
            if (channel) {
                const memberCount = guild.memberCount;
                const serverIcon = guild.iconURL({ dynamic: true }) || null;
                const userAvatar = user.displayAvatarURL({ dynamic: true });

                let embedIndex = settings.embedType === 0 ? Math.floor(Math.random() * leaveEmbeds.length) : settings.embedType - 1;
                let embed = leaveEmbeds[embedIndex];

                embed = EmbedBuilder.from(embed)
                    .setDescription(
                        embed.data.description
                            .replace("{user}", user.tag)
                            .replace("{server}", guild.name)
                            .replace("{memberCount}", `${memberCount}`)
                    )
                    .setThumbnail(userAvatar);

                if (serverIcon) {
                    embed.setFooter({ text: "User left the server", iconURL: serverIcon });
                } else {
                    embed.setFooter({ text: "User left the server" });
                }

                channel.send({ embeds: [embed] }).catch(err => console.error("❌ Error sending leave message:", err));
            }
        }

     
        const dmSettings = await LeaveDM.findOne({ guildId: guild.id });
        if (dmSettings && dmSettings.dmStatus) {
            try {
                let embedIndex = dmSettings.dmEmbedType === 0
                    ? Math.floor(Math.random() * leaveDMEmbeds.length)
                    : dmSettings.dmEmbedType - 1;

                let dmEmbed = leaveDMEmbeds[embedIndex];

                const serverIcon = guild.iconURL({ dynamic: true }) || null;
                dmEmbed = EmbedBuilder.from(dmEmbed)
                    .setTitle(dmEmbed.data.title.replace("{server}", guild.name))
                    .setDescription(
                        dmEmbed.data.description
                            .replace("{user}", user.username)
                            .replace("{server}", guild.name)
                    );

                if (serverIcon) {
                    dmEmbed.setFooter({ text: "We hope to see you again!", iconURL: serverIcon });
                } else {
                    dmEmbed.setFooter({ text: "We hope to see you again!" });
                }

                await user.send({ embeds: [dmEmbed] });
                console.log(`✅ Leave DM sent to ${user.tag}`);
            } catch (error) {
                console.error(`❌ Failed to send leave DM to ${user.tag}:`, error);
            }
        }
    }
};
