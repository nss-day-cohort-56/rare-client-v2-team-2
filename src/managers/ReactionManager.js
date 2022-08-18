export const getAllReactions = () => {
    return fetch('http://localhost:8000/reactions', {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
    }
    }).then(res => res.json())
}

export const createReaction = (reaction) => {
    return fetch('http://localhost:8000/reactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
    },
        body: JSON.stringify(reaction)
    }).then(res => res.json())
}