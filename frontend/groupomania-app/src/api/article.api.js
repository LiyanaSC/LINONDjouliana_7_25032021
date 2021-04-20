import axios from 'axios'

export function getAllArticles(token, page) {
    return axios.get('http://localhost:8080/api/articles', {
        headers: {
            'Authorization': `bearer ${token}`

        },
        params: {
            page: page
        }
    })

}