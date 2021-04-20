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