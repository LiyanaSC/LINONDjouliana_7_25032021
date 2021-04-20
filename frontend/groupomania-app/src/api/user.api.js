import axios from 'axios'

export function deleteUserById(userId, token) {
    return axios.delete(`http://localhost:8080/api/users/${userId}`, {
        headers: {
            'Authorization': `bearer ${token}`

        }
    })
}

export function logUser(password, email) {
    return axios.post('http://localhost:8080/api/auth/login', {
        password: password,
        email: email
    })
}

export function signupUser(password, email, firstname, lastname) {
    return axios.post('http://localhost:8080/api/auth/signup', {
        password: password,
        email: email,
        firstname: firstname,
        lastname: lastname,
    })
}

export function updateUserById(userId, firstname, lastname, token) {
    return axios.put(`http://localhost:8080/api/users/${userId}`, {
        firstname: firstname,
        lastname: lastname,


    }, {
        headers: {
            'Authorization': `bearer ${token}`

        }
    })
}

export function getUserById(userId, token) {
    return axios.get(`http://localhost:8080/api/users/${userId}`, {
        headers: {
            'Authorization': `bearer ${token}`

        }
    })
}