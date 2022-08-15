export const getAllPosts = () => {
  return fetch("http://localhost:8000/posts", {
    headers: {
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    }
  })
    .then(res => res.json())
}

export const createPost = (post) => {
  return fetch("http://localhost:8000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    },
    body: JSON.stringify(post)
  })
    .then(res => res.json())
}

export const getPostById = id => {
  return fetch(`http://localhost:8000/posts/${id}`, {
    headers: {
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    }
  })
    .then(res => res.json())
}

export const updatePost = (id, post) => {
  return fetch(`http://localhost:8000/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    },
    body: JSON.stringify(post)
  })
}

export const getSinglePost = (id) => {
  return fetch(`http://localhost:8000/posts/${id}`, {
    headers: {
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    }
  })
    .then(res => res.json())
}

export const getCurrentUsersPosts = () => {
  return fetch(`http://localhost:8000/posts?user_id=${localStorage.getItem('auth_token')}`, {
    headers: {
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    }
  })
    .then(res => res.json())
}

export const getPostsByCategory = (id) => {
  return fetch(`http://localhost:8000/posts?category_id=${id}`, {
    headers: {
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    }
  })
    .then(res => res.json())
}

export const getPostsByTag = (id) => {
  return fetch(`http://localhost:8000/posts?tag_id=${id}`, {
    headers: {
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    }
  }).then(res => res.json())
}

export const getPostsByTitle = (search) => {
  return fetch(`http://localhost:8000/posts?title=${search}`, {
    headers: {
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    }
  }).then(res => res.json())
}

export const deletePost = (postId) => {
  return fetch(`http://localhost:8000/posts/${postId}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    }
  })
}
