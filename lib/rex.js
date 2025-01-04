/*
 - whatsapp : 0895342022385
*/
const { fromBuffer } = require("file-type");
const fakeUserAgent = require("fake-useragent");
const FormData = require("form-data");
const crypto = require("crypto");
const randomBytes = crypto.randomBytes(5).toString("hex");
const fetch = require("node-fetch");

const createFormData = async (content, fieldName, ext) => {
    try {
        const { mime } = (await fromBuffer(content)) || {};
        const formData = new FormData();
        formData.append(fieldName, content, `${randomBytes}.${ext}`);
        return formData;
    } catch (error) {
        console.log("Error in createFormData:", error);
        throw error;
    }
};

async function pomf2(buffer) {
    try {
        const { ext } = (await fromBuffer(buffer)) || {};
        const form = await createFormData(buffer, "files[]", ext);
        const res = await fetch("https://pomf2.lain.la/upload.php", {
            method: "POST",
            body: form,
        });
        const json = await res.json();
        if (!json.success) throw json;
        return json;
    } catch (error) {
        console.log("Error in pomf2:", error);
        throw error;
    }
}

async function catbox(content) {
    try {
        const { ext } = (await fromBuffer(content)) || {};
        const formData = await createFormData(content, "fileToUpload", ext);
        formData.append("reqtype", "fileupload");
        const response = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": fakeUserAgent(),
            },
        });
        return await response.text();
    } catch (error) {
        console.log("Error in catbox:", error);
        throw error;
    }
}

async function uguu(content) {
    try {
        const { ext } = (await fromBuffer(content)) || {};
        const formData = await createFormData(content, "files[]", ext);
        const response = await fetch("https://uguu.se/upload.php", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": fakeUserAgent(),
            },
        });
        return await response.json();
    } catch (error) {
        console.log("Error in uguu:", error);
        throw error;
    }
}

async function tmpfiles(content) {
    try {
        const { ext } = (await fromBuffer(content)) || {};
        const formData = await createFormData(content, "file", ext);
        const response = await fetch("https://tmpfiles.org/api/v1/upload", {
            method: "POST",
            body: formData,
            headers: {
                "User-Agent": fakeUserAgent(),
            },
        });
        return await response.json();
    } catch (error) {
        console.log("Error in tmpfiles:", error);
        throw error;
    }
}

module.exports = {
    pomf2,
    catbox,
    uguu,
    tmpfiles,
};