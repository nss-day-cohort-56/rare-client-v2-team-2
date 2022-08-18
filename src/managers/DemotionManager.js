export const createDemotion = (demoteObj, userId) => {
    return fetch(`http://localhost:8000/demote`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(demoteObj)
    }).then(res => res.json())
}

export const getDemotionsByUser = (userId) => {
    return fetch(`http://localhost:8000/demote?user=${userId}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    })
        .then(res => res.json())
};

export const deletePost = (demotionId) => {
    return fetch(`http://localhost:8000/demote/${demotionId}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    })
}