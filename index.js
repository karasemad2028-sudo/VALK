import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '201142463097',
  prefix: [".", "/", "!"],
  fromMe: false,
  owners: [
    { name: "سونغ", jid: "201142463097@s.whatsapp.net", lid: "" }
  ],
  settings: { noWelcome: false },
  commandsPath: './plugins'
});

client.onGroupEvent(group);
client.onCommandAccess(access);

/* =========== Database ========== */
if (!global.db) {
    global.db = new UltraDB();
}

/* =========== Config ========== */
const { config } = client;
config.info = {
  nameBot: "⚡ 𝑩𝑨𝑹𝑸 ~ 𝑨𝑰 ⚡",
  nameChannel: "𝐕𝐀𝐋𝐊 ~ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ⚡",
  idChannel: "120363225356834044@newsletter",
  groupName: "VALK 🌸",
  ownerName: "سونغ",
  ownerNumber: "201142463097",
  urls: {
    repo: "https://github.com/deveni0/Pomni-AI",
    channel: "https://whatsapp.com/channel/0029VaQim2bAu3aPsRVaDq3v"
  },
  copyright: {
    pack: '⚡ سونغ | VALK ⚡',
    author: 'سونغ | VALK'
  },
  images: [
    "https://i.pinimg.com/originals/11/26/97/11269786cdb625c60213212aa66273a9.png",
    "https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg",
    "https://i.pinimg.com/originals/bb/77/0f/bb770fad66a634a6b3bf93e9c00bf4e5.jpg"
  ]
};

/* =========== Start ========== */
client.start();
setTimeout(async () => {
  if (client.commandSystem) {
    sub(client);
  }
}, 2000);

/* =========== Catch Errors ========== */
process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) {}
    else console.error('uncaughtException:', e.message);
});
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});
