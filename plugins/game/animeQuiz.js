/*
 * ⚡ بوت برق - VALK Group
 * Plugin: كويز الأنيمي
 * Owner: سونغ
 * © 2026 سونغ | VALK - All Rights Reserved
 */

if (!global.animeQuiz) global.animeQuiz = {};

const QUESTIONS = [
  { q: "🍥 من هو بطل أنيمي Naruto؟", a: ["ناروتو", "naruto", "ناروتو أوزوماكي"], hint: "اسمه نفس اسم الأنيمي 🍥" },
  { q: "🏴‍☠️ ما هو حلم لوفي في One Piece؟", a: ["ملك القراصنة", "king of pirates"], hint: "يريد أن يصبح... 🏴‍☠️" },
  { q: "👁️ ما اسم قوة عيون عشيرة أوتشيها؟", a: ["شرينغان", "sharingan"], hint: "عيون حمراء 👁️" },
  { q: "💪 كم عدد التمارين اليومية لـ Saitama؟", a: ["100", "مية", "مئة"], hint: "رقم كبير من 3 أرقام 💪" },
  { q: "📓 ما هو الاسم الحقيقي لـ كيرا في Death Note؟", a: ["لايت يغامي", "light yagami", "لايت"], hint: "لايت... 📓" },
  { q: "🔥 ما اسم هاشيرا اللهب في Demon Slayer؟", a: ["رينغوكو", "rengoku", "كيجيرو رينغوكو"], hint: "أبوه كمان كان هاشيرا 🔥" },
  { q: "⚔️ من هو أقوى جندي في البشرية في AoT؟", a: ["ليفاي", "levi", "ليفاي آكرمان"], hint: "قصير وقوي جداً 🗡️" },
  { q: "🐉 ما هو المستوى الأقوى لـ Goku؟", a: ["ألترا إنستنكت", "ultra instinct", "أولترا انستنكت", "ui"], hint: "الشعر فضي وعيونه رمادية 🐉" },
  { q: "☁️ ما اسم المنظمة الشريرة في Naruto؟", a: ["أكاتسوكي", "akatsuki"], hint: "الخاتم الأحمر والعباءة السوداء ☁️" },
  { q: "🔪 ما اسم الكلب الصغير الشيطاني في Chainsaw Man؟", a: ["بوشيتا", "pochita"], hint: "كلب صغير بمنشار 🐕" },
  { q: "💜 من هو أقوى ساحر في Jujutsu Kaisen؟", a: ["ساتورو غوجو", "gojo", "غوجو"], hint: "عيونه زرقاء وشعره أبيض 💜" },
  { q: "💥 ما هو اسم قوة ديكو في My Hero Academia؟", a: ["ون فور أول", "one for all"], hint: "قوة تنتقل من شخص لآخر 💥" },
  { q: "🌊 من هو مؤسس نفس التركيز الشمسي في Demon Slayer؟", a: ["يوريتشي", "yoriichi", "يوريتشي تسوغيكوني"], hint: "أقوى مستخدم في التاريخ ☀️" },
  { q: "🏴‍☠️ ما هو اسم سيف زورو الأسطوري الأسود؟", a: ["إيما", "enma"], hint: "سيف أرسلته هيياري أورا 🗡️" },
  { q: "🎌 في أنيمي JJK، من هو الملك الشيطاني؟", a: ["سوكونا", "sukuna", "ريوميين سوكونا"], hint: "أصابعه متفرقة في العالم 👹" },
  { q: "🌸 ما اسم أخت تانجيرو في Demon Slayer؟", a: ["نيزوكو", "nezuko", "نيزوكو كاميادو"], hint: "تحمل في صندوق على ظهره 🌸" },
  { q: "⚡ من قتل عشيرته كلها في Naruto؟", a: ["إيتاشي", "itachi", "إيتاشي أوتشيها"], hint: "أخو ساسكي 🌙" },
  { q: "🎮 في HxH، ما هو اسم النظام الخاص بـ Gon؟", a: ["جين", "nen", "نين"], hint: "الطاقة الروحية في الأنيمي 🎮" },
];

const TIMEOUT = 30000;

const animeQuiz = async (m, { conn }) => {
  const chatId = m.chat;
  if (global.animeQuiz[chatId]) {
    await conn.sendMessage(chatId, { text: `*❌ في كويز شغال! بعت .توقف للإيقاف*` }, { quoted: m });
    return;
  }

  const q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];

  const txt = `
╭─┈─┈─┈─⟞🎌⟝─┈─┈─┈─╮
┃ 🎮 *كـويـز الأنـيـمـي - VALK*
╰─┈─┈─┈─⟞🎌⟝─┈─┈─┈─╯

${q.q}

╭─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╮
┃ ⏳ عندك *30 ثانية*
┃ 💡 *.هنت* للهنت
┃ 🛑 *.توقف* للإيقاف
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim();

  await conn.sendMessage(chatId, { text: txt }, { quoted: m });

  global.animeQuiz[chatId] = {
    q,
    timeout: setTimeout(async () => {
      if (!global.animeQuiz[chatId]) return;
      delete global.animeQuiz[chatId];
      await conn.sendMessage(chatId, {
        text: `*⏰ انتهى الوقت!*\n\n✅ الإجابة: *${q.a[0]}*\n> *⚡ برق | VALK 🌸*`
      });
    }, TIMEOUT)
  };
};

animeQuiz.before = async (m, { conn }) => {
  const chatId = m.chat;
  const game = global.animeQuiz[chatId];
  if (!game) return false;

  const txt = m.text?.trim().toLowerCase();

  if (txt === '.هنت' || txt === '.hint') {
    await conn.sendMessage(chatId, { text: `💡 *هنت:* ${game.q.hint}` }, { quoted: m });
    return true;
  }

  if (txt === '.توقف' || txt === '.stop') {
    clearTimeout(game.timeout);
    delete global.animeQuiz[chatId];
    await conn.sendMessage(chatId, { text: `🛑 *اتوقف الكويز!*\n✅ الإجابة: *${game.q.a[0]}*` }, { quoted: m });
    return true;
  }

  const correct = game.q.a.some(a => txt === a.toLowerCase());
  if (correct) {
    clearTimeout(game.timeout);
    delete global.animeQuiz[chatId];

    const jid = m.sender;
    const data = global.db?.get(jid) || { points: 0, wins: 0 };
    data.points = (data.points || 0) + 10;
    data.wins = (data.wins || 0) + 1;
    global.db?.set(jid, data);

    await conn.sendMessage(chatId, {
      text: `
╭─┈─┈─┈─⟞🏆⟝─┈─┈─┈─╮
┃ 🎉 *إجابة صح!*
┃ 👤 @${jid.split('@')[0]}
┃ ✅ الإجابة: *${game.q.a[0]}*
┃ ⭐ نقاطك: *${data.points}*
╰─┈─┈─┈─⟞⚡⟝─┈─┈─┈─╯
> *© 2026 سونغ | VALK - All Rights Reserved*`.trim(),
      mentions: [jid]
    });
    return true;
  }

  return false;
};

animeQuiz.command = ['كويز', 'quiz'];
animeQuiz.category = 'games';
animeQuiz.usage = ['كويز'];
animeQuiz.description = 'كويز أسئلة أنيمي (30 ثانية)';
export default animeQuiz;
