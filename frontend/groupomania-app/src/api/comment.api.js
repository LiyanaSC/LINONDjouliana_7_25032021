import axios from 'axios'

export function getCommentsByArticleId(id, token, page) {
    return axios.get(`http://localhost:8080/api/articles/${id}/comments`, {
        headers: {
            'Authorization': `bearer ${token}`
        },
        params: {
            limit: 5,
            offset: 5 * page //how many articles we ignore

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