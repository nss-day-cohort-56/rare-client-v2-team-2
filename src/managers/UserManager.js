export const getAllUsers = () => {
    return fetch("http://localhost:8000/users", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    }).then(res => res.json())
};

export const getUserById = (id) => {
    return fetch(`http://localhost:8000/users/${id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    })
        .then(res => res.json())
};

export const updateUser = (id, user) => {
    return fetch(`http://localhost:8000/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(user)
    }).then((res) => localStorage.setItem("is_staff", res.is_staff))
}

