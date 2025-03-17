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

const ruleEmbeds = {
    spam: new EmbedBuilder()
        .setColor("Red")
        .setTitle("🚫 Spam Rules")
        .setDescription(
            "**1️⃣ ما تبعثش رسائل بزاف:** حاول متبعثش رسائل كثيرة فوقت قصير.\n" +
            "**2️⃣ ما تديرش سبام ديال الإيموجي:** ما تغرقش الشات بالإيموجيز أو الستيكيرات.\n" +
            "**3️⃣ ما تديرش سبام ديال الرياكشن:** متزيدش أو تشيل الرياكشنات بزاف حيث كيسبب تشويش.\n" +
            "**4️⃣ ما تديرش كوبي-باستا:** النصوص الطويلة والمكررة ما مسموحش بها.\n" +
            "**5️⃣ ما تديرش سبام ديال الترويج لنفسك:** الترويج للمحتوى ديالك بشكل مفرط ممنوع."
        ),

    nsfw: new EmbedBuilder()
        .setColor("DarkPurple")
        .setTitle("🔞 NSFW Rules")
        .setDescription(
            "**1️⃣ NSFW content is not allowed:** This includes images, text, or links.\n" +
            "**2️⃣ No inappropriate jokes or discussions:** Keep it clean.\n" +
            "**3️⃣ No sexual harassment:** Making explicit or suggestive comments is prohibited.\n" +
            "**4️⃣ No adult roleplay:** This is not an 18+ server."
        ),

    discord_terms: new EmbedBuilder()
        .setColor("Blue")
        .setTitle("📜 Discord Terms & Conditions")
        .setDescription(
            "**1️⃣ Follow Discord's [Terms of Service](https://discord.com/terms)**.\n" +
            "**2️⃣ Follow Discord's [Community Guidelines](https://discord.com/guidelines)**.\n" +
            "**3️⃣ Do not use unauthorized bots, hacks, or exploits.**\n" +
            "**4️⃣ Do not engage in fraud, scamming, or phishing.**"
        ),

    harassment: new EmbedBuilder()
        .setColor("Orange")
        .setTitle("🚷 Harassment Rules")
        .setDescription(
            "**1️⃣ ما تديرش هجمات شخصية:** ما تهينش أو تستهدف الناس.\n" +
            "**2️⃣ ما تديرش خطاب كراهية:** العنصرية، التمييز الجنسي، رهاب المثلية، أو أي نوع من التمييز ممنوع تماما.\n" +
            "**3️⃣ ما تديرش تهديدات أو دويكس:** التهديد أو مشاركة المعلومات الخاصة هو شيء يؤدي للحظر.\n" +
            "**4️⃣ ما تديرش الترويل المفرط:** النكتة الخفيفة مقبولة، ولكن ما تكونش مسبب للفوضى."
        ),

    links: new EmbedBuilder()
        .setColor("Yellow")
        .setTitle("🔗 Link Rules")
        .setDescription(
            "**1️⃣ ما تديرش روابط ضارة:** الروابط ديال البرمجيات الخبيثة، الاحتيال، أو الروابط NSFW ما مسموحش بها.\n" +
            "**2️⃣ ما تديرش الترويج لنفسك خارج القنوات المخصصة:** الإعلانات خصها تكون فقط فالأماكن المسموح بها.\n" +
            "**3️⃣ ما تديرش روابط جمع الـIP، المتابعة، أو الروابط المختصرة:** فقط شارك روابط آمنة وقابلة للتحقق."
        ),

    images: new EmbedBuilder()
        .setColor("#FF00FF")
        .setTitle("🖼️ Image Rules")
        .setDescription(
            "**1️⃣ ما تديرش صور NSFW أو صور صريحة:** هادي مساحة آمنة.\n" +
            "**2️⃣ ما تديرش عنف مفرط أو مشاهد دموية:** خلي المحتوى مناسب.\n" +
            "**3️⃣ ما تديرش سبام ديال الميمات:** خلي نشر الميمات معقول.\n" +
            "**4️⃣ ما تديرش صور مسيئة أو تمييزية.**"
        ),

    hacking: new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("🛑 Hacking Rules")
        .setDescription(
            "**1️⃣ No hacking, cheating, or exploiting:** Do not attempt to hack bots, servers, or users.\n" +
            "**2️⃣ No sharing exploits or scripts:** Unauthorized software is forbidden.\n" +
            "**3️⃣ No social engineering or phishing:** Do not trick users into revealing sensitive information.\n" +
            "**4️⃣ No use of alt accounts to bypass bans or restrictions.**"
        ),

    mic_spam: new EmbedBuilder()
        .setColor("#FFA500")
        .setTitle("🎤 Mic Spam Rules")
        .setDescription(
            "**1️⃣ No loud, distorted, or annoying sounds:** Do not intentionally disrupt voice chats.\n" +
            "**2️⃣ No voice changers or soundboards:** Unless allowed in specific channels.\n" +
            "**3️⃣ No playing music through your mic:** Use the designated music bots instead.\n" +
            "**4️⃣ No screaming or shouting excessively.**"
        ),

    bot_usage: new EmbedBuilder()
        .setColor("#008000")
        .setTitle("🤖 Bot Usage Rules")
        .setDescription(
            "**1️⃣ Do not abuse bot commands:** Use them responsibly.\n" +
            "**2️⃣ No spamming bot commands in main channels:** Keep it in bot channels.\n" +
            "**3️⃣ Do not attempt to hack or exploit bots.**"
        ),

    trading_selling: new EmbedBuilder()
        .setColor("#8B4513")
        .setTitle("💰 Trading & Selling Rules")
        .setDescription(
            "**1️⃣ No selling accounts, items, or services:** This is not a marketplace.\n" +
            "**2️⃣ No trading or gambling activities:** Use trusted platforms instead.\n" +
            "**3️⃣ No advertising personal businesses without permission.**"
        ),

    language: new EmbedBuilder()
        .setColor("#4682B4")
        .setTitle("🗣️ Language Rules")
        .setDescription(
            "**1️⃣ English only in general channels:** Use other channels for different languages.\n" +
            "**2️⃣ No excessive swearing:** Keep the chat friendly.\n" +
            "**3️⃣ No slurs, insults, or offensive language.**"
        ),

    spoilers: new EmbedBuilder()
        .setColor("#A52A2A")
        .setTitle("🎥 Spoiler Rules")
        .setDescription(
            "**1️⃣ Use spoiler tags for major spoilers:** Example: `||spoiler here||`.\n" +
            "**2️⃣ No posting spoilers outside designated spoiler channels.**"
        ),

    self_promotion: new EmbedBuilder()
        .setColor("#9370DB")
        .setTitle("📢 Self-Promotion Rules")
        .setDescription(
            "**1️⃣ No self-promotion outside dedicated channels.**\n" +
            "**2️⃣ No DM advertising:** Do not send unsolicited links to members.\n" +
            "**3️⃣ No begging for followers, subscribers, or donations.**"
        ),

    moderation: new EmbedBuilder()
        .setColor("#228B22")
        .setTitle("⚖️ Moderation Rules")
        .setDescription(
            "**1️⃣ Respect moderators and their decisions.**\n" +
            "**2️⃣ Do not backseat moderate:** Let staff handle issues.\n" +
            "**3️⃣ If you have concerns, message staff privately.**"
        )
};

module.exports = ruleEmbeds;
