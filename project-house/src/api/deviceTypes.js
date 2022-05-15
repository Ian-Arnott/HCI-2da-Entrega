// api calls for device types

import { Api } from "./api"

class DeviceTypeApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devicetypes${slug ? `/${slug}` : ""}`
    }

    static async get(id) {
        return await Api.get(DeviceTypeApi.getUrl(id))
    }

    static async getAll() {
        return await Api.get(DeviceTypeApi.getUrl())
    }
}

class DeviceType {
    constructor(id, name, actions) {    // ver bien
        this.id = id
        this.name = name
        this.actions = actions
    }

    toString() {
        return JSON.stringify(this, null, 2)
    }
}

export { DeviceType, DeviceTypeApi }