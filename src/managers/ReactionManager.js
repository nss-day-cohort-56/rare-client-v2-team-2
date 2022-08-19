export const getAllReactions = () => {
  return fetch(`http://localhost:8000/reactions`, {
    headers: {
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    }
  }).then(res => res.json())
}

export const addReaction = (postId, reactionId) => {
  return fetch(`http://localhost:8000/posts/${postId}/add`, {
    method: "POST",
    headers: {
      'Authorization': `Token ${localStorage.getItem('auth_token')}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reactionId)
  })
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
