export const getCommentsByPostId = (id) => {
    return fetch(`http://localhost:8088/comments?post_id=${id}`)
    .then(res => res.json())
};


export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8088/comments/${commentId}`, {
        method: "DELETE"
    })
};