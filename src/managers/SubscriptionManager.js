export const subscribeToAuthor = (authorId) => {
    return fetch('http://localhost:8000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify(authorId)
    }).then(res => res.json())
  }

  export const unsubscribeToAuthor = (subId) => {
    return fetch(`http://localhost:8000/subscribe/${subId}`, {
        method: 'PUT',
        headers: {

            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
    })
  }

  export const getSubscriptionStatus = (authorId) => {
    return fetch(`http://localhost:8000/subscribe?author=${authorId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    }).then(res => res.json())
  }
