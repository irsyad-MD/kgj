/*
DILARANG KERAS MENYEBARKAN SCRIPT YORI CHAN INI!!!! 
 MENYEBARKAN BUKAN SEKEDAR SCRIPT SAJA MELAINKAN HARUS MENJAGA CODE CODE YORI CHAN
 JIKA KALIAN KETAHUAN MENYEBAR PRIVASI TERSEBUT 
 SAYA TIDAK AKAN SEGAN SEGAN BLACKLIST DI GROUP!!!! 

☘️ Terimakasih kepada                                
Allah Swt
Lenwy [ Base ]
ErerexID Chx [ contribution ]
Kedua Orangtua Saya                     
Penyedia Apikey
Pengguna Bot Yang Selalu Support

📝 Base : Lenwy
🥇 Pengembang/Penerus Ulang : ErerexID Chx
Whatsapp : +62895342022385

📣 Salam Hangat
Halo Semua, Sebelumnya Terimakasih Bagi Kalian Yang Sudah Menggunakan Atau Bahkan Mengembangkan Script Bot Yori Chan Ini, Saya Sangat Berterimakasih Atas Segala Dukungan Yang Kalian Berikan, Disini Saya Mohon Bagi Kalian Yang Menggunakan Script Bot Yori Chan Ini Tolong Untuk Tidak Menghapus Credit Yang Tertera Disini, Terimakasihh.

📑 Informasi Lebih Lengkap :
Whatsapp : wa.me/62895342022385
Telegram : t.me/ErerexIDOfc
Gmail : ererexidnewbie21@yahoo.com
Instagram : ramzy_chx
Youtube : ErerexID Chx

Saya ErerexID Chx Sangat Berterimakasih Dan Menghargai Tindakan Kalian YAng Sudah Membiarkan Credit Tertera Disini.

❤️ Terimakasihh.
*/
/*
{
⥁ thanks to : 
⥁ Allah SWT
⥁ Ortu
⥁ lenwy [ base ]
⥁ ErerexID Chx [ Recode ]
⥁ Adrian/xyzen [ Fixed ]
⥁ Kyuurz [ Fixed ]
⥁ All Created And Pengguna
Note : jangan hapus thanks to di atas ya para creator :) 
Note2 : JIKA KETAHUAN MENJUAL SCRIPT INI AKAN TIDAK DAPAT UPDATE DARI SAYA DAN TEMAN TEMAN, PAHAM!!!!!!
}
*/
require('./settings')
const { default: makeWASocket, generateWAMessageFromContent, 
prepareWAMessageMedia, useMultiFileAuthState, Browsers, DisconnectReason, makeInMemoryStore, makeCacheableSignalKeyStore, fetchLatestWaWebVersion, proto, PHONENUMBER_MCC, getAggregateVotesInPollMessage, fetchLatestBaileysVersion, jidDecode, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs')
const pino = require('pino')
const chalk = require('chalk')
const path = require('path')
const readline = require("readline");
const FileType = require('file-type')
const yargs = require('yargs/yargs')
const _ = require('lodash')
const { Boom } = require('@hapi/boom')
const PhoneNumber = require('awesome-phonenumber')
const figlet = require("figlet")
const os = require('os');
const { performance } = require("perf_hooks");
const usePairingCode = true
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, getBuffer, getSizeMedia, sleep, runtime, formatSize } = require('./lib/myfunc')
const start = performance.now();
const cpus = os.cpus();
const uptimeSeconds = os.uptime();
const uptimeDays = Math.floor(uptimeSeconds / 86400);
const uptimeHours = Math.floor((uptimeSeconds % 86400) / 3600);
const uptimeMinutes = Math.floor((uptimeSeconds % 3600) / 60);
const uptimeSecs = Math.floor(uptimeSeconds % 60);
const totalMem = os.totalmem();
const freeMem = os.freemem();
const usedMem = totalMem - freeMem;
const muptime = runtime(process.uptime()).trim()
const formattedUsedMem = formatSize(usedMem);
const formattedTotalMem = formatSize(totalMem);
const loadAverage = os.loadavg().map(avg => avg.toFixed(2)).join(", ");
const speed = (performance.now() - start).toFixed(3);

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, resolve)
    })
};

var low
try {
    low = require('lowdb')
} catch (e) {
    low = require('./lib/lowdb')
}

const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
    /https?:\/\//.test(opts['db'] || '') ?
        new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
            new mongoDB(opts['db']) :
            new JSONFile(`src/database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
    if (global.db.data !== null) return
    global.db.READ = true
    await global.db.read()
    global.db.READ = false
    global.db.data = {
        users: {},
        chats: {},
        game: {},
        database: {},
        stickercmd: {},
        settings: {},
        setting: {},
        others: {},
        sticker: {},
        ...(global.db.data || {})
    }
    global.db.chain = _.chain(global.db.data)
}
loadDatabase()

// save database every 30seconds
if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
}, 30 * 1000)

/*
console.log(color(figlet.textSync("Welcome", {
    font: 'DOS Rebel',
    horizontalLayout: 'default',
    vertivalLayout: 'default',
    width: 100,
    whitespaceBreak: false
}), 'cyan'))
*/
async function connectToWhatsApp() {
const { state, saveCreds } = await useMultiFileAuthState("sessionn")
const Yori = makeWASocket({
printQRInTerminal: !usePairingCode,
	syncFullHistory: true,
	markOnlineOnConnect: true,
	connectTimeoutMs: 60000, 
	defaultQueryTimeoutMs: 0,
	keepAliveIntervalMs: 10000,
	generateHighQualityLinkPreview: true, 
	patchMessageBeforeSending: (message) => {
		const requiresPatch = !!(
			message.buttonsMessage 
			|| message.templateMessage
			|| message.listMessage
		);
		if (requiresPatch) {
			message = {
				viewOnceMessage: {
					message: {
						messageContextInfo: {
							deviceListMetadataVersion: 2,
							deviceListMetadata: {},
						},
						...message,
					},
				},
			};
		}

		return message;
	},
	version: (await (await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json')).json()).version,
	browser: ["Ubuntu", "Chrome", "20.0.04"],
	logger: pino({ level: 'fatal' }),
	auth: { 
		creds: state.creds, 
		keys: makeCacheableSignalKeyStore(state.keys, pino().child({ 
			level: 'silent', 
			stream: 'store' 
		})), 
	}
});
    if (usePairingCode && !Yori.authState.creds.registered) {
        const phoneNumber = await question('☘️  Masukan Nomor Yang Diawali Dengan 62 :\n');
        const code = await Yori.requestPairingCode(phoneNumber.trim())
        console.log(`🎁  Pairing Code : ${code}`)

    }

 
console.log(chalk.white.bold(`${chalk.gray.bold("📃  Informasi :")}    

⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡤⠤⠤⣤⣄⡀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠛⠁⠀⠀⠀⣀⣤⠿⠿⠟⣉⣛⣟⣛⣷⡒⢤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠟⠀⠀⠀⠀⣠⠞⣱⠋⢀⣤⡺⠿⣿⢟⣿⡧⣯⣻⣽⣿⠷⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠇⠀⠀⠀⣰⡊⣡⠞⢁⣴⣿⢛⣓⡾⣿⡟⣧⡀⢸⣿⡟⣾⣧⣺⡛⣿⣖⠲⢦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠃⠀⢀⠐⢚⡧⠞⠁⣰⣿⡿⢫⣿⢏⣾⣿⣧⣎⣟⣼⠿⠿⠟⢋⣄⣳⢰⢿⡀⠀⢹⣷⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠒⢛⣿⣿⠉⠀⠀⣼⡿⣼⣧⣿⣧⡟⣿⡁⠀⠹⠋⠙⣆⣴⣾⡿⠟⠉⢿⡇⡇⠀⠀⠛⢻⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⢵⡂⢀⣿⡿⣽⣿⣿⢿⠏⢰⡟⣧⡄⢀⡆⣰⣿⡄⣠⣴⣾⡟⢛⡇⡇⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⡏⠀⢸⡟⣼⣿⠋⣾⣯⣄⣸⢧⣿⡟⣾⢽⣿⡇⢹⣿⣿⣄⣇⠀⢷⢸⠆⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⡿⣿⣾⠁⡎⢸⣹⣿⠃⢐⣿⠀⠀⣿⣸⠀⠃⠃⡾⣿⣀⠸⣿⣿⡏⡿⢠⠸⡌⣇⠂⠀⠀⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⠏⣸⣿⢸⠀⣷⢸⣿⠃⠀⠸⣿⡀⠀⣿⣿⠀⠀⣸⣷⠃⠉⢹⡏⣿⢇⡇⠀⠀⢹⣼⣷⡄⢰⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⣧⣰⣿⣿⢸⡄⢸⣼⣷⡶⠶⢶⣤⡈⠂⣿⣿⣤⢠⣿⠃⠀⠀⢸⠁⢸⣼⡿⠁⡀⣸⣾⡿⢯⣼⠇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡤⠴⠶⠿⣻⣿⣿⣿⣿⠁⡿⢸⢸⣇⠀⢿⣷⡀⠀⠀⠈⠙⠀⠘⠻⣿⡿⢉⣉⣉⣠⠇⠀⢸⣿⠁⢠⢇⡏⢹⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣹⣿⡇⣰⣿⠸⣿⡿⣆⢈⢯⠛⠆⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠛⢷⣄⡼⡋⠀⡼⣸⢻⢸⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣫⣯⡿⣟⣷⡸⣿⣿⢻⣷⣿⣿⣮⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⠟⢁⣼⣱⠏⣸⢸⡇⠀⠀⠀⠀⠀⠀⠀⢀⡀
⠀⠀⠀⠀⠀⠀⠀⢸⡞⠁⢸⡾⠀⣿⣿⡄⣿⣿⢸⣿⣿⣌⠻⠯⠛⠂⠘⠒⠒⠤⣀⣀⠀⠀⠀⣠⣾⠟⠁⣠⢞⣼⢿⣸⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠈⠁
⠀⠀⠀⠀⠀⠀⠀⢸⡄⠀⢺⡇⠀⢹⣿⣳⢷⢸⣿⢻⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⣠⠼⠋⣠⡼⣿⡾⣿⣾⣿⣿⣿⢿⡆⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢷⡀⠈⢿⣿⣼⣾⣿⡿⣿⣿⣿⣿⢦⡀⠀⠀⠀⠀⠀⠀⠐⢿⣧⣶⣿⣿⢿⣿⡿⣿⣿⣿⣿⣿⠈⠻⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠶⣬⣿⣿⣿⣟⢱⡿⠛⠉⡸⠀⠈⠓⠦⠤⠤⣶⢶⣿⡏⢹⣿⣿⢏⣿⢿⣿⣿⣿⡿⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⠀⣤⣇⠀⠀⠀⠀⠀⠀⣏⡀⠻⣿⣼⡿⣿⣾⣣⣿⣿⣿⣿⠃⢸⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⡴⠚⣿⣿⣿⣿⣅⡤⠿⠿⣿⣿⣿⣿⣿⣿⣿⣃⣀⣈⣷⣷⣿⣻⣿⣿⣿⠿⠁⢠⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣀⡠⠴⠖⠛⠉⠀⠀⠀⢸⣿⣿⣿⠀⠀⠀⠀⠀⣬⠿⢧⠀⠀⠀⠈⠙⣿⣿⣿⣿⣿⠿⣯⣤⣤⠔⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⡶⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⡜⢿⣿⡇⠠⠍⠀⠀⠰⣿⣶⣾⡧⠀⠀⢀⣠⣿⣿⣿⣿⣿⠀⠀⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⣸⣿⣇⠀⠀⠀⠀⠀⠈⠉⠋⠀⠀⠀⠀⢸⢿⣿⣿⠟⠃⠀⢀⣿⠉⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⣾⣿⠁⠀⠀⣀⣾⡟⠀⠀⢇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⡏⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⣿⣿⣼⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⣽⣿⡿⡄⠀⡿⡷⠋⠀⠀⠀⢸⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡸⠃⠸⡄⠀⠀⠀⠀⠀⠀⠀⢨⣿⣿⣧⢿⠋⢧⣄⡀⠀⠀⠀⠀⠀⠀⡼⠁⣿⣿⣿⡇⠀⡇⣿⡀⠀⠀⠀⠀⢳⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⡿⠀⠀⢱⡀⠀⠀⠀⠀⠀⠀⢸⠘⣿⣽⣾⣇⠈⠻⣿⣷⣦⣴⣶⣿⠟⠁⠀⣿⡟⣿⣇⣼⡝⠀⢣⠀⠀⠀⠀⠸⡆⣝⠷⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢸⡇⠀⠀⠀⢣⡀⠀⠀⠀⠀⠀⢸⠀⠈⠻⢿⣿⣦⣤⣿⣿⣿⣿⣿⣁⡀⠀⠀⣿⣿⣿⠿⠋⠀⠀⠈⡆⠀⠀⠀⠀⢧⡞⠀⢺⣆⠀⠀⠀⠀⠀⠀
⠀⠀⢀⡟⠀⠀⠀⠀⢸⢧⡀⠀⠀⠀⠀⠈⡄⠀⠀⠀⠀⠉⠁⠀⢨⣶⣾⡍⠛⠿⠟⢻⣿⣿⣿⢄⠀⣀⠖⢆⢱⠀⠀⠀⠀⣼⠁⠀⠀⠻⣧⡀⠀⠀⠀⠀
⠀⠀⣸⠃⠀⠀⠀⠀⢸⠀⢻⣆⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠉⢹⠀⠀⠀⠸⠟⠉⣁⣨⢟⣫⣵⡋⠉⢸⠀⠀⠀⢀⣏⠂⠀⠀⠀⠈⢷⡄⠀⠀⠀
⢀⣀⡇⠀⠀⠀⠀⠀⢸⠀⠀⢻⣄⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⠀⠀⠀⠀⠀⠈⢷⡔⠉⠈⠳⣯⡗⢸⠀⠀⠀⡞⠁⠀⠀⠀⠀⠀⠀⠙⢄⠀⠀
⢸⣿⣾⣷⠀⠀⠀⠀⢸⠀⠀⠀⠻⣆⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⢾⣽⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⡇⠀⠀⡸⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⣣⡀
⢸⣿⢥⡏⠀⠀⠀⠀⠘⡄⠀⠀⠀⠘⣧⣀⠘⡆⠀⠀⠀⠀⠀⠀⠀⠀⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⠀⠀⣰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⠇

▧  Dengan Server:
│ • Platform: ${os.platform()}
│ • CPU Cores: ${cpus.length}
│ • CPU Model: ${cpus[0].model}
│ • Architecture: ${os.arch()}
│ • RAM: ${formattedUsedMem} / ${formattedTotalMem}
│ • Uptime: ${uptimeDays}d ${uptimeHours}h ${uptimeMinutes}m ${uptimeSecs}s
└───···

▧  Script Yori Chan:
│ • Author : ErerexID Chx
│ • Gmail : luwibu@gmail.com
│ • Instagram : Anonymous
└───···

${chalk.green.bold("🎁 Script Made in ErerexID :D")}\n`));

    Yori.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    Yori.ev.on('messages.upsert', async chatUpdate => {
        try {
            mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (!Yori.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            m = smsg(Yori, mek, store)
            require("./Yori")(Yori, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })

    Yori.ev.on('call', async (celled) => {
        let koloi = global.anticall
        if (!koloi) return
        console.log(celled)
        for (let kopel of celled) {
            if (kopel.isGroup == false) {
                if (kopel.status == "offer") {
                    let nomer = await Yori.sendTextWithMentions(kopel.from, `*${Yori.user.name}* Tidak Menerima Panggilan ${kopel.isVideo ? `video` : `suara`}. Maaf @${kopel.from.split('@')[0]} Kamu Diblokir. Silahkan Hubungi Owner !`)
                    Yori.sendContact(kopel.from, owner.map(i => i.split("@")[0]), nomer)
                    await sleep(8000)
                    await Yori.updateBlockStatus(kopel.from, "block")
                }
            }
        }
    })

    Yori.ev.on('group-participants.update', async (anu) => {
        //console.log(anu)
        try {
            let metadata = await Yori.groupMetadata(anu.id)
            let participants = anu.participants
            for (let num of participants) {
                // Get Profile Picture User
                try {
                    ppuser = await Yori.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
                }

                // Get Profile Picture Group
                try {
                    ppgroup = await Yori.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
                }

                if (anu.action == 'add') {
                    let a = `*[ Halo ${num.split("@")[0]}*\n📣 *Selamat Datang Di Group : ${metadata.subject} ]*
          𝙠𝙖𝙧𝙩𝙪 𝙞𝙣𝙩𝙧𝙤
          
➼𝙣𝙖𝙢𝙖:
➼𝙠𝙚𝙡𝙖𝙨:
➽𝙪𝙢𝙪𝙧:
➽𝙖𝙨𝙠𝙤𝙩:
➽𝙘𝙚/𝙘𝙤:
➽𝙖𝙜𝙖𝙢𝙖:

    𝙨𝙖𝙡𝙠𝙚𝙣 𝙢𝙤𝙜𝙖 𝙗𝙚𝙩𝙖𝙝
       𝙙𝙖𝙣 𝙗𝙖𝙘𝙖 𝙧𝙪𝙡𝙚𝙨𝙨

✩̣̣̣̣̣ͯ┄•͙✧⃝•͙┄✩ͯ•͙͙✧⃝•͙͙✩ͯ┄•͙✧⃝•͙┄✩̣̣̣̣̣ͯ`
                    Yori.sendMessage(anu.id, {
                        text: a,
                        contextInfo: {
                            externalAdReply: {
                                title: `☘️ Halo Selamat Datang`,
                                body: `${ownername}`,
                                thumbnailUrl: ppuser,
                                sourceUrl: "https://whatsapp.com/channel/0029VaKoIaj9cDDgB6N9u232",
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    })
                    await sleep(100)
                    Yori.sendMessage(anu.id, { audio: fs.readFileSync('./mp3/welcome.mp3'), mimetype: 'audio/mp4', ptt: true, fileLength: 88738 })
                } else if (anu.action == 'remove') {
                    let b = `✉️ *Sampai Jumpa, ${num.split("@")[0]} Telah Meninggalkan Group*`
                    Yori.sendMessage(anu.id, {
                        text: b,
                        contextInfo: {
                            externalAdReplyy: {
                                title: `☘️ Selamat Tinggal`,
                                body: `${ownername}`,
                                thumbnailUrl: ppuser,
                                sourceUrl: "https://whatsapp.com/channel/0029VaKoIaj9cDDgB6N9u232",
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    })
                } else if (anu.action == 'promote') {
                    Yori.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `🎁 *@${num.split('@')[0]} Telah Menjadi Admin Group* ${metadata.subject}` })
                } else if (anu.action == 'demote') {
                    Yori.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `✉️ *@${num.split('@')[0]} Sudah Bukan Admin Dari Group :* ${metadata.subject}` })
                }
            }
        } catch (err) {
            console.log(err)
        }
    })

    Yori.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = Yori.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    Yori.getName = (jid, withoutContact = false) => {
        id = Yori.decodeJid(jid)
        withoutContact = Yori.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = Yori.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === Yori.decodeJid(Yori.user.id) ?
            Yori.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

    Yori.sendContact = async (jid, kon, quoted = '', opts = {}) => {
        let list = []
        for (let i of kon) {
            list.push({
                displayName: await Yori.getName(i + '@s.whatsapp.net'),
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Yori.getName(i + '@s.whatsapp.net')}\nFN:${await Yori.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:luwibu@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://chat.whatsapp.com/IRimbEMvL16AzrxxPGJJqU\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Private;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
            })
        }

        Yori.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
    }

    //Kalau Mau Self Lu Buat Jadi false
    Yori.public = true


    Yori.ev.on('creds.update', saveCreds)

    Yori.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }

    Yori.sendImage = async (jid, path, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await Yori.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }

    Yori.sendText = (jid, text, quoted = '', options) => Yori.sendMessage(jid, { text: text, ...options }, { quoted })

    Yori.sendTextWithMentions = async (jid, text, quoted, options = {}) => Yori.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

    Yori.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }
        await Yori.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    Yori.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }
        await Yori.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    Yori.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }
    //=================================================
    Yori.cMod = (jid, copy, text = '', sender = Yori.user.id, options = {}) => {
        //let copy = message.toJSON()
        let mtype = Object.keys(copy.message)[0]
        let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
        let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
        else if (content.caption) content.caption = text || content.caption
        else if (content.text) content.text = text || content.text
        if (typeof content !== 'string') msg[mtype] = {
            ...content,
            ...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
        copy.key.remoteJid = jid
        copy.key.fromMe = sender === Yori.user.id
        return proto.WebMessageInfo.fromObject(copy)
    }
    Yori.sendFile = async (jid, PATH, fileName, quoted = {}, options = {}) => {
        let types = await Yori.getFile(PATH, true)
        let { filename, mime, data } = types
        let type = '', mimetype = mime, pathFile = filename
        if (options.asDocument) type = 'document'
        if (options.asSticker || /webp/.test(mime)) {
            let { writeExif } = require('./lib/sticker.js')
            let media = { mimetype: mime, data }
            pathFile = await writeExif(media, { packname: global.packname, author: global.packname2, categories: options.categories ? options.categories : [] })
            await fs.promises.unlink(filename)
            type = 'sticker'
            mimetype = 'image/webp'
        }
        else if (/image/.test(mime)) type = 'image'
        else if (/video/.test(mime)) type = 'video'
        else if (/audio/.test(mime)) type = 'audio'
        else type = 'document'
        await Yori.sendMessage(jid, { [type]: { url: pathFile }, mimetype, fileName, ...options }, { quoted, ...options })
        return fs.promises.unlink(pathFile)
    }
    Yori.parseMention = async (text) => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }

    Yori.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = {
                ...message.message.viewOnceMessage.message
            }
        }
        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await Yori.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
        return waMessage
    }

    Yori.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
            size: await getSizeMedia(data),
            ...type,
            data
        }
    }

    Yori.sendList = (jid, title, footer, btn, options = {}) => {
        let msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        ...options,
                        body: proto.Message.InteractiveMessage.Body.create({ text: title }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: footer || "Powered By Adrian" }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [
                                {
                                    "name": "single_select",
                                    "buttonParamsJson": JSON.stringify(btn)
                                },
                            ]
                        })
                    })
                }
            }
        }, {})
        Yori.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        })
    }

    Yori.serializeM = (m) => smsg(Yori, m, store)
    Yori.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.badSession) {
                console.log(`Bad Session File, Please Delete Session and Scan Again`);
                process.exit();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log("Connection closed, reconnecting....");
                connectToWhatsApp();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log("Connection Lost from Server, reconnecting...");
                connectToWhatsApp();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log("Connection Replaced, Another New Session Opened, Please Restart Bot");
                process.exit();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(`Device Logged Out, Please Delete Folder Session yusril and Scan Again.`);
                process.exit();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log("Restart Required, Restarting...");
                connectToWhatsApp();
            } else if (reason === DisconnectReason.timedOut) {
                console.log("Connection TimedOut, Reconnecting...");
                connectToWhatsApp();
            } else {
                console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
                connectToWhatsApp();
            }
        } else if (connection === "open") {
            Yori.sendMessage('923107058820' + "@s.whatsapp.net", { text: `☘️ *Bot Yori Chan Sukses Terhubung*\n🎁 *Author : wa.me/923107058820*` });
        }
     //   console.log(, update)
    });
    return Yori
}
connectToWhatsApp()
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
