const _rooms = [{
    name: "Misc",
    devices: [
        { name: "Device 1" },
        { name: "Device 2" },
        { name: "Device 3" },
    ],
    img: "kitchen.jpeg",
},
{
    name: "Kitchen",
    devices: [
        { name: "Device 1" },
        { name: "Device 2" },
        { name: "Device 3" },
    ],
    img: "kitchen.jpeg",
},
{
    name: "Bedroom",
    devices: [
        { name: "Device 1" },
        { name: "Device 2" },
        { name: "Device 3" },
    ],
    img: "bedroom.jpeg",
},
{
    name: "Living Room",
    devices: [
        { name: "Device 1" },
        { name: "Device 2" },
        { name: "Device 3" },
    ],
    img: "living-room.jpg",
},]

export default {
    getRooms(okCallback) {
        setTimeout(() => okCallback(_rooms), 100) // simulacion de llamada a api
    },
}