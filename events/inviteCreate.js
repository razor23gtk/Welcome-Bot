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

const { Events } = require("discord.js");

module.exports = {
    name: "inviteTracker",
    once: false,
    async execute(client) {
        //console.log("⏳ Invite tracker is running...");

        setInterval(async () => {
            client.guilds.cache.forEach(async (guild) => {
                try {
                    const invites = await guild.invites.fetch();
                    client.invites.set(guild.id, new Map(
                        invites.map(inv => [inv.code, { inviterId: inv.inviter?.id || "Unknown", uses: inv.uses }])
                    ));
                    //console.log(`🔄 Updated invite cache for ${guild.name}`);
                } catch (error) {
                    console.error(`❌ Error updating invites for ${guild.name}:`, error);
                }
            });
        }, 2000);
    }
};
