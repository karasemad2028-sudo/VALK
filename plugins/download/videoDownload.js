/*
 * ⚡ بوت برق - VALK Group
 * Plugin: تحميل فيديو YouTube + TikTok
 * Owner: سونغ
 * © 2026 سونغ | VALK - All Rights Reserved
 *
 * بيستخدم API مجاني للتحميل
 */

import fetch from 'node-fetch';

// ========== تحميل YouTube ==========
const ytDownload = async (m, { conn }) => {
  const args = m.text?.split(' ').slice(1).join(' ')?.trim();

  if (!args) {
    await conn.sendMessage(m.chat, {
      text: `
╭─┈─┈─┈─⟞📥⟝─┈─┈─┈─╮
┃ 📥 *تحميل يوتيوب*
╰─┈─┈─┈─⟞📥⟝─┈─┈─┈─╯

┃ ✍️ الاستخدام:
┃ *.يوتيوب [لينك أو كلمة بحث]*
┃
┃ 📌 مثال:
┃ *.يوتيوب attack on titan amv*
┃ *.يوتيوب https://youtu.be/xxxx*

> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
    }, { quoted: m });
    return;
  }

  const wait = await conn.sendMessage(m.chat, {
    text: `⏳ *بدور على الفيديو...*\n> *⚡ برق | VALK 🌸*`
  }, { quoted: m });

  try {
    let videoUrl = args;

    // لو مش لينك → ابحث على يوتيوب
    if (!args.includes('youtube.com') && !args.includes('youtu.be')) {
      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(args)}&type=video&maxResults=1&key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY`
      ).catch(() => null);

      if (searchRes?.ok) {
        const searchData = await searchRes.json();
        const videoId = searchData?.items?.[0]?.id?.videoId;
        if (videoId) videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      }

      if (!videoUrl.includes('youtube')) {
        // fallback: استخدم invidious search
        const inv = await fetch(`https://vid.puffyan.us/api/v1/search?q=${encodeURIComponent(args)}&type=video`).catch(() => null);
        if (inv?.ok) {
          const invData = await inv.json();
          if (invData?.[0]?.videoId) videoUrl = `https://www.youtube.com/watch?v=${invData[0].videoId}`;
        }
      }
    }

    if (!videoUrl.includes('youtube') && !videoUrl.includes('youtu.be')) {
      await conn.sendMessage(m.chat, { text: `*❌ مش قادر أوجد الفيديو! جرب لينك مباشر.*` }, { quoted: m });
      return;
    }

    // API تحميل يوتيوب
    const apis = [
      `https://api.vevioz.com/api/button/mp4/360/${encodeURIComponent(videoUrl)}`,
      `https://yt-download.org/api/mp4?url=${encodeURIComponent(videoUrl)}&quality=360`,
    ];

    // استخدم cobalt.tools API (مجاني ومفتوح)
    const cobaltRes = await fetch('https://co.wuk.sh/api/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ url: videoUrl, vQuality: '360', isAudioOnly: false })
    }).catch(() => null);

    if (cobaltRes?.ok) {
      const cobaltData = await cobaltRes.json();
      if (cobaltData?.url || cobaltData?.urls) {
        const dlUrl = cobaltData.url || cobaltData.urls;
        await conn.sendMessage(m.chat, { delete: wait.key }).catch(() => {});
        await conn.sendMessage(m.chat, {
          text: `
╭─┈─┈─┈─⟞📥⟝─┈─┈─┈─╮
┃ ✅ *الفيديو جاهز للتحميل!*
╰─┈─┈─┈─⟞📥⟝─┈─┈─┈─╯

┃ 🔗 ${dlUrl}

> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
        }, { quoted: m });
        return;
      }
    }

    // fallback: ابعت لينك التحميل المباشر
    await conn.sendMessage(m.chat, { delete: wait.key }).catch(() => {});
    await conn.sendMessage(m.chat, {
      text: `
╭─┈─┈─┈─⟞📥⟝─┈─┈─┈─╮
┃ 🎬 *لينك التحميل*
╰─┈─┈─┈─⟞📥⟝─┈─┈─┈─╯

┃ 🔗 الفيديو:
┃ ${videoUrl}
┃
┃ 📥 حمل من هنا:
┃ https://yt1s.io/en/youtube-to-mp4?q=${encodeURIComponent(videoUrl)}

> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
    }, { quoted: m });

  } catch (e) {
    await conn.sendMessage(m.chat, {
      text: `*❌ حصل خطأ!*\nجرب تبعت اللينك مباشرة 🔗`
    }, { quoted: m });
  }
};

ytDownload.command = ['يوتيوب', 'youtube', 'yt', 'يوت'];
ytDownload.category = 'download';
ytDownload.usage = ['يوتيوب [لينك أو بحث]'];
ytDownload.description = 'تحميل فيديو يوتيوب';

// ========== تحميل TikTok ==========
const ttDownload = async (m, { conn }) => {
  const url = m.text?.split(' ')[1]?.trim();

  if (!url || !url.includes('tiktok')) {
    await conn.sendMessage(m.chat, {
      text: `
╭─┈─┈─┈─⟞📥⟝─┈─┈─┈─╮
┃ 📥 *تحميل تيك توك*
╰─┈─┈─┈─⟞📥⟝─┈─┈─┈─╯

┃ ✍️ الاستخدام:
┃ *.تيكتوك [لينك الفيديو]*
┃
┃ 📌 مثال:
┃ *.تيكتوك https://vm.tiktok.com/xxxx*

> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
    }, { quoted: m });
    return;
  }

  const wait = await conn.sendMessage(m.chat, {
    text: `⏳ *بحمل الفيديو...*\n> *⚡ برق | VALK 🌸*`
  }, { quoted: m });

  try {
    // cobalt.tools - يدعم TikTok
    const res = await fetch('https://co.wuk.sh/api/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ url, isAudioOnly: false, disableMetadata: true })
    });

    const data = await res.json();

    await conn.sendMessage(m.chat, { delete: wait.key }).catch(() => {});

    if (data?.url) {
      // حاول تبعته كفيديو مباشرة
      try {
        await conn.sendMessage(m.chat, {
          video: { url: data.url },
          caption: `🎵 *فيديو تيك توك*\n> *© 2026 سونغ | VALK - All Rights Reserved*`,
          mimetype: 'video/mp4'
        }, { quoted: m });
      } catch {
        await conn.sendMessage(m.chat, {
          text: `✅ *الفيديو جاهز:*\n${data.url}\n> *© 2026 سونغ | VALK 🌸*`
        }, { quoted: m });
      }
    } else if (data?.picker) {
      // فيديوهات متعددة (سلايدشو)
      const links = data.picker.map((p, i) => `${i + 1}. ${p.url}`).join('\n');
      await conn.sendMessage(m.chat, {
        text: `🎵 *فيديوهات TikTok:*\n${links}\n> *© 2026 سونغ | VALK 🌸*`
      }, { quoted: m });
    } else {
      // fallback
      await conn.sendMessage(m.chat, {
        text: `
╭─┈─┈─┈─⟞📥⟝─┈─┈─┈─╮
┃ 📥 حمل الفيديو من هنا:
╰─┈─┈─┈─⟞📥⟝─┈─┈─┈─╯

┃ https://snaptik.app/?url=${encodeURIComponent(url)}
┃ أو
┃ https://tikmate.online/?url=${encodeURIComponent(url)}

> *© 2026 سونغ | VALK - All Rights Reserved*`.trim()
      }, { quoted: m });
    }

  } catch (e) {
    await conn.sendMessage(m.chat, {
      text: `*❌ حصل خطأ في التحميل!*\nجرب تحمل يدوياً:\nhttps://snaptik.app`
    }, { quoted: m });
  }
};

ttDownload.command = ['تيكتوك', 'tiktok', 'tt'];
ttDownload.category = 'download';
ttDownload.usage = ['تيكتوك [لينك]'];
ttDownload.description = 'تحميل فيديو تيك توك';

export { ytDownload as default, ttDownload };
