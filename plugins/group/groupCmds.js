/*
 * ⚡ بوت برق - VALK Group
 * Plugin: إدارة الجروب
 * Owner: سونغ
 * © 2026 سونغ | VALK - All Rights Reserved
 */

const isAdmin = async (conn, chatId, userId) => {
  try {
    const meta = await conn.groupMetadata(chatId);
    return meta.participants.some(p => p.id === userId && (p.admin === 'admin' || p.admin === 'superadmin'));
  } catch { return false; }
};

// ========== قوانين الجروب ==========
const rules = async (m, { conn }) => {
  await conn.sendMessage(m.chat, {
    text: `
╭─┈─┈─┈─⟞🌸⟝─┈─┈─┈─╮
┃ 📜 *قـوانـيـن جـروب VALK*
╰─┈─┈─┈─⟞🌸⟝─┈─┈─┈─╯

┃ 1️⃣ الاحترام المتبادل بين الأعضاء
┃ 2️⃣ ممنوع السب والكلام الوقح
┃ 3️⃣ ممنوع الإعلانات بدون إذن الأدمن
┃ 4️⃣ الموضوع أنيمي فقط 🎌
┃ 5️⃣ ممنوع الـ Spoiler بدون تحذير ⚠️
┃ 6️⃣ احترم رأي غيرك في الأنيمي
┃ 7️⃣ ممنوع البان المتبادل
┃ 8️⃣ كلمة الأدمن هي الفصل 👑

╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ ⚠️ مخالفة القوانين = كيك فوري
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
  }, { quoted: m });
};
rules.command = ['قوانين', 'rules'];
rules.category = 'group';
rules.usage = ['قوانين'];
rules.description = 'قوانين جروب VALK';

// ========== ترحيب ==========
const welcome = async (m, { conn }) => {
  await conn.sendMessage(m.chat, {
    text: `
╭─┈─┈─┈─⟞🌸⟝─┈─┈─┈─╮
┃ 🎌 *أهلاً في VALK*
╰─┈─┈─┈─⟞🌸⟝─┈─┈─┈─╯

┃ 👋 مرحباً @${m.sender.split('@')[0]}
┃ 🌸 في جروب أنيمي VALK
┃ 📜 *.قوانين* للقوانين
┃ 🎮 *.كويز* للألعاب
┃ 📋 *.قائمة* لكل الأوامر

╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ استمتع وشارك! 🎉
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim(),
    mentions: [m.sender]
  }, { quoted: m });
};
welcome.command = ['ترحيب', 'welcome'];
welcome.category = 'group';
welcome.usage = ['ترحيب'];
welcome.description = 'رسالة ترحيب بالجروب';

// ========== كيك ==========
const kick = async (m, { conn, bot }) => {
  if (!m.isGroup) { await conn.sendMessage(m.chat, { text: `*❌ الأمر ده للجروبات بس!*` }, { quoted: m }); return; }
  const amAdmin = await isAdmin(conn, m.chat, conn.user.id);
  const senderAdmin = await isAdmin(conn, m.chat, m.sender);
  const isOwner = bot.config.owners?.some(o => o.jid === m.sender);
  if (!amAdmin) { await conn.sendMessage(m.chat, { text: `*❌ البوت مش أدمن!*` }, { quoted: m }); return; }
  if (!senderAdmin && !isOwner) { await conn.sendMessage(m.chat, { text: `*❌ الأمر ده للأدمن بس!*` }, { quoted: m }); return; }
  const target = m.mentionedJid?.[0] || m.quoted?.sender;
  if (!target) { await conn.sendMessage(m.chat, { text: `*❌ منشن اللي هتكيكه!*\nمثال: .كيك @شخص` }, { quoted: m }); return; }
  await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
  await conn.sendMessage(m.chat, {
    text: `✅ *اتكيك @${target.split('@')[0]} بنجاح!* 🚪\n> *© 2026 سونغ | VALK - All Rights Reserved*`,
    mentions: [target]
  }, { quoted: m });
};
kick.command = ['كيك', 'kick', 'طرد'];
kick.category = 'admin';
kick.usage = ['كيك @شخص'];
kick.description = 'كيك شخص من الجروب (أدمن فقط)';

// ========== ترقية ==========
const promote = async (m, { conn, bot }) => {
  if (!m.isGroup) return;
  const amAdmin = await isAdmin(conn, m.chat, conn.user.id);
  const senderAdmin = await isAdmin(conn, m.chat, m.sender);
  const isOwner = bot.config.owners?.some(o => o.jid === m.sender);
  if (!amAdmin) { await conn.sendMessage(m.chat, { text: `*❌ البوت مش أدمن!*` }, { quoted: m }); return; }
  if (!senderAdmin && !isOwner) { await conn.sendMessage(m.chat, { text: `*❌ الأمر ده للأدمن بس!*` }, { quoted: m }); return; }
  const target = m.mentionedJid?.[0] || m.quoted?.sender;
  if (!target) { await conn.sendMessage(m.chat, { text: `*❌ منشن الشخص!*` }, { quoted: m }); return; }
  await conn.groupParticipantsUpdate(m.chat, [target], 'promote');
  await conn.sendMessage(m.chat, {
    text: `✅ *@${target.split('@')[0]} بقى أدمن!* 👑\n> *© 2026 سونغ | VALK - All Rights Reserved*`,
    mentions: [target]
  }, { quoted: m });
};
promote.command = ['ترقية', 'promote'];
promote.category = 'admin';
promote.usage = ['ترقية @شخص'];
promote.description = 'ترقية لأدمن';

// ========== إزالة أدمن ==========
const demote = async (m, { conn, bot }) => {
  if (!m.isGroup) return;
  const amAdmin = await isAdmin(conn, m.chat, conn.user.id);
  const senderAdmin = await isAdmin(conn, m.chat, m.sender);
  const isOwner = bot.config.owners?.some(o => o.jid === m.sender);
  if (!amAdmin || (!senderAdmin && !isOwner)) { await conn.sendMessage(m.chat, { text: `*❌ مش عندك صلاحية!*` }, { quoted: m }); return; }
  const target = m.mentionedJid?.[0] || m.quoted?.sender;
  if (!target) { await conn.sendMessage(m.chat, { text: `*❌ منشن الشخص!*` }, { quoted: m }); return; }
  await conn.groupParticipantsUpdate(m.chat, [target], 'demote');
  await conn.sendMessage(m.chat, {
    text: `✅ *اتشالت صلاحية @${target.split('@')[0]}!*\n> *© 2026 سونغ | VALK - All Rights Reserved*`,
    mentions: [target]
  }, { quoted: m });
};
demote.command = ['ازالة ادمن', 'demote'];
demote.category = 'admin';
demote.usage = ['ازالة ادمن @شخص'];
demote.description = 'إزالة صلاحية أدمن';

// ========== قفل / فتح ==========
const lockGroup = async (m, { conn, bot }) => {
  if (!m.isGroup) return;
  const amAdmin = await isAdmin(conn, m.chat, conn.user.id);
  const senderAdmin = await isAdmin(conn, m.chat, m.sender);
  const isOwner = bot.config.owners?.some(o => o.jid === m.sender);
  if (!amAdmin || (!senderAdmin && !isOwner)) { await conn.sendMessage(m.chat, { text: `*❌ مش عندك صلاحية!*` }, { quoted: m }); return; }
  const cmd = m.text?.trim().split(' ')[0].replace(/[.\/!]/g, '');
  const isLock = ['قفل', 'lock'].includes(cmd);
  await conn.groupSettingUpdate(m.chat, isLock ? 'announcement' : 'not_announcement');
  await conn.sendMessage(m.chat, {
    text: isLock
      ? `🔒 *الجروب اتقفل! بس الأدمن يقدر يبعت.*\n> *© 2026 سونغ | VALK - All Rights Reserved*`
      : `🔓 *الجروب اتفتح! الكل يقدر يبعت.*\n> *© 2026 سونغ | VALK - All Rights Reserved*`
  }, { quoted: m });
};
lockGroup.command = ['قفل', 'فتح', 'lock', 'unlock'];
lockGroup.category = 'admin';
lockGroup.usage = ['قفل / فتح'];
lockGroup.description = 'قفل أو فتح الجروب';

// ========== تغيير اسم الجروب ==========
const setName = async (m, { conn, bot }) => {
  if (!m.isGroup) return;
  const isOwner = bot.config.owners?.some(o => o.jid === m.sender);
  const senderAdmin = await isAdmin(conn, m.chat, m.sender);
  if (!isOwner && !senderAdmin) { await conn.sendMessage(m.chat, { text: `*❌ الأمر ده للأدمن بس!*` }, { quoted: m }); return; }
  const name = m.text?.split(' ').slice(1).join(' ')?.trim();
  if (!name) { await conn.sendMessage(m.chat, { text: `*❌ اكتب الاسم الجديد!*\nمثال: .اسم VALK 2025` }, { quoted: m }); return; }
  await conn.groupUpdateSubject(m.chat, name);
  await conn.sendMessage(m.chat, { text: `✅ *اتغير اسم الجروب لـ "${name}"!*\n> *© 2026 سونغ | VALK - All Rights Reserved*` }, { quoted: m });
};
setName.command = ['اسم الجروب', 'setname', 'اسم'];
setName.category = 'admin';
setName.usage = ['اسم [الاسم الجديد]'];
setName.description = 'تغيير اسم الجروب (أدمن فقط)';

export { rules as default, welcome, kick, promote, demote, lockGroup, setName };
