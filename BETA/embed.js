const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { CustomEmbed } = require("../mongodb");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed-create")
        .setDescription("Create a custom welcome embed.")
        .addStringOption(option => option.setName("name").setDescription("Unique embed name").setRequired(true))
        .addStringOption(option => option.setName("title").setDescription("Embed title").setRequired(true))
        .addStringOption(option => 
            option.setName("description_type")
                .setDescription("Choose a predefined description type")
                .setRequired(true)
                .addChoices(
                    { name: "Custom", value: "custom" },
                    { name: "Welcome Message", value: "welcome" },
                    { name: "Welcome + Member Count", value: "count_greet" },
                    { name: "Leave + Member Count", value: "leave_count_greet" }
                )
        )
        .addStringOption(option => option.setName("color").setDescription("Hex color code (#ffffff)").setRequired(true))
        .addStringOption(option => 
            option.setName("thumbnail")
                .setDescription("Choose a thumbnail option")
                .setRequired(true)
                .addChoices(
                    { name: "User Avatar", value: "user" },
                    { name: "Server Icon", value: "server" },
                    { name: "Custom URL", value: "custom" }
                )
        )
        .addStringOption(option => option.setName("thumbnail_url").setDescription("Thumbnail URL (if custom)").setRequired(false))
        .addStringOption(option => option.setName("author").setDescription("Author name").setRequired(false))
        .addStringOption(option => 
            option.setName("author_icon")
                .setDescription("Choose an author icon option")
                .setRequired(false)
                .addChoices(
                    { name: "User Avatar", value: "user" },
                    { name: "Server Icon", value: "server" },
                    { name: "Custom URL", value: "custom" }
                )
        )
        .addStringOption(option => option.setName("author_icon_url").setDescription("Author icon URL (if custom)").setRequired(false))
        .addStringOption(option => option.setName("footer").setDescription("Footer text").setRequired(false))
        .addStringOption(option => 
            option.setName("footer_icon")
                .setDescription("Choose a footer icon option")
                .setRequired(false)
                .addChoices(
                    { name: "User Avatar", value: "user" },
                    { name: "Server Icon", value: "server" },
                    { name: "Custom URL", value: "custom" }
                )
        )
        .addStringOption(option => option.setName("description").setDescription("Embed description (ignored if predefined)").setRequired(false))
        .addStringOption(option => option.setName("footer_icon_url").setDescription("Footer icon URL (if custom)").setRequired(false)),

    async execute(interaction) {
        const guildId = interaction.guild.id;
        const name = interaction.options.getString("name");
        const title = interaction.options.getString("title");
        const descriptionType = interaction.options.getString("description_type");
        const description = interaction.options.getString("description") || "";
        const color = interaction.options.getString("color");

        const thumbnailType = interaction.options.getString("thumbnail");
        const thumbnailUrl = interaction.options.getString("thumbnail_url") || "";

        const authorName = interaction.options.getString("author") || "";
        const authorIconType = interaction.options.getString("author_icon") || "user";
        const authorIconUrl = interaction.options.getString("author_icon_url") || "";

        const footerText = interaction.options.getString("footer") || "";
        const footerIconType = interaction.options.getString("footer_icon") || "server";
        const footerIconUrl = interaction.options.getString("footer_icon_url") || "";

        // Save to database
        await CustomEmbed.findOneAndUpdate(
            { guildId, name },
            { 
                title, descriptionType, description, color, thumbnailType, thumbnailUrl, 
                authorName, authorIconType, authorIconUrl,
                footerText, footerIconType, footerIconUrl
            },
            { upsert: true }
        );

        await interaction.reply(`✅ Custom embed **${name}** has been created!`);
    }
};
