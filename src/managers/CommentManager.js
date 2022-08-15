export const saveNewComment = (comment) => {
  return fetch("http://localhost:8088/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': `Token ${localStorage.getItem('auth_token')}`
    },
    body: JSON.stringify({ ...comment, author_id: localStorage.getItem('auth_token') })
  })
    .then(res => res.json())
}
