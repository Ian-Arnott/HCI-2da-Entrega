import { Api } from "./api";

class DeviceApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`
    }

    static async getAll() {
        return await Api.get(DeviceApi.getUrl())
    }

    static async add(device) {
        return await Api.post(DeviceApi.getUrl(), device)
    }

    static async delete(id) {
        return await Api.delete(DeviceApi.getUrl(id))
    }

    static async get(id) {
        return await Api.get(DeviceApi.getUrl(id))
    }

    static async update(device) {
        return await Api.put(DeviceApi.getUrl(device.id), { name: device.name, meta: device.meta })
    }

    static async getState(id) {
        return await Api.get(`${DeviceApi.getUrl(id)}/state`)
    }

    static async getByType(typeId) {
        return await Api.get(`${Api.baseUrl}/devicetypes/${typeId}`)
    }

    static async executeAction(id, actionName) {
        return await Api.put(`${DeviceApi.getUrl(id)}/${actionName}`, {})
    }
}

class Device {
    constructor(id, name, type, meta) {
        if (id) {
            this.id = id
        }
        this.name = name
        this.type = type
        this.meta = meta
    }

    toString() {
        return JSON.stringify(this, null, 2)
    }

    static getIcon(state) {
        switch (state) {
            default:
                break
        }
    }
}

export { Device, DeviceApi }