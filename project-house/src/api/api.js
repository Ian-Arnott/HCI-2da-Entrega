const _rooms = [{
    id: 0,
    name: "All Devices",
    devices: [
        { name: "Device 1" },
        { name: "Device 2" },
        { name: "Device 3" },
    ],
    img: "kitchen.jpeg",
},
{
    id: 1,
    name: "Kitchen",
    devices: [
        { name: "Device 1" },
        { name: "Device 2" },
        { name: "Device 3" },
    ],
    img: "kitchen.jpeg",
},
{
    id: 2,
    name: "Bedroom",
    devices: [
        { name: "Device 1" },
        { name: "Device 2" },
        { name: "Device 3" },
    ],
    img: "bedroom.jpeg",
},
{
    id: 3,
    name: "Living Room",
    devices: [
        { name: "Device 1" },
        { name: "Device 2" },
        { name: "Device 3" },
    ],
    img: "living-room.jpg",
},]

const _devices = [
    // Lights
    {
        id: 1,
        type: 'Lights',
        name: "Light 1",
        room: 1,             // id del cuarto vinculado, 0 o undefined si ninguno
        state: 0,           // 0=inactive, 1=active, 2=..., depende del tipo
    },
    {
        id: 2,
        type: 'Lights',
        name: "Light 2",
        room: 0,
        state: 1,
    },
    {
        id: 3,
        type: 'Lights',
        name: "Light 3",
        state: 0,
    },

    // Speakers
    {
        id: 4,
        type: 'Speakers',
        name: "Speaker 1",
        state: 0
    },
    {
        id: 5,
        type: 'Speakers',
        name: "Speaker 2",
        state: 1
    },

    // Doors
    {
        id: 6,
        type: 'Doors',
        name: "Door 1",
        room: 1,
        state: 0
    },
    {
        id: 7,
        type: 'Doors',
        name: "Door 2",
        room: 2,
        state: 1
    },

    {
        id: 8,
        type: 'Doors',
        name: "Door 2",
        room: 3,
        state: 1
    },

    // Fridges
    {
        id: 9,
        type: 'Fridges',
        name: "Fridge 1",
        room: 1,
        state: 0
    },

    // AC
    {
        id: 10,
        type: 'AC',
        name: "AC 1",
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
                name: "Turned on",
                action: "Turn on",
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

const rooms = JSON.parse(JSON.stringify(_rooms));
const devices = JSON.parse(JSON.stringify(_devices));
const deviceTypes = JSON.parse(JSON.stringify(_deviceTypes));

export default {
    getRooms(okCallback) {
        setTimeout(() => okCallback(rooms), 100) // simulacion de llamada a api
    },

    getDevices(okCallback) {
        setTimeout(() => okCallback(devices), 100)
    },

    getDeviceTypes(okCallback) {
        setTimeout(() => okCallback(deviceTypes), 100)
    },

    setDeviceState(deviceID, state, okCallback, errorCallback) {
        _devices.find(device => device.id == deviceID).state = state;
        setTimeout(() => { Math.random() > 0.01 ? okCallback() : errorCallback() }, 100)
    }
}