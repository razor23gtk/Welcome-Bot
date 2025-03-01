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

const welcomeDMEmbeds = [
    new EmbedBuilder()
        .setColor("#7289DA") 
        .setTitle("📩 Welcome to {server}! 🎉")
        .setDescription(
            "Hey **{user}**, we're so happy to have you in **{server}**! 💖\n\n" +
            "✨ Here’s what you can do next:\n" +
            "📜 Read the **rules** to stay informed.\n" +
            "💬 Say hello in the chat and make new friends!\n" +
            "🎭 Customize your profile with roles (if available).\n\n" +
            "If you have any questions, feel free to ask the mods!\n" +
            "Enjoy your time here! 💕"
        )
        .setTimestamp(),

    new EmbedBuilder()
        .setColor("#FFAEC9") 
        .setTitle("🌸 Welcome, {user}! 🌸")
        .setDescription(
            "Hey cutie **{user}**, welcome to **{server}**! 🌷\n\n" +
            "🐾 Here’s what you should do first:\n" +
            "💌 Introduce yourself in the welcome channel.\n" +
            "🎀 Check out the community events.\n" +
            "🍡 Grab your favorite roles (if available).\n\n" +
            "We hope you have a **pawsome** time here! 🐾💞"
        )
        .setTimestamp(),

    new EmbedBuilder()
        .setColor("#FDCB58") 
        .setTitle("☀️ A New Friend Arrives! ☀️")
        .setDescription(
            "Hello **{user}**, welcome to **{server}**! 🌻\n\n" +
            "🔆 Here’s what’s waiting for you:\n" +
            "🎉 Friendly community members\n" +
            "🎨 Fun events & activities\n" +
            "📚 Informative & helpful channels\n\n" +
            "Feel free to explore and enjoy your stay! 🌞"
        )
        .setTimestamp(),
];

module.exports = welcomeDMEmbeds;
