/*
 * ⚡ بوت برق - VALK Group
 * Plugin: الأنيمي (ردود + معلومات + اقتباسات + توب)
 * Owner: سونغ
 * © 2026 سونغ | VALK - All Rights Reserved
 */

// ======== ردود تلقائية ========
const ANIME_RESPONSES = [
  { triggers: ["ناروتو","naruto"], reply: "🍥 *ناروتو أوزوماكي!*\nدتتبع! رياح الألف طعنة جاية 💨\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["one piece","ون بيس","لوفي"], reply: "🏴‍☠️ *ون بيس!*\nGear 5 لوفي على رأس العالم ☀️\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["demon slayer","قاتل الشياطين","تانجيرو","نيزوكو"], reply: "🔥 *قاتل الشياطين!*\nنفس التركيز الشمسي > الكل ☀️\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["attack on titan","هجوم العمالقة","إيرن","aot"], reply: "⚔️ *هجوم العمالقة!*\nالحرية على الجانب الآخر من البحر 🌊\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["jujutsu kaisen","سحر جوجوتسو","غوجو","سوكونا","jjk"], reply: "💜 *JJK!*\nسوكونا الملك وغوجو الأقوى 👑\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["dragon ball","دراغون بول","غوكو","فيغيتا"], reply: "🐉 *دراغون بول!*\nUltra Instinct Goku > الكل 🌟\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["bleach","بليتش","إيشيغو"], reply: "⚔️ *بليتش!*\nTybw كانت نار! إيشيغو على القمة 🌟\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["chainsaw man","رجل المنشار","دينجي","csm"], reply: "🔪 *Chainsaw Man!*\nبوشيتا أحسن كلب في التاريخ ❤️\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["my hero academia","أبطالي","ديكو","باكوغو","mha","bnha"], reply: "💥 *MHA!*\nبلاس ألتراا!! SMASH 💪\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["أنيمي","anime","انمي"], reply: "🎌 *الأنيمي حياة!*\nإيه أحسن أنيمي شفته؟ قولنا 👇\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["hunter x hunter","هانتر","hxh"], reply: "🎮 *HxH!*\nهيسوكا أكتر شخصية معقدة في التاريخ 🃏\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["black clover","بلاك كلوفر"], reply: "🍀 *Black Clover!*\nعلى ابتدأت بطيء بس ختمت نار 🔥\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["fairy tail","فيري تيل"], reply: "✨ *Fairy Tail!*\nالصداقة هي الأقوى دايماً ✨\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["spy x family","سباي"], reply: "🌸 *Spy x Family!*\nأنيا أحسن شخصية كوميدية 🥜\n> *⚡ برق | VALK 🌸*" },
  { triggers: ["blue lock","بلو لوك"], reply: "⚽ *Blue Lock!*\nإيشيغامي يوإيتشي على رأس العالم ⚽\n> *⚡ برق | VALK 🌸*" },
];

// ======== قاعدة بيانات شخصيات ========
const CHARS_DB = {
  "ناروتو": { fullName: "ناروتو أوزوماكي", anime: "Naruto / Naruto Shippuden", age: "17 (شيبودن)", power: "تشاكرا كيوبي + ساغ موود", rank: "هوكاجي السابع 🏔️", quote: "مش هوكاجي بس في يوم من الأيام هكون! 🍥" },
  "لوفي": { fullName: "مونكي دي لوفي", anime: "One Piece", age: "19", power: "فاكهة المطاط - Gear 5 ☀️", rank: "ملك القراصنة 🏴‍☠️", quote: "هكون ملك القراصنة! 🏴‍☠️" },
  "ساسكي": { fullName: "ساسكي أوتشيها", anime: "Naruto Shippuden", age: "17", power: "شرينغان / رينيغان / منغيكيو", rank: "نينجا شارد 🗡️", quote: "هكسر قيود هذا الجحيم بيدي! 🔥" },
  "إيشيغو": { fullName: "إيشيغو كوروساكي", anime: "Bleach", age: "17", power: "Bankai - True Shikai", rank: "بديل الشينيغامي ⚔️", quote: "مش هخلي حد يموت قدامي! ⚔️" },
  "غوكو": { fullName: "سون غوكو", anime: "Dragon Ball", age: "خالد 😂", power: "Ultra Instinct - SSJ Blue", rank: "أقوى مقاتل في الكون 🐉", quote: "هتقدر تحس بقوتي! 💪" },
  "ليفاي": { fullName: "ليفاي آكرمان", anime: "Attack on Titan", age: "30+", power: "أقوى جندي في البشرية", rank: "كابتن فيلق الاستطلاع ⚔️", quote: "الانتخاب ده حق الناجين! 💀" },
  "إيتاشي": { fullName: "إيتاشي أوتشيها", anime: "Naruto Shippuden", age: "21 (وقت وفاته)", power: "تسوكيوومي / أماتيراسو / سوسانو", rank: "عميل سري من أكاتسوكي 🌙", quote: "سامحني ساسكي.. هذه هي المرة الأخيرة 💔" },
  "زورو": { fullName: "روورونوا زورو", anime: "One Piece", age: "21", power: "أسلوب السيف الثلاثي", rank: "أول قائد مجموعة لوفي 🗡️", quote: "هكون أقوى سيّاف في العالم أو هموت وأنا بحاول! 🗡️" },
  "ديكو": { fullName: "إيزوكو ميدوريا", anime: "My Hero Academia", age: "16", power: "One For All", rank: "Pro Hero ⚡", quote: "هكون Pro Hero الأول! 💥" },
  "تانجيرو": { fullName: "تانجيرو كاميادو", anime: "Demon Slayer", age: "15", power: "نفس التركيز الشمسي 🌞", rank: "قاتل شياطين 🗡️", quote: "هحمي أختي مهما كلفني الأمر! 🔥" },
  "غوجو": { fullName: "ساتورو غوجو", anime: "Jujutsu Kaisen", age: "28", power: "اللانهائي / الفراغ الأبدي 💜", rank: "أقوى ساحر في العالم", quote: "أنا أقوى! 💙" },
  "سوكونا": { fullName: "ريوميين سوكونا", anime: "Jujutsu Kaisen", age: "خالد 👹", power: "Malevolent Shrine", rank: "ملك الشياطين 👹", quote: "أنا لا أحفظ حياة أحد.. أنا ملك! 👹" },
  "دينجي": { fullName: "دينجي / Chainsaw Man", anime: "Chainsaw Man", age: "16", power: "رئيس المنشار 🔪", rank: "Devil Hunter", quote: "بوشيتا! 🐕" },
};

// ======== اقتباسات ========
const QUOTES = [
  { text: "الناس يحكموا على الآخرين بناءً على معاييرهم ومحدوديتهم.", char: "إيتاشي أوتشيها", anime: "Naruto 🍥" },
  { text: "اللي مش بيقدر يحمل حاجة مش هيقدر يغير حاجة.", char: "آرمين آرليرت", anime: "Attack on Titan ⚔️" },
  { text: "لو مش بتؤمن بنفسك، مين هيؤمن بيك؟", char: "ناروتو أوزوماكي", anime: "Naruto 🍥" },
  { text: "الخسارة مش بدها عذر، بدها قوة تبدأ من تاني.", char: "إيشيغو كوروساكي", anime: "Bleach ⚔️" },
  { text: "الأحلام مش بتتحقق بالنوم، بتتحقق باليقظة.", char: "ميدوريا إيزوكو", anime: "MHA 💥" },
  { text: "الضعف مش عيب، الاستسلام هو العيب.", char: "روورونوا زورو", anime: "One Piece 🏴‍☠️" },
  { text: "الخوف مش عدو، الخوف اللي بيمنعك إنك تعمل حاجة هو العدو.", char: "تانجيرو كاميادو", anime: "Demon Slayer 🔥" },
  { text: "أنا مش هبكي على اللي اتمسح، هبكي على اللي هيتمسح.", char: "إيرن ييغر", anime: "AoT ⚔️" },
  { text: "حتى لو الدنيا انهارت، لازم تكمل.", char: "ساتورو غوجو", anime: "JJK 💜" },
  { text: "مش لازم تكون قوي عشان تبدأ، بس لازم تبدأ عشان تبقى قوي.", char: "ناروتو أوزوماكي", anime: "Naruto 🍥" },
];

// ======== أفضل أنيمي ========
const TOP_ANIME = [
  { rank: 1, name: "Fullmetal Alchemist: Brotherhood", score: "9.1 ⭐", genre: "أكشن / فانتازيا" },
  { rank: 2, name: "Steins;Gate", score: "9.0 ⭐", genre: "خيال علمي / دراما" },
  { rank: 3, name: "Attack on Titan", score: "9.0 ⭐", genre: "أكشن / دراما" },
  { rank: 4, name: "Hunter x Hunter", score: "9.0 ⭐", genre: "مغامرات / أكشن" },
  { rank: 5, name: "Jujutsu Kaisen", score: "8.7 ⭐", genre: "أكشن / خارق للطبيعة" },
  { rank: 6, name: "Demon Slayer", score: "8.7 ⭐", genre: "أكشن / تاريخي" },
  { rank: 7, name: "One Piece", score: "8.7 ⭐", genre: "مغامرات / أكشن" },
  { rank: 8, name: "Naruto Shippuden", score: "8.6 ⭐", genre: "أكشن / نينجا" },
  { rank: 9, name: "Death Note", score: "8.6 ⭐", genre: "غموض / إثارة" },
  { rank: 10, name: "Chainsaw Man", score: "8.5 ⭐", genre: "أكشن / رعب" },
];

// ======== أوامر ========

const autoAnime = async () => {};
autoAnime.before = async (m, { conn }) => {
  if (!m.text) return false;
  const txt = m.text.toLowerCase();
  for (const item of ANIME_RESPONSES) {
    if (item.triggers.some(t => txt.includes(t.toLowerCase()))) {
      await conn.sendMessage(m.chat, { text: item.reply }, { quoted: m });
      return false;
    }
  }
  return false;
};
autoAnime.command = [];
autoAnime.category = 'anime';
autoAnime.usage = [];
autoAnime.description = '';
export default autoAnime;

export const charInfo = async (m, { conn }) => {
  const args = m.text?.split(' ').slice(1).join(' ')?.trim();
  if (!args) {
    const names = Object.keys(CHARS_DB).join(' | ');
    await conn.sendMessage(m.chat, {
      text: `
╭─┈─┈─┈─⟞🎌⟝─┈─┈─┈─╮
┃ 📖 *معلومات شخصية أنيمي*
┃ الاستخدام: *.شخصية [اسم]*
╰─┈─┈─┈─⟞🎌⟝─┈─┈─┈─╯
┃ ${names}
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
    }, { quoted: m });
    return;
  }
  const char = CHARS_DB[args] || Object.values(CHARS_DB).find((_, i) => Object.keys(CHARS_DB)[i].includes(args));
  if (!char) { await conn.sendMessage(m.chat, { text: `*❌ مش لاقي الشخصية دي!*\nاكتب *.شخصية* لترى القائمة` }, { quoted: m }); return; }
  await conn.sendMessage(m.chat, {
    text: `
╭─┈─┈─┈─⟞🎌⟝─┈─┈─┈─╮
┃ 📖 *${char.fullName}*
╰─┈─┈─┈─⟞🎌⟝─┈─┈─┈─╯
┃ 🎌 الأنيمي: *${char.anime}*
┃ 🎂 السن: *${char.age}*
┃ ⚡ القوة: *${char.power}*
┃ 👑 الرتبة: *${char.rank}*
┃
┃ 💬 *"${char.quote}"*
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
  }, { quoted: m });
};
charInfo.command = ['شخصية', 'char'];
charInfo.category = 'anime';
charInfo.usage = ['شخصية [اسم]'];
charInfo.description = 'معلومات شخصية أنيمي';

export const quote = async (m, { conn }) => {
  const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  await conn.sendMessage(m.chat, {
    text: `
╭─┈─┈─┈─⟞💬⟝─┈─┈─┈─╮
┃ 🌸 *اقتباس الأنيمي - VALK*
╰─┈─┈─┈─⟞💬⟝─┈─┈─┈─╯
┃ *"${q.text}"*
┃
┃ ✍️ ~ *${q.char}*
┃ 🎌 *${q.anime}*
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
  }, { quoted: m });
};
quote.command = ['اقتباس', 'quote', 'حكمة'];
quote.category = 'anime';
quote.usage = ['اقتباس'];
quote.description = 'اقتباس عشوائي من الأنيمي';

export const topAnime = async (m, { conn }) => {
  const medals = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
  const list = TOP_ANIME.map((a, i) => `┃ ${medals[i]} *${a.name}*\n┃    ${a.score} | ${a.genre}`).join('\n┃\n');
  await conn.sendMessage(m.chat, {
    text: `
╭─┈─┈─┈─⟞🎌⟝─┈─┈─┈─╮
┃ 🏆 *أفضل 10 أنيمي - VALK*
╰─┈─┈─┈─⟞🎌⟝─┈─┈─┈─╯
${list}
╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ 🌸 وافق ولا خالف؟ 😄
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
  }, { quoted: m });
};
topAnime.command = ['توب', 'top anime', 'أفضل أنيمي'];
topAnime.category = 'anime';
topAnime.usage = ['توب'];
topAnime.description = 'أفضل 10 أنيمي';
