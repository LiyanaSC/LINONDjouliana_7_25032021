import axios from 'axios'

export function getCommentsByArticleIdWithOffset(id, token, page, added) {
    return axios.get(`http://localhost:8080/api/articles/${id}/comments`, {
        headers: {
            'Authorization': `bearer ${token}`
        },
        params: {
            limit: 5,
            offset: 5 * page + added //how many articles we ignore
        }
    })
}

export function getCommentsByArticleIdWithLimit(articleId, token, length) {
    return axios.get(`http://localhost:8080/api/articles/${articleId}/comments`, {
        headers: {
            'Authorization': `bearer ${token}`

        },
        params: {
            limit: length
        }
    })
}

export function deleteCommentsByIdAndArticleId(articleId, commentId, token) {
    return axios.delete(`http://localhost:8080/api/articles/${articleId}/comments/${commentId}`, {
        headers: {
            'Authorization': `bearer ${token}`

        }
    })
}

export function updateCommentsById(articleId, commentId, content, token) {
    return axios.put(`http://localhost:8080/api/articles/${articleId}/comments/${commentId}`, {
        content: content


    }, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
}

export function createComment(articleId, content, token) {
    return axios.post(`http://localhost:8080/api/articles/${articleId}/comments`, {
        content: content
    }, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
}