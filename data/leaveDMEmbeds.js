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
*/const { EmbedBuilder } = require("discord.js");

const leaveDMEmbeds = [
    new EmbedBuilder()
        .setColor("#FF5555") 
        .setTitle("😢 Sorry to See You Go!")
        .setDescription(
            "Hey **{user}**, we're sad to see you leave **{server}**. 😔\n\n" +
            "💭 If you have any feedback, let us know!\n" +
            "🔄 You're always welcome back anytime. 💖"
        )
        .setTimestamp(),

    new EmbedBuilder()
        .setColor("#FFA500") 
        .setTitle("👋 Goodbye!")
        .setDescription(
            "We noticed you left **{server}**. We hope you had a great time! 💛\n\n" +
            "If you ever want to return, the door is always open! 🚪"
        )
        .setTimestamp(),

    new EmbedBuilder()
        .setColor("#4A90E2") 
        .setTitle("🌊 Farewell!")
        .setDescription(
            "Goodbye from **{server}**! 🌊\n\n" +
            "🌟 We appreciate the time you spent with us. If you ever come back, we'll welcome you with open arms!"
        )
        .setTimestamp(),
];

module.exports = leaveDMEmbeds;
