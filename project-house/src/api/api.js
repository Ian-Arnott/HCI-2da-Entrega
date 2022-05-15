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