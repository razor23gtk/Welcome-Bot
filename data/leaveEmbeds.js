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

const { EmbedBuilder } = require("discord.js");

const leaveEmbeds = [
    new EmbedBuilder()
        .setColor("Red")
        .setTitle("😢 Goodbye!")
        .setDescription("{user} has left {server}. We'll miss you!\n\n👥 **Total Members Now:** {memberCount}"),

    new EmbedBuilder()
        .setColor("Orange")
        .setTitle("👋 Farewell!")
        .setDescription("Goodbye {user}, we hope to see you again in {server}!\n\n👥 **Total Members Now:** {memberCount}"),

    new EmbedBuilder()
        .setColor("Grey")
        .setTitle("🚪 Left the Server")
        .setDescription("{user} has departed from {server}.\n\n👥 **Total Members Now:** {memberCount}")
];

module.exports = leaveEmbeds;
