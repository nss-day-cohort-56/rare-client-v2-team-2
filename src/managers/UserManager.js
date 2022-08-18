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
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(user)
    })
}

// export const updateUser = (id, user) => {
//     return fetch(`http://localhost:8000/users/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization': `Token ${localStorage.getItem('auth_token')}`
//         },
//         body: JSON.stringify(user)
//     }).then((res) => {
//         if (res.id == id){
//             localStorage.setItem("is_staff", res.is_staff)}
//         })
// }

export const updateUserActive = (id, user) => {
    return fetch(`http://localhost:8000/users/${id}/change_active_status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(user)
    }).then((res) => {
        if (res.id === id){
            localStorage.setItem("is_active", res.is_active)}
        })
}


export const updateUserStaff = (id, user) => {
    return fetch(`http://localhost:8000/users/${id}/change_staff_status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(user)
    }).then((res) => {
        if (res.id === id){
            localStorage.setItem("is_staff", res.is_staff)}
        })
}

