// const _rooms = [{
//     id: 12345,
//     name: "Kitchen",
//     meta: {
//         img: "kitchen.jpeg",
//     }
// }]

const _devices = [
    // Lights
    {
        id: 1,
        type: 'Lights',
        name: "Light 1",
        slug: "light-1",
        room: 1,             // id del cuarto vinculado, 0 o undefined si ninguno
        state: 0,           // 0=inactive, 1=active, 2=..., depende del tipo
    },
    {
        id: 2,
        type: 'Lights',
        name: "Light 2",
        slug: "light-2",
        room: 0,
        state: 1,
    },
    {
        id: 3,
        type: 'Lights',
        name: "Light 3",
        slug: "light-3",
        state: 0,
    },

    // Speakers
    {
        id: 4,
        type: 'Speakers',
        name: "Speaker 1",
        slug: "speaker-1",
        state: 0
    },
    {
        id: 5,
        type: 'Speakers',
        name: "Speaker 2",
        slug: "speaker-2",
        state: 1
    },

    // Doors
    {
        id: 6,
        type: 'Doors',
        name: "Door 1",
        slug: "door-1",
        room: 1,
        state: 0
    },
    {
        id: 7,
        type: 'Doors',
        name: "Door 2",
        slug: "door-2",
        room: 2,
        state: 1
    },

    {
        id: 8,
        type: 'Doors',
        name: "Door 3",
        slug: "door-3",
        room: 3,
        state: 1
    },

    // Fridges
    {
        id: 9,
        type: 'Fridges',
        name: "Fridge 1",
        slug: "fridge-1",
        room: 1,
        state: 0
    },

    // AC
    {
        id: 10,
        type: 'AC',
        name: "AC 1",
        slug: "ac-1",
        room: 3,
        state: 1,
    }
]

const _deviceTypes = [
    {
        name: 'Lights',
        states: [
            {
                id: 0,  // default inactive
                name: "Turned off",
                action: "Turn off",
                icon: "mdi-lightbulb",
            },
            {
                id: 1,  // default active
                name: "Turned on",
                action: "Turn on",
                icon: "mdi-lightbulb-on",
            },
            //others
        ]
    },
    {
        name: 'Speakers',
        states: [
            {
                id: 0,  // default inactive
                name: "Turned off",
                action: "Turn off",
                icon: "mdi-speaker-off",
            },
            {
                id: 1,  // default active
                name: "Playing",
                action: "Play",
                icon: "mdi-speaker",
            },
        ]
    },
    {
        name: 'Doors',
        states: [
            {
                id: 0,  // default inactive
                name: "Unlocked",
                action: "Unlock",
                icon: "mdi-door",
            },
            {
                id: 1,  // default active
                name: "Locked",
                action: "Lock",
                icon: "mdi-door-closed-lock",
            },
        ]
    },
    {
        name: 'Fridges',
        states: [
            {
                id: 0,  // default inactive
                name: "Turned off",
                action: "Turn off",
                icon: "mdi-fridge-off",
            },
            {
                id: 1,  // default active
                name: "Turned on",
                action: "Turn on",
                icon: "mdi-fridge",
            },
        ]
    },
    {
        name: 'AC',
        states: [
            {
                id: 0,  // default inactive
                name: "Turned off",
                action: "Turn off",
                icon: "mdi-air-conditioner",
            },
            {
                id: 1,  // default active
                name: "Turned on",
                action: "Turn on",
                icon: "mdi-air-conditioner",
            },
        ]
    }
]

// copias

const devices = JSON.parse(JSON.stringify(_devices));
const deviceTypes = JSON.parse(JSON.stringify(_deviceTypes));

export default {
    getDevices(okCallback) {
        setTimeout(() => okCallback(devices), 100)
    },

    getDeviceTypes(okCallback) {
        setTimeout(() => okCallback(deviceTypes), 100)
    },

    setDeviceState(deviceID, state, okCallback, errorCallback) {
        _devices.find(device => device.id == deviceID).state = state;
        setTimeout(() => { Math.random() > 0.01 ? okCallback() : errorCallback() }, 100)
    },

    // helper
    slugify(name) {
        return name.trim().toLowerCase().replace(/\s\s+/g, '-');
    }
}

class Api {
    static get baseUrl() {
        return "http://localhost:8080/api"  // grupo 4 puerto 8084
    }

    static get timeout() {
        return 60 * 1000;
    }

    static async fetch(url, init) {
        const controller = new AbortController()
        init.signal = controller.signal

        const timer = setTimeout(() => controller.abort(), Api.timeout)

        try {
            const response = await fetch(url, init)
            const text = await response.text()
            const json = text ? JSON.parse(text) : {}

            // el api retorna un objeto error o result como base
            if (json.error) throw json.error
            return json.result
        } catch (error) {
            if (error.name === "AbortError") // error de fetch
                throw { code: 100, description: [error.message.toLowerCase()] }
            else if (error.name == "TypeError")
                throw { code: 101, description: [error.message.toLowerCase()] };
            throw error // error de api
        } finally {
            clearTimeout(timer)
        }
    }

    static async get(url) {
        return await Api.fetch(url, {})
    }

    static async post(url, data) {
        return await Api.fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(data)
        })
    }

    static async put(url, data) {
        return await Api.fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(data)
        })
    }

    static async delete(url) {
        return await Api.fetch(url, { method: "DELETE" })
    }
}

export { Api }