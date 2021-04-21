import axios from 'axios'

export function getAllArticles(token, page, added) {
    return axios.get('http://localhost:8080/api/articles', {
        headers: {
            'Authorization': `bearer ${token}`

        },
        params: {
            page: page,
            added: added
        }
    })
}

export function createArticle(title, description, token) {
    return axios.post('http://localhost:8080/api/articles/', {
        title: title,
        description: description,

    }, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
}

export function getArticleById(articleId, token) {
    return axios.get(`http://localhost:8080/api/articles/${articleId}`, {
        headers: {
            'Authorization': `bearer ${token}`

        }
    })

}

export function updateArticleById(articleId, title, description, token) {
    return axios.put(`http://localhost:8080/api/articles/${articleId}`, {
        title: title,
        description: description,

    }, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
}

export function deleteArticleById(articleId, token) {
    return axios.delete(`http://localhost:8080/api/articles/${articleId}`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
}