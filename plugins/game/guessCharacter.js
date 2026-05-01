/*
 * ⚡ بوت برق - VALK Group
 * Plugin: خمن الشخصية
 * Owner: سونغ
 * © 2026 سونغ | VALK - All Rights Reserved
 */

if (!global.guessGame) global.guessGame = {};

const CHARACTERS = [
  { hints: ["شعره أصفر وعيونه زرقاء 💙","بيحب الراميين 🍜","حلمه يصبح هوكاجي 🏔️"], answers: ["ناروتو","naruto","ناروتو أوزوماكي"], anime: "Naruto 🍥" },
  { hints: ["قبعته من القش 👒","جسمه من المطاط 🪀","حلمه ملك القراصنة 🏴‍☠️"], answers: ["لوفي","luffy","مونكي دي لوفي"], anime: "One Piece 🏴‍☠️" },
  { hints: ["بيقاتل بـ 3 سيوف 🗡️","اسمه روورونوا","نايه بدل عين 🟩"], answers: ["زورو","zoro","روورونوا زورو"], anime: "One Piece 🏴‍☠️" },
  { hints: ["شعره أحمر 🔴","أخوه قتل قبيلته","عيونه شرينغان 👁️"], answers: ["ساسكي","sasuke","ساسكي أوتشيها"], anime: "Naruto 🍥" },
  { hints: ["شعره برتقالي 🟠","بيقدر يشوف الأرواح 👻","اسمه إيشيغو"], answers: ["إيشيغو","ichigo","إيشيغو كوروساكي"], anime: "Bleach ⚔️" },
  { hints: ["جسمه صغير ومش بيكبر 🔴","أخوه فقد جسمه 💀","بيدور على حجر الفيلسوف 💎"], answers: ["إدوارد","edward","إدوارد إلريك","edward elric"], anime: "Fullmetal Alchemist ⚙️" },
  { hints: ["قناع أسود 🎭","بيتحول لمنشار ⚙️","كلبه اسمه بوشيتا 🐕"], answers: ["دينجي","denji","ديندجي"], anime: "Chainsaw Man 🔪" },
  { hints: ["شعره أخضر 💚","مش عنده قوة من أول","استاذه أقوى شخص في العالم 🏆"], answers: ["ميدوريا","deku","izuku","ديكو","إيزوكو ميدوريا"], anime: "My Hero Academia 💥" },
  { hints: ["عيناه حمراء 🔴","قتل عشيرته كلها 😈","أخو ساسكي"], answers: ["إيتاشي","itachi","إيتاشي أوتشيها"], anime: "Naruto 🍥" },
  { hints: ["أقصر كابتن في الجيش 🗡️","شعره أسود","أقوى جندي في البشرية ⚔️"], answers: ["ليفاي","levi","ليفاي آكرمان"], anime: "Attack on Titan ⚔️" },
  { hints: ["شعره أبيض وعيونه مغطية 🩵","أقوى ساحر في العالم","قوته اللانهائي 💜"], answers: ["غوجو","gojo","ساتورو غوجو"], anime: "Jujutsu Kaisen 💜" },
  { hints: ["ملابسه بيانو 🎹","شعره يصحي لفوق","بيحب النساء جداً 💚"], answers: ["سانجي","sanji"], anime: "One Piece 🏴‍☠️" },
  { hints: ["شعره أحمر ومؤخر 🌊","أخت نامي تخيلاً","مرحة جداً 🔶"], answers: ["نامي","nami"], anime: "One Piece 🏴‍☠️" },
  { hints: ["أبطالها الأكاديمية 💥","شعره مفجور","بيحب إنه يفوز بأي طريقة"], answers: ["باكوغو","bakugo","كاتسوكي باكوغو"], anime: "My Hero Academia 💥" },
  { hints: ["بامبو في فمها 🎋","تتحول لشيطانة","لبسها وردي 🌸"], answers: ["نيزوكو","nezuko","نيزوكو كاميادو"], anime: "Demon Slayer 🔥" },
];

const TIMEOUT = 60000;

const guessChar = async (m, { conn }) => {
  const chatId = m.chat;
  if (global.guessGame[chatId]) {
    await conn.sendMessage(chatId, { text: `*❌ في لعبة شغالة! بعت .توقف*` }, { quoted: m });
    return;
  }

  const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

  await conn.sendMessage(chatId, {
    text: `
╭─┈─┈─┈─⟞🎌⟝─┈─┈─┈─╮
┃ 🌸 *خـمـن الـشـخـصـيـة - VALK*
╰─┈─┈─┈─⟞🎌⟝─┈─┈─┈─╯

🔍 *هنت 1:* ${char.hints[0]}

╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ ⏳ عندك *60 ثانية*
┃ 💡 *.هنت2* / *.هنت3*
┃ 🛑 *.توقف* للإيقاف
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
  }, { quoted: m });

  global.guessGame[chatId] = {
    char, hintsShown: 1,
    timeout: setTimeout(async () => {
      if (!global.guessGame[chatId]) return;
      delete global.guessGame[chatId];
      await conn.sendMessage(chatId, {
        text: `*⏰ انتهى الوقت!*\n✅ الشخصية: *${char.answers[0]}*\n🎌 من: *${char.anime}*\n> *⚡ برق | VALK 🌸*`
      });
    }, TIMEOUT)
  };
};

guessChar.before = async (m, { conn }) => {
  const chatId = m.chat;
  const game = global.guessGame[chatId];
  if (!game) return false;

  const txt = m.text?.trim().toLowerCase();

  if (txt === '.هنت2' || txt === '.hint2') {
    if (game.hintsShown >= 2) { await conn.sendMessage(chatId, { text: `💡 الهنت ده اتعرض!` }, { quoted: m }); return true; }
    game.hintsShown = 2;
    await conn.sendMessage(chatId, { text: `💡 *هنت 2:* ${game.char.hints[1]}` }, { quoted: m });
    return true;
  }

  if (txt === '.هنت3' || txt === '.hint3') {
    if (game.hintsShown >= 3) { await conn.sendMessage(chatId, { text: `💡 وصلت للهنتات كلها!` }, { quoted: m }); return true; }
    game.hintsShown = 3;
    await conn.sendMessage(chatId, { text: `💡 *هنت 3 (الأخير):* ${game.char.hints[2]}` }, { quoted: m });
    return true;
  }

  if (txt === '.توقف' || txt === '.stop') {
    clearTimeout(game.timeout);
    delete global.guessGame[chatId];
    await conn.sendMessage(chatId, { text: `🛑 *اتوقفت اللعبة!*\n✅ الشخصية: *${game.char.answers[0]}*\n🎌 من: *${game.char.anime}*` }, { quoted: m });
    return true;
  }

  const correct = game.char.answers.some(a => txt === a.toLowerCase());
  if (correct) {
    clearTimeout(game.timeout);
    delete global.guessGame[chatId];

    const jid = m.sender;
    const bonus = game.hintsShown === 1 ? 20 : game.hintsShown === 2 ? 15 : 10;
    const data = global.db?.get(jid) || { points: 0, wins: 0 };
    data.points = (data.points || 0) + bonus;
    data.wins = (data.wins || 0) + 1;
    global.db?.set(jid, data);

    await conn.sendMessage(chatId, {
      text: `
╭─┈─┈─┈─⟞🏆⟝─┈─┈─┈─╮
┃ 🎉 *صح! عرفتها!*
┃ 👤 @${jid.split('@')[0]}
┃ 🌸 الشخصية: *${game.char.answers[0]}*
┃ 🎌 من: *${game.char.anime}*
┃ ⭐ نقاط: *+${bonus}* (المجموع: ${data.points})
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim(),
      mentions: [jid]
    });
    return true;
  }

  return false;
};

guessChar.command = ['خمن', 'guess'];
guessChar.category = 'games';
guessChar.usage = ['خمن'];
guessChar.description = 'خمن شخصية الأنيمي من هنتات';
export default guessChar;
