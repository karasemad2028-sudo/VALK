/*
 * ⚡ بوت برق - VALK Group
 * Plugin: لعبة سباق أسماء الأنيمي
 * Owner: سونغ
 * © 2026 سونغ | VALK - All Rights Reserved
 */

if (!global.animeRace) global.animeRace = {};

// قائمة أسماء أنيمي مقبولة
const VALID_ANIME = new Set([
  // عربي
  "ناروتو","ون بيس","بليتش","دراغون بول","هجوم العمالقة","قاتل الشياطين",
  "سحر جوجوتسو","ريمان رايدر","رجل المنشار","أبطالي الأكاديمية","هانتر هانتر",
  "فولميتال","الكيميائي","ديث نوت","كود غياس","كاغويا","سيلور مون","نينجا هاتوري",
  "دورايمون","شينشان","كابتن ماجد","أوليفر وتوم","سنان","الكرة الحديدية",
  "سيندباد","علاء الدين","المحقق كونان","ابطال الزمن","داي","ريو","سيوو",
  "دلتورا","توكيو غول","سايتاما","ون بانش مان","أنو هانا","كلانناد","ستيلا",
  "ماجيكا","سورد آرت أونلاين","نو غيم نو لايف","أوفن رود","كيلوا",
  "غون","ليوريو","كورابيكا","بيسك","نيتيرو","ميروم","هيسوكا",
  "رينغوكو","تانجيرو","نيزوكو","زينيتسو","إينوسكي","موزان",
  "يوجي","ميغومي","نوباره","ساتورو","سوكونا","ماهيتو",
  "ديكو","باكوغو","شوتو","اوراراكا","تسويو",
  "إيرن","ميكاسا","أرمين","ليفاي","هانجي","إيرفين",
  "لوفي","زورو","نامي","أوسوب","سانجي","تشوبر","روبين","فرانكي","بروك","جينبي",
  "ناروتو","ساسكي","ساكورا","كاكاشي","إيتاشي","أوبيتو","مينات",
  "إيشيغو","رويا","أورهيمي","تشاد","أوريهيمي","كينباكي","بيركي",
  "غوكو","فيغيتا","غوهان","بيكولو","فريزا","سيل","بو","تشي تشي",
  "إدوارد","ألفونس","روي","ريزا","سكار","لوست","غريد",
  "لايت","إل","ميسا","كيرا","نيار","مات",
  "ليلوش","سوزاكو","سي سي","كالين",
  // انجليزي
  "naruto","one piece","bleach","dragon ball","attack on titan","demon slayer",
  "jujutsu kaisen","chainsaw man","my hero academia","hunter x hunter",
  "fullmetal alchemist","death note","code geass","kaguya","sailor moon",
  "tokyo ghoul","one punch man","sword art online","no game no life",
  "black clover","fairy tail","seven deadly sins","re zero","overlord",
  "shield hero","konosuba","mob psycho","promised neverland","vinland saga",
  "berserk","vagabond","akira","evangelion","cowboy bebop","trigun",
  "steins gate","clannad","anohana","your name","weathering with you",
  "violet evergarden","made in abyss","mushishi","monster","monster musume",
  "toradora","zero two","darling franxx","86 eighty six","vivy",
  "jojo","jojo bizarre adventure","inuyasha","ranma","yu yu hakusho",
  "slam dunk","kuroko basket","haikyuu","blue lock","captain tsubasa",
  "initial d","neon genesis","gurren lagann","kill la kill","tengen toppa",
  "magi","aladdin","fate","fate stay night","fate zero","nanatsu no taizai",
  "aot","mha","bnha","fmab","hxh","sao","bnha","aot","snk","csm","jjk",
  "spy family","bocchi rock","oshi no ko","blue lock","chainsaw","dandadan"
]);

const GAME_DURATION = 30000; // 30 ثانية

const animeRace = async (m, { conn }) => {
  const chatId = m.chat;

  if (global.animeRace[chatId]) {
    await conn.sendMessage(chatId, {
      text: `*⏳ في سباق شغال! استنى ينتهي.*\n> *⚡ برق | VALK 🌸*`
    }, { quoted: m });
    return;
  }

  global.animeRace[chatId] = {
    scores: {},    // { jid: count }
    used: new Set(), // أسماء اتكتبت
    startTime: Date.now()
  };

  const txt = `
╭─┈─┈─┈─⟞🎌⟝─┈─┈─┈─╮
┃ 🏁 *سـبـاق أسـمـاء الأنـيـمـي!*
┃          *VALK ⚡*
╰─┈─┈─┈─⟞🎌⟝─┈─┈─┈─╯

┃ 📌 *القواعد:*
┃ • اكتب أسماء أنيمي واحد ورا التاني
┃ • كل اسم صح = نقطة ⭐
┃ • الاسم ميتكررش
┃ • عندك *30 ثانية* فقط!
┃
┃ 🔥 *يلا ابدأوا دلوقتي!*
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim();

  await conn.sendMessage(chatId, { text: txt }, { quoted: m });

  // إنهاء اللعبة بعد 30 ثانية
  setTimeout(async () => {
    const game = global.animeRace[chatId];
    if (!game) return;
    delete global.animeRace[chatId];

    const scores = game.scores;
    const players = Object.entries(scores).sort(([, a], [, b]) => b - a);

    if (!players.length) {
      await conn.sendMessage(chatId, {
        text: `*⏰ انتهى الوقت!*\nمحدش كتب حاجة! 😅\n> *⚡ برق | VALK 🌸*`
      });
      return;
    }

    const medals = ['🥇', '🥈', '🥉'];
    const list = players.map(([jid, count], i) => {
      const medal = medals[i] || `${i + 1}.`;
      return `┃ ${medal} @${jid.split('@')[0]} ~ *${count}* أنيمي`;
    }).join('\n');

    const winner = players[0];

    // حفظ النقاط في الداتابيس
    players.forEach(([jid, count]) => {
      const data = global.db?.get(jid) || { points: 0, wins: 0 };
      data.points = (data.points || 0) + count;
      if (jid === winner[0]) data.wins = (data.wins || 0) + 1;
      global.db?.set(jid, data);
    });

    const mentions = players.map(([jid]) => jid);

    await conn.sendMessage(chatId, {
      text: `
╭─┈─┈─┈─⟞🏆⟝─┈─┈─┈─╮
┃ 🏁 *انتهى السباق! النتيجة:*
╰─┈─┈─┈─⟞🏆⟝─┈─┈─┈─╯

${list}

┃ 🏆 الفائز: @${winner[0].split('@')[0]}
┃    كتب *${winner[1]}* أنيمي! 🔥

╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ العب تاني بـ *.سباق*
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim(),
      mentions
    });
  }, GAME_DURATION);
};

animeRace.before = async (m, { conn }) => {
  const chatId = m.chat;
  const game = global.animeRace[chatId];
  if (!game) return false;

  const txt = m.text?.trim().toLowerCase();
  if (!txt || txt.startsWith('.') || txt.startsWith('/') || txt.startsWith('!')) return false;

  // تحقق إن الاسم أنيمي صح
  if (!VALID_ANIME.has(txt)) return false;

  // تحقق من التكرار
  if (game.used.has(txt)) {
    await conn.sendMessage(chatId, {
      text: `❌ *"${m.text.trim()}"* اتكتب قبل كده!`
    }, { quoted: m });
    return true;
  }

  // سجل النقطة
  game.used.add(txt);
  const jid = m.sender;
  game.scores[jid] = (game.scores[jid] || 0) + 1;

  const count = game.scores[jid];
  const timeLeft = Math.ceil((GAME_DURATION - (Date.now() - game.startTime)) / 1000);

  await conn.sendMessage(chatId, {
    text: `✅ *${m.text.trim()}* ~ نقطة! (عندك ${count} | باقي ${timeLeft}ث) ⭐`
  }, { quoted: m });

  return true;
};

animeRace.command = ['سباق', 'race', 'سباق انيمي', 'انيمي ريس'];
animeRace.category = 'games';
animeRace.usage = ['سباق'];
animeRace.description = 'سباق كتابة أسماء أنيمي (30 ثانية)';
export default animeRace;
