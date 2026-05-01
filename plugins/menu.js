/*
 * ⚡ بوت برق - VALK Group
 * Plugin: القائمة الرئيسية
 * Owner: سونغ
 * © 2026 سونغ | VALK - All Rights Reserved
 */

const MENU_TIMEOUT = 120000;

const CATEGORIES = [
  [1, 'الألعاب', 'games', '🎮'],
  [2, 'الأنيمي', 'anime', '🎌'],
  [3, 'التحميل', 'download', '📥'],
  [4, 'الجروب', 'group', '🌸'],
  [5, 'الأدمن', 'admin', '👑'],
  [6, 'المالك', 'owner', '⚡'],
  [7, 'معلومات', 'info', '🤖'],
];

if (!global.barqMenus) global.barqMenus = {};

const clean = () => {
  const now = Date.now();
  Object.keys(global.barqMenus).forEach(k => {
    if (now - global.barqMenus[k].time > MENU_TIMEOUT) delete global.barqMenus[k];
  });
};

const getImg = (bot) => {
  const { images } = bot.config.info;
  return Array.isArray(images) ? images[Math.floor(Math.random() * images.length)] : images;
};

const barqMenu = async (m, { conn, bot }) => {
  clean();
  const cmds = await bot.getAllCommands();
  const cats = {};
  cmds.forEach(c => {
    if (!c.usage?.length) return;
    const cat = c.category || 'other';
    if (!cats[cat]) cats[cat] = [];
    cats[cat].push(c);
  });

  const txt = `
╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ ⚡ *بـوت بـرق | VALK 🌸*
┃ 👑 المالك: *سونغ*
┃ 🎌 جروب أنيمي VALK
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯

${CATEGORIES.map(c => `┃ ${c[3]} *${c[0]}* ~ قسم ${c[1]}`).join('\n')}

╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ 📩 رد بـ *رقم القسم* فقط
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim();

  const msg = await conn.sendMessage(m.chat, {
    text: txt,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: "⚡ بوت برق | VALK 🌸",
        body: "بوت أنيمي جروب VALK | سونغ",
        thumbnailUrl: getImg(bot),
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  global.barqMenus[msg.key.id] = { cats, chatId: m.chat, time: Date.now() };
};

barqMenu.before = async (m, { conn, bot }) => {
  clean();
  const menuData = global.barqMenus[m.quoted?.id];
  if (!menuData) return false;

  const num = parseInt(m.text?.trim());
  const cat = CATEGORIES.find(c => c[0] === num);

  if (!cat) {
    await conn.sendMessage(m.chat, { text: `*❌ اختار رقم من 1 لـ ${CATEGORIES.length}*` }, { quoted: m });
    return true;
  }

  const cmds = menuData.cats[cat[2]];
  if (!cmds?.length) {
    await conn.sendMessage(m.chat, { text: `*❌ القسم فاضي حالياً*` }, { quoted: m });
    return true;
  }

  await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.quoted.id, fromMe: true } }).catch(() => {});
  delete global.barqMenus[m.quoted.id];

  const cmdsList = cmds.map(c =>
    `┃ ${cat[3]} *.${c.usage[0]}*${c.description ? ` ~ ${c.description}` : ''}`
  ).join('\n');

  await conn.sendMessage(m.chat, {
    text: `
╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
┃ *${cat[3]} قسم ${cat[1]}*
╰─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╯

${cmdsList}

╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ *⚡ برق | سونغ | VALK 🌸*
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim(),
    contextInfo: {
      externalAdReply: {
        title: "⚡ بوت برق | VALK 🌸",
        body: `قسم ${cat[1]} ${cat[3]}`,
        thumbnailUrl: getImg(bot),
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  return true;
};

barqMenu.command = ['قائمة', 'menu', 'اوامر', 'الاوامر', 'help', 'هيلب'];
barqMenu.category = 'info';
barqMenu.usage = ['قائمة'];
barqMenu.description = 'قائمة أوامر برق';
export default barqMenu;
