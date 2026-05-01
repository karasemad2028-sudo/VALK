/*
 * ⚡ بوت برق - VALK Group
 * Plugin: ترتيب اللاعبين
 * Owner: سونغ
 * © 2026 سونغ | VALK - All Rights Reserved
 */

const leaderboard = async (m, { conn }) => {
  const allData = global.db?.getAll ? global.db.getAll() : {};
  const players = Object.entries(allData)
    .filter(([, v]) => v?.points > 0)
    .sort(([, a], [, b]) => (b.points || 0) - (a.points || 0))
    .slice(0, 10);

  if (!players.length) {
    await conn.sendMessage(m.chat, { text: `*❌ مفيش لاعبين لسه!*\nابدأ بـ *.كويز* أو *.سباق* 🎮` }, { quoted: m });
    return;
  }

  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
  const list = players.map(([jid, data], i) =>
    `┃ ${medals[i]} @${jid.split('@')[0]} ~ *${data.points || 0}* نقطة`
  ).join('\n');
  const mentions = players.map(([jid]) => jid);

  await conn.sendMessage(m.chat, {
    text: `
╭─┈─┈─┈─⟞🏆⟝─┈─┈─┈─╮
┃ 🌸 *ترتيب VALK للألعاب*
╰─┈─┈─┈─⟞🏆⟝─┈─┈─┈─╯

${list}

╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ 🎮 العب بـ *.كويز* أو *.سباق*
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim(),
    mentions
  }, { quoted: m });
};

leaderboard.command = ['ترتيب', 'leaderboard', 'top', 'نقاط'];
leaderboard.category = 'games';
leaderboard.usage = ['ترتيب'];
leaderboard.description = 'ترتيب اللاعبين بالنقاط';
export default leaderboard;
