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
const { Welcome, Autorole, WelcomeDM, Invite, InviteSettings } = require("../mongodb");
const welcomeEmbeds = require("../data/welcomeEmbeds");
const welcomeDMEmbeds = require("../data/welcomeDMEmbeds");
const { EmbedBuilder, Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member, client) { 
        const guild = member.guild;
        if (!guild) return;

        try {
            
            const newInvites = await guild.invites.fetch();
            const storedInvites = client.invites.get(guild.id) || new Map();
        
       
            const usedInvite = newInvites.find(inv => storedInvites.has(inv.code) && inv.uses > storedInvites.get(inv.code).uses);
            const inviterId = usedInvite ? usedInvite.inviter.id : null;
        
        
            client.invites.set(guild.id, new Map(newInvites.map(inv => [inv.code, { inviterId: inv.inviter?.id || "Unknown", uses: inv.uses }])));
        
           
            const settings = await InviteSettings.findOne({ guildId: guild.id });
            if (!settings || !settings.inviteLogChannelId) return;
        
            const channel = guild.channels.cache.get(settings.inviteLogChannelId);
            if (!channel) return;
        
            
            let totalInvites = 0;
            if (inviterId) {
                const inviteData = await Invite.find({ guildId: guild.id, inviterId });
                totalInvites = inviteData.length + 1; 
            }
        
        
            if (inviterId && usedInvite) {
                await Invite.create({
                    guildId: guild.id,
                    inviterId,
                    inviteCode: usedInvite.code,
                    uses: usedInvite.uses
                });
            }
        
         
            const inviter = inviterId ? `<@${inviterId}>` : "Unknown";
            channel.send(`📩 **Invite Log:** ${member} joined using an invite from ${inviter}. (**Total Invites: ${totalInvites}**)`);
        
        } catch (error) {
            console.error("❌ Error tracking invite:", error);
        }
        
        

       
        const autoroleSettings = await Autorole.findOne({ guildId: guild.id });
        if (autoroleSettings && autoroleSettings.status && autoroleSettings.roleId) {
            const role = guild.roles.cache.get(autoroleSettings.roleId);
            if (role) {
                member.roles.add(role)
                    .then(() => console.log(`✅ AutoRole: ${role.name} assigned to ${member.user.tag}`))
                    .catch(err => console.error(`❌ Failed to assign AutoRole:`, err));
            }
        }

   
        const welcomeSettings = await Welcome.findOne({ guildId: guild.id });
        if (welcomeSettings && welcomeSettings.channelId) {
            const channel = guild.channels.cache.get(welcomeSettings.channelId);
            if (channel) {
                const embedType = welcomeSettings.embedType || 1;
                try {
                    const welcomeMessage = await welcomeEmbeds(member, embedType);
                    await channel.send(welcomeMessage);
                } catch (error) {
                    console.error("❌ Error sending welcome message:", error);
                }
            }
        }


        const dmSettings = await WelcomeDM.findOne({ guildId: guild.id });
        if (dmSettings && dmSettings.dmStatus) {
            try {
                let embedIndex = dmSettings.dmEmbedType === 0 
                    ? Math.floor(Math.random() * welcomeDMEmbeds.length) 
                    : dmSettings.dmEmbedType - 1;
                
                let dmEmbed = welcomeDMEmbeds[embedIndex];
                const serverIcon = guild.iconURL({ dynamic: true }) || null;

                dmEmbed = EmbedBuilder.from(dmEmbed)
                    .setTitle(dmEmbed.data.title.replace("{server}", guild.name))
                    .setDescription(
                        dmEmbed.data.description
                            .replace("{user}", member.user.username)
                            .replace("{server}", guild.name)
                    );

                if (serverIcon) {
                    dmEmbed.setFooter({ text: "We’re excited to have you!", iconURL: serverIcon });
                } else {
                    dmEmbed.setFooter({ text: "We’re excited to have you!" });
                }

                await member.send({ embeds: [dmEmbed] });
                console.log(`✅ Welcome DM sent to ${member.user.tag}`);
            } catch (error) {
                console.error(`❌ Failed to send welcome DM to ${member.user.tag}:`, error);
            }
        }
    }
};
