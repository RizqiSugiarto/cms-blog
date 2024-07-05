const BaseUrl =  import.meta.env.VITE_BASE_URL

type loginRequest = {
    email: string
    password: string
}

export const login = async (credential: loginRequest) => {
    try {
        const response = await fetch(`${BaseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(credential)
        })
        if(!response.ok) {
            throw new Error('Login Failed')
        }
        return response.json()
    } catch (error) {
        console.error('Login Failed')
    }
}

type registerRequest = {
    name: string
    email: string
    password: string
    role: string
}

export const register = async (credential: registerRequest) => {
    try {
        const response = await fetch(`${BaseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(credential)
        })
        if(!response.ok) {
            throw new Error('Login Failed')
        }
        return response.json()
    } catch (error) {
        console.error('Login Failed')
    }
}

export const logout = async () => {
    try {
        const response = await fetch(`${BaseUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        if(!response.ok) {
            throw new Error('Login Failed')
        }
        return response.json()
    } catch (error) {
        console.error('Login Failed')
    }
}