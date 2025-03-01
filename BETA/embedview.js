const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { CustomEmbed } = require("../mongodb");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed-view")
        .setDescription("View a saved custom embed.")
        .addStringOption(option => 
            option.setName("name")
                .setDescription("The embed name to view")
                .setRequired(true)
        ),

    async execute(interaction) {
        const guildId = interaction.guild.id;
        const name = interaction.options.getString("name");
        const embedData = await CustomEmbed.findOne({ guildId, name });

        if (!embedData) {
            return interaction.reply({ content: "❌ Embed not found!", ephemeral: true });
        }

        const { title, descriptionType, description, color, thumbnailType, thumbnailUrl, authorName, authorIconType, authorIconUrl, footerText, footerIconType, footerIconUrl } = embedData;

        const user = interaction.user;
        const guild = interaction.guild;
        const descriptions = {
            welcome: `Welcome **${user.username}** to **${guild.name}**! 🎉`,
            count_greet: `Hello **${user.username}**! You are the **${guild.memberCount}** member!`,
            leave_count_greet: `Goodbye **${user.username}**, we now have **${guild.memberCount}** members.`,
            custom: description
        };

        const embed = new EmbedBuilder()
            .setTitle(title.replace("{user}", user.username).replace("{server}", guild.name))
            .setDescription(descriptions[descriptionType])
            .setColor(color)
            .setTimestamp();

        if (thumbnailType === "custom") embed.setThumbnail(thumbnailUrl);
        else if (thumbnailType === "user") embed.setThumbnail(user.displayAvatarURL());
        else if (thumbnailType === "server") embed.setThumbnail(guild.iconURL());

        if (authorName) embed.setAuthor({ name: authorName });

        if (authorIconType === "custom") embed.setAuthor({ name: authorName, iconURL: authorIconUrl });
        else if (authorIconType === "user") embed.setAuthor({ name: authorName, iconURL: user.displayAvatarURL() });
        else if (authorIconType === "server") embed.setAuthor({ name: authorName, iconURL: guild.iconURL() });

        if (footerText) embed.setFooter({ text: footerText });

        if (footerIconType === "custom") embed.setFooter({ text: footerText, iconURL: footerIconUrl });
        else if (footerIconType === "user") embed.setFooter({ text: footerText, iconURL: user.displayAvatarURL() });
        else if (footerIconType === "server") embed.setFooter({ text: footerText, iconURL: guild.iconURL() });

        await interaction.reply({ embeds: [embed] });
    }
};
