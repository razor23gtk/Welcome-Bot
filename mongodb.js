const mongoose = require("mongoose");
const config = require("./config");

async function connectDB() {
    if (mongoose.connection.readyState === 1) return; 
    try {
        await mongoose.connect(process.env.MONGO_URI || config.mongoURI);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
}


const leaveSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    channelId: { type: String, default: null },
    embedType: { type: Number, default: 1 },
});

const welcomeSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    channelId: { type: String, default: null },
    embedType: { type: Number, default: 1 },
});

const autoroleSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    roleId: { type: String, default: null },
    status: { type: Boolean, default: false },
});

const welcomeDMSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    dmStatus: { type: Boolean, default: false }, 
    dmEmbedType: { type: Number, default: 1 }, 
});

const leaveDMSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    dmStatus: { type: Boolean, default: false }, 
    dmEmbedType: { type: Number, default: 1 }, 
});

const inviteSchema =  new mongoose.Schema({
    guildId: { type: String, required: true },
    inviterId: { type: String, required: true },
    inviteCode: { type: String, required: true },
    uses: { type: Number, required: true }
});

const inviteSettingsSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    inviteLogChannelId: { type: String, default: null } 
});

// BETA 🕸️
// const embedSchema = new mongoose.Schema({
//     guildId: { type: String, required: true },
//     name: { type: String, required: true, unique: true },
//     title: { type: String, default: "" },
//     descriptionType: { type: String, enum: ["custom", "welcome", "count_greet", "leave_count_greet"], default: "custom" },
//     description: { type: String, default: "" },
//     color: { type: String, default: "#ffffff" },
//     thumbnailType: { type: String, enum: ["custom", "user", "server"], default: "server" },
//     thumbnailUrl: { type: String, default: "" },
//     authorName: { type: String, default: "" },
//     authorIconType: { type: String, enum: ["custom", "user", "server"], default: "user" },
//     authorIconUrl: { type: String, default: "" },
//     footerText: { type: String, default: "" },
//     footerIconType: { type: String, enum: ["custom", "user", "server"], default: "server" },
//     footerIconUrl: { type: String, default: "" },
//     fields: [
//         {
//             name: { type: String, required: true },
//             value: { type: String, required: true },
//             inline: { type: Boolean, default: false }
//         }
//     ]
// });

// ✅ Create Models
const Leave = mongoose.model("Leave", leaveSchema);
const Welcome = mongoose.model("Welcome", welcomeSchema);
const Autorole = mongoose.model("Autorole", autoroleSchema);
const WelcomeDM = mongoose.model("WelcomeDM", welcomeDMSchema);
const LeaveDM = mongoose.model("LeaveDM", leaveDMSchema);
const Invite = mongoose.model("Invite", inviteSchema);
const InviteSettings = mongoose.model("InviteSettings", inviteSettingsSchema);
// const CustomEmbed = mongoose.model("CustomEmbed", embedSchema);
module.exports = { connectDB, Leave, Welcome, Autorole, WelcomeDM, Invite, InviteSettings, LeaveDM  };
