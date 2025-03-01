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
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Autorole } = require("../../mongodb");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-autorole")
        .setDescription("Setup an AutoRole for new members.")
        .addSubcommand(subcommand =>
            subcommand.setName("set")
                .setDescription("Set the role to be assigned automatically.")
                .addRoleOption(option =>
                    option.setName("role")
                        .setDescription("The role to assign")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("status")
                .setDescription("Enable or disable AutoRole.")
                .addStringOption(option =>
                    option.setName("state")
                        .setDescription("Turn AutoRole ON or OFF")
                        .setRequired(true)
                        .addChoices(
                            { name: "ON", value: "on" },
                            { name: "OFF", value: "off" }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("view")
                .setDescription("View the current AutoRole settings.")
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const guildId = interaction.guild.id;

        if (subcommand === "set") {
            const role = interaction.options.getRole("role");

            await Autorole.findOneAndUpdate(
                { guildId },
                { roleId: role.id, status: true }, 
                { upsert: true }
            );

            return interaction.reply(`✅ AutoRole has been set to **${role.name}** and is now **ENABLED**.`);
        }

        if (subcommand === "status") {
            const state = interaction.options.getString("state");
            const status = state === "on";

            await Autorole.findOneAndUpdate(
                { guildId },
                { status },
                { upsert: true }
            );

            return interaction.reply(`✅ AutoRole is now **${status ? "ENABLED" : "DISABLED"}**.`);
        }

        if (subcommand === "view") {
            const settings = await Autorole.findOne({ guildId });

            if (!settings || !settings.roleId) {
                return interaction.reply("⚠ AutoRole is not set up yet.");
            }

            const role = interaction.guild.roles.cache.get(settings.roleId);
            return interaction.reply(`📌 **AutoRole Settings:**\n- **Role:** ${role ? role.name : "Deleted Role"}\n- **Status:** ${settings.status ? "ENABLED" : "DISABLED"}`);
        }
    }
};
