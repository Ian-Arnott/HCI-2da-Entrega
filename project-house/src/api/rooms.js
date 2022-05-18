import { Api } from "./api"

class RoomApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/rooms${slug ? `/${slug}` : ""}`
    }

    static getDevicesUrl(slug, deviceSlug) {
        return `${RoomApi.getUrl(slug)}/devices${deviceSlug ? `/${deviceSlug}` : ""}`
    }

    static async add(room) {
        return await Api.post(RoomApi.getUrl(), room)
    }

    static async modify(room) {
        return await Api.put(RoomApi.getUrl(room.id), { name: room.name, meta: room.meta })
    }

    static async delete(id) {
        return await Api.delete(RoomApi.getUrl(id))
    }

    static async getAll() {
        return await Api.get(RoomApi.getUrl())
    }

    static async get(id) {
        return await Api.get(RoomApi.getUrl(id))
    }

    static async getDevicesFromRoom(roomId) {
        return await Api.get(RoomApi.getDevicesUrl(roomId))
    }

    static async addDeviceToRoom(roomId, deviceId) {
        return await Api.post(RoomApi.getDevicesUrl(roomId, deviceId))
    }

    static async deleteDeviceFromRoom(deviceId) {
        return await Api.delete(RoomApi.getDevicesUrl(null, deviceId))
    }
}

class Room {
    constructor(id, name, meta) {
        if (id) {
            this.id = id
        }
        this.name = name
        this.meta = meta
    }

    toString() {
        return JSON.stringify(this, null, 2)
    }
}

export { Room, RoomApi }