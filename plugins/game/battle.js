/*
 * ⚡ بوت برق - VALK Group
 * Plugin: معركة الأنيمي بالتصويت
 * Owner: سونغ
 * © 2026 سونغ | VALK - All Rights Reserved
 */

if (!global.battleGame) global.battleGame = {};

const FIGHTERS = [
  { name: "ناروتو أوزوماكي", power: 95, anime: "Naruto 🍥", move: "رياح الألف طعنة 💨" },
  { name: "ساسكي أوتشيها", power: 94, anime: "Naruto 🍥", move: "أماتيراسو 🔥" },
  { name: "غوكو", power: 100, anime: "Dragon Ball 🐉", move: "Ultra Instinct 🌟" },
  { name: "إيشيغو كوروساكي", power: 96, anime: "Bleach ⚔️", move: "Getsuga Tensho ⚡" },
  { name: "إيرن ييغر", power: 90, anime: "AoT ⚔️", move: "قوة التيتان المؤسس 💀" },
  { name: "يوجي إيتادوري", power: 88, anime: "JJK 💜", move: "لكمة الأنياب 👊" },
  { name: "ليفاي آكرمان", power: 92, anime: "AoT ⚔️", move: "ضربة البرق 🗡️" },
  { name: "تانجيرو كاميادو", power: 85, anime: "Demon Slayer 🔥", move: "نفس الشمس التاسع ☀️" },
  { name: "دينجي - Chainsaw Man", power: 93, anime: "Chainsaw Man 🔪", move: "رئيس المنشار 🔪" },
  { name: "ميدوريا ديكو", power: 89, anime: "MHA 💥", move: "One For All: Full Cowl 💥" },
  { name: "روورونوا زورو", power: 91, anime: "One Piece 🏴‍☠️", move: "أسلوب الثلاثة ألف عالم 🗡️" },
  { name: "لوفي - Gear 5", power: 97, anime: "One Piece 🏴‍☠️", move: "ضحكة الشمس ☀️" },
  { name: "ساتورو غوجو", power: 99, anime: "JJK 💜", move: "اللانهائي 💙" },
  { name: "إيتاشي أوتشيها", power: 93, anime: "Naruto 🍥", move: "تسوكيوومي 🌙" },
  { name: "فيغيتا", power: 96, anime: "Dragon Ball 🐉", move: "Final Flash ⚡" },
];

const battle = async (m, { conn }) => {
  const chatId = m.chat;
  if (global.battleGame[chatId]) {
    await conn.sendMessage(chatId, { text: `*❌ في معركة شغالة! استنى*` }, { quoted: m });
    return;
  }

  const f1 = FIGHTERS[Math.floor(Math.random() * FIGHTERS.length)];
  let f2 = FIGHTERS[Math.floor(Math.random() * FIGHTERS.length)];
  while (f2.name === f1.name) f2 = FIGHTERS[Math.floor(Math.random() * FIGHTERS.length)];

  global.battleGame[chatId] = { f1, f2, votes: {}, startTime: Date.now() };

  await conn.sendMessage(chatId, {
    text: `
╭─┈─┈─┈─⟞⚔️⟝─┈─┈─┈─╮
┃ ⚔️ *مـعـركـة الأنـيـمـي - VALK*
╰─┈─┈─┈─⟞⚔️⟝─┈─┈─┈─╯

┃ 🔴 *${f1.name}*
┃    الأنيمي: ${f1.anime}
┃    القوة: ${'⭐'.repeat(Math.floor(f1.power / 10))}
┃    الحركة: ${f1.move}
┃
┃ 〰️ *VS* 〰️
┃
┃ 🔵 *${f2.name}*
┃    الأنيمي: ${f2.anime}
┃    القوة: ${'⭐'.repeat(Math.floor(f2.power / 10))}
┃    الحركة: ${f2.move}

╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ 🔴 بعت *1* للأول
┃ 🔵 بعت *2* للتاني
┃ ⏳ التصويت 30 ثانية
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
  }, { quoted: m });

  setTimeout(async () => {
    const game = global.battleGame[chatId];
    if (!game) return;
    delete global.battleGame[chatId];

    const v1 = Object.values(game.votes).filter(v => v === 1).length;
    const v2 = Object.values(game.votes).filter(v => v === 2).length;

    let winner, loser;
    if (v1 > v2) { winner = game.f1; loser = game.f2; }
    else if (v2 > v1) { winner = game.f2; loser = game.f1; }
    else { winner = game.f1.power >= game.f2.power ? game.f1 : game.f2; loser = winner === game.f1 ? game.f2 : game.f1; }

    await conn.sendMessage(chatId, {
      text: `
╭─┈─┈─┈─⟞🏆⟝─┈─┈─┈─╮
┃ 🏆 *نتيجة المعركة!*
╰─┈─┈─┈─⟞🏆⟝─┈─┈─┈─╯

┃ 🔴 أصوات *${game.f1.name}*: ${v1} 🗳️
┃ 🔵 أصوات *${game.f2.name}*: ${v2} 🗳️
┃
┃ 🏆 الفائز: *${winner.name}*
┃ 💥 الحركة: ${winner.move}
┃ 💀 الخسران: *${loser.name}*
${v1 === v2 ? '┃ ⚖️ (تعادل في الأصوات، الأقوى فاز!)' : ''}

╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
    });
  }, 30000);
};

battle.before = async (m, { conn }) => {
  const chatId = m.chat;
  const game = global.battleGame[chatId];
  if (!game) return false;

  const txt = m.text?.trim();
  if (txt === '1') {
    game.votes[m.sender] = 1;
    await conn.sendMessage(chatId, { text: `✅ @${m.sender.split('@')[0]} صوّت لـ *${game.f1.name}* 🔴`, mentions: [m.sender] }, { quoted: m });
    return true;
  }
  if (txt === '2') {
    game.votes[m.sender] = 2;
    await conn.sendMessage(chatId, { text: `✅ @${m.sender.split('@')[0]} صوّت لـ *${game.f2.name}* 🔵`, mentions: [m.sender] }, { quoted: m });
    return true;
  }
  return false;
};

battle.command = ['معركة', 'battle', 'فايت'];
battle.category = 'games';
battle.usage = ['معركة'];
battle.description = 'معركة شخصيتين بالتصويت (30 ثانية)';
export default battle;
