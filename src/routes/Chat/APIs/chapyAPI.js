export default class ChapyAPI {
    constructor(baseUrl, room) {
        if (!baseUrl instanceof URL) {
            // API link validation can be added with required header
            console.error('Provide Api link wrapped in `new URL` constructor');
            return;
        }
        if (!baseUrl.protocol.startsWith('http')) {
            // API link validation can be added with required header
            console.error('Provide Api link with HTTP or HTTPS protocol');
            return;
        }
        if (!/^([a-zA-Z]{5})$/.test(room)) {
            console.error('Provide valid room id (5 alphabet symbols)');
            return;
        }

        this.baseUrl = baseUrl
        this.room = room
    }

    async connect(name) {
        const res = await fetch(this.baseUrl+this.room+'/connect?name='+name).then(a=>a.json())
        if ("message" in res)
            return {connected: false, message: res["message"]}
        return {connected: true, wsLink: res["wsLink"]}
    }

    async names() {
        return await fetch(this.baseUrl+this.room+'/names').then(a=>a.json())
    }
}