export const getAllTags = () => {
  return fetch('http://localhost:8000/tags', {
    headers: {
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    }
  }).then(res => res.json())
}

export const createTag = (tag) => {
  return fetch('http://localhost:8000/tags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    },
    body: JSON.stringify(tag)
  }).then(res => res.json())
}

export const deleteTag = (tagId) => {
  return fetch(`http://localhost:8000/tags/${tagId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${localStorage.getItem('auth_token')}`
    }
  })
}

export const updateTag = (tag) => {
  return fetch(`http://localhost:8000/tags/${tag.id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify(tag)
  })
}
