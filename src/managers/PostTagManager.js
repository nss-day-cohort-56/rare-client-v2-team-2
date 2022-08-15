export const saveNewPostTag = (posttag) => {
    return fetch("http://localhost:8088/posttags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(posttag)
    })
        .then(res => res.json())
}

export const getPostTagsByPost = (id) => {
    return fetch(`http://localhost:8088/posttags?post_id=${id}`)
        .then(res => res.json())
};



export const updatePostTag = (id, posttag) => {
    return fetch(`http://localhost:8088/posttags/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(posttag)
    })
};

export const deletePostTag = (postTagId) => {
    return fetch(`http://localhost:8088/posttags/${postTagId}`, {
        method: "DELETE"
    })
};