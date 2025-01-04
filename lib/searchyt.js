const { randomBytes } = require('crypto');
const fs = require('fs');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

 async function ytmp3(ptz, m, url) {
    try {
        const sender = m.sender
        const info = await ytdl.getInfo(url);
        let a = "./tmp/" + randomBytes(4).toString('hex') + ".mp3";
        let b = await ytdl(url, {
            filter: "audioonly"
        }).pipe(fs.createWriteStream(a)).on("finish", async () => {
            await ptz.sendMessage(m.chat, { audio: fs.readFileSync(a), mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
        })
        return b
    } catch (e) {
        console.error(e);
        return {
            status: 'error',
            message: 'Terjadi kesalahan saat mengambil informasi video'
        };
    }
}

async function ytmp4(url) {
	try {
		const { videoDetails } = await ytdl.getInfo(url, {
			lang: "id",
		});
		const stream = ytdl(url, {
			filter: "videoandaudio",
		});
		const chunks = [];
		stream.on("data", (chunk) => {
			chunks.push(chunk);
		});
		await new Promise((resolve, reject) => {
			stream.on("end", resolve);
			stream.on("error", reject);
		});
		const buffer = Buffer.concat(chunks);
		return {
			meta: {
				title: videoDetails.title,
				channel: videoDetails.author.name,
				seconds: videoDetails.lengthSeconds,
				description: videoDetails.description,
				image: videoDetails.thumbnails.slice(-1)[0].url,
			},
			buffer: buffer,
			size: buffer.length,
		};
	} catch (error) {
		throw error;
	}
}

 async function search(query) {
    try {
        const a = (await yts(query)).videos
        return a;
    } catch (e) {
        console.error(e)
        return null
    }
}

module.exports = { ytmp3, ytmp4, search }