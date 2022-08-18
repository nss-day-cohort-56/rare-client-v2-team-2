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
