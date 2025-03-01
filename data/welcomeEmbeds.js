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

const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { Wcard } = require("wcard-gen");
const data = require("../UI/banners/welcomecards");

const welcomeEmbeds = async (member, embedType) => {
    const guild = member.guild;
    const memberCount = guild.memberCount;
    const suffix = getOrdinalSuffix(memberCount);
    const userName = truncateUsername(member.user.username);
    const joinDate = member.joinedAt.toDateString();
    const creationDate = member.user.createdAt.toDateString();
    const serverIcon = guild.iconURL({ format: "png", dynamic: true, size: 256 });

    // 📌 **TYPE 1: Regular Embed**
    if (embedType === 1) {
        return {
            content: `Hey ${member}, welcome to **${guild.name}**! 🎉`,
            embeds: [
                new EmbedBuilder()
                    .setColor("Blue")
                    .setTitle("🎉 Welcome!")
                    .setDescription(`Welcome **${userName}** to **${guild.name}**!\nYou are the **${memberCount}${suffix}** member!`)
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter({ text: "Enjoy your stay!", iconURL: serverIcon })
            ]
        };
    }

    // 📌 **TYPE 2: Minimalist Text**
    if (embedType === 2) {
        return {
            content: `👋 Hey ${member}, welcome to **${guild.name}**! You are our **${memberCount}${suffix}** member! 🎉`
        };
    }

    // 📌 **TYPE 3: Welcome Card Embed**
    if (embedType === 3) {
        const randomImage = data.welcomeImages[Math.floor(Math.random() * data.welcomeImages.length)]; // ✅ Get Random Image
        
        const welcomecard = new Wcard()
            .setName(userName)
            .setAvatar(member.user.displayAvatarURL({ format: "png" }))
            .setTitle(`Welcome ${memberCount}${suffix}`) 
            .setColor("00e5ff")
            .setBackground(randomImage); // ✅ Use Random Background

        const card = await welcomecard.build();
        const attachment = new AttachmentBuilder(card, { name: "welcome.png" });

        return {
            content: `Hey ${member}, welcome to **${guild.name}**! 🎉`,
            embeds: [
                new EmbedBuilder()
                    .setTitle("🎉 Welcome!")
                    .setDescription(`Hey ${member}, you are the **${memberCount}${suffix}** member of **${guild.name}**!`)
                    .setColor("#00e5ff")
                    .setThumbnail(serverIcon)
                    .setImage("attachment://welcome.png")
                    .addFields(
                        { name: "👤 Username", value: userName, inline: true },
                        { name: "📅 Join Date", value: joinDate, inline: true },
                        { name: "🛠 Created On", value: creationDate, inline: true }
                    )
                    .setFooter({ text: "We're glad to have you here!", iconURL: serverIcon })
                    .setAuthor({ name: userName, iconURL: member.user.displayAvatarURL() })
                    .setTimestamp()
            ],
            files: [attachment]
        };
    }

    return { content: `👋 Welcome to **${guild.name}**, ${member}! 🎉` }; 
};


function getOrdinalSuffix(number) {
    if (number % 100 >= 11 && number % 100 <= 13) return "th";
    switch (number % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

function truncateUsername(username, length = 15) {
    return username.length > length ? username.substring(0, length) + "..." : username;
}

module.exports = welcomeEmbeds;
