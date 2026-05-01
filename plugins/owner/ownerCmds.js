/*
 * ⚡ بوت برق - VALK Group
 * Plugin: أوامر المالك - سونغ فقط
 * Owner: سونغ
 * © 2026 سونغ | VALK - All Rights Reserved
 */

const checkOwner = (m, bot) => bot.config.owners?.some(o => o.jid === m.sender);

// ========== مسح النقاط ==========
const resetPoints = async (m, { conn, bot }) => {
  if (!checkOwner(m, bot)) { await conn.sendMessage(m.chat, { text: `*❌ الأمر ده لسونغ بس! ⚡*` }, { quoted: m }); return; }
  const allData = global.db?.getAll ? global.db.getAll() : {};
  Object.keys(allData).forEach(k => {
    const data = global.db.get(k);
    if (data) { data.points = 0; data.wins = 0; global.db.set(k, data); }
  });
  await conn.sendMessage(m.chat, { text: `✅ *اتمسحت كل النقاط!*\n> *© 2026 سونغ | VALK - All Rights Reserved*` }, { quoted: m });
};
resetPoints.command = ['مسح نقاط', 'resetpoints'];
resetPoints.category = 'owner';
resetPoints.usage = ['مسح نقاط'];
resetPoints.description = 'مسح كل نقاط اللاعبين (سونغ فقط)';
resetPoints.isOwner = true;

// ========== برودكاست ==========
const broadcast = async (m, { conn, bot }) => {
  if (!checkOwner(m, bot)) { await conn.sendMessage(m.chat, { text: `*❌ الأمر ده لسونغ بس! ⚡*` }, { quoted: m }); return; }
  const text = m.text?.split(' ').slice(1).join(' ')?.trim();
  if (!text) { await conn.sendMessage(m.chat, { text: `*الاستخدام:* .برودكاست [الرسالة]` }, { quoted: m }); return; }
  await conn.sendMessage(m.chat, {
    text: `
╭─┈─┈─┈─⟞📢⟝─┈─┈─┈─╮
┃ 📢 *إعلان من سونغ ⚡*
╰─┈─┈─┈─⟞📢⟝─┈─┈─┈─╯

${text}

> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
  });
};
broadcast.command = ['برودكاست', 'broadcast', 'اعلان'];
broadcast.category = 'owner';
broadcast.usage = ['برودكاست [نص]'];
broadcast.description = 'إرسال إعلان للجروب (سونغ فقط)';
broadcast.isOwner = true;

// ========== تشغيل / إيقاف البوت ==========
const toggleBot = async (m, { conn, bot }) => {
  if (!checkOwner(m, bot)) { await conn.sendMessage(m.chat, { text: `*❌ الأمر ده لسونغ بس! ⚡*` }, { quoted: m }); return; }
  if (!global.disabledChats) global.disabledChats = new Set();
  if (global.disabledChats.has(m.chat)) {
    global.disabledChats.delete(m.chat);
    await conn.sendMessage(m.chat, { text: `✅ *البوت اتشغّل في الجروب ده!* ⚡\n> *© 2026 سونغ | VALK - All Rights Reserved*` }, { quoted: m });
  } else {
    global.disabledChats.add(m.chat);
    await conn.sendMessage(m.chat, { text: `🔴 *البوت اتوقف في الجروب ده!*\n> *© 2026 سونغ | VALK - All Rights Reserved*` }, { quoted: m });
  }
};
toggleBot.command = ['تشغيل', 'إيقاف', 'boton', 'botoff'];
toggleBot.category = 'owner';
toggleBot.usage = ['تشغيل / إيقاف'];
toggleBot.description = 'تشغيل/إيقاف البوت في الجروب (سونغ فقط)';
toggleBot.isOwner = true;

// ========== إعادة تشغيل البوت ==========
const restart = async (m, { conn, bot }) => {
  if (!checkOwner(m, bot)) { await conn.sendMessage(m.chat, { text: `*❌ الأمر ده لسونغ بس! ⚡*` }, { quoted: m }); return; }
  await conn.sendMessage(m.chat, { text: `🔄 *البوت بيعيد التشغيل...*\n> *⚡ برق | VALK 🌸*` }, { quoted: m });
  setTimeout(() => process.exit(0), 2000);
};
restart.command = ['ريستارت', 'restart', 'اعد تشغيل'];
restart.category = 'owner';
restart.usage = ['ريستارت'];
restart.description = 'إعادة تشغيل البوت (سونغ فقط)';
restart.isOwner = true;

// ========== معلومات المالك ==========
const ownerInfo = async (m, { conn, bot }) => {
  await conn.sendMessage(m.chat, {
    text: `
╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ 👑 *مالك بوت برق*
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯

┃ 📛 الاسم: *سونغ*
┃ 📱 الرقم: *+201142463097*
┃ 🌸 الجروب: *VALK*
┃ ⚡ البوت: *برق AI*

╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
  }, { quoted: m });
};
ownerInfo.command = ['المالك', 'owner', 'سونغ'];
ownerInfo.category = 'info';
ownerInfo.usage = ['المالك'];
ownerInfo.description = 'معلومات مالك البوت';

// ========== معلومات البوت ==========
const botInfo = async (m, { conn }) => {
  const uptime = process.uptime();
  const h = Math.floor(uptime / 3600);
  const min = Math.floor((uptime % 3600) / 60);
  const s = Math.floor(uptime % 60);
  const mem = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);

  await conn.sendMessage(m.chat, {
    text: `
╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ 🤖 *بـوت بـرق | VALK*
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯

┃ 📛 الاسم: *⚡ برق AI ⚡*
┃ 👑 المالك: *سونغ*
┃ 🌸 الجروب: *VALK*
┃ 📦 الإصدار: *1.0.0*
┃ ⚙️ Framework: *MeowSab*
┃
┃ ⏱️ وقت التشغيل: *${h}س ${min}د ${s}ث*
┃ 💾 الذاكرة: *${mem} MB*
┃
┃ 🎮 الألعاب:
┃  • *.كويز* ~ كويز أنيمي
┃  • *.سباق* ~ سباق أسماء أنيمي
┃  • *.خمن* ~ خمن الشخصية
┃  • *.معركة* ~ معركة بالتصويت
┃  • *.ترتيب* ~ ترتيب اللاعبين
┃
┃ 📥 التحميل:
┃  • *.يوتيوب [بحث/لينك]*
┃  • *.تيكتوك [لينك]*
┃
┃ 🎌 الأنيمي:
┃  • *.شخصية* ~ معلومات شخصية
┃  • *.اقتباس* ~ اقتباس عشوائي
┃  • *.توب* ~ أفضل 10 أنيمي

╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ © 2026 سونغ | VALK
┃ All Rights Reserved ⚡
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯`.trim()
  }, { quoted: m });
};
botInfo.command = ['بوت', 'bot', 'برق', 'info'];
botInfo.category = 'info';
botInfo.usage = ['بوت'];
botInfo.description = 'معلومات البوت';

export { resetPoints as default, broadcast, toggleBot, restart, ownerInfo, botInfo };
