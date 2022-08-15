import { useState, useEffect } from "react"
import { deletePost, getCurrentUsersPosts } from "../../managers/PostManager"
import { PostsTable } from "./PostsTable"


export const MyPost = () => {
  const [posts, setPosts] = useState([])

  const loadPosts = () => {
    getCurrentUsersPosts()
      .then((postArray) => {
        setPosts(postArray)
      })
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const deleteClickEvent = (id) => {
    deletePost(id).then(() => {
      loadPosts()
    })
  }

  return (
    <section className="section">
      <h1 className="title">My Posts</h1>
      <PostsTable posts={posts} deleteClickEvent={deleteClickEvent} />
    </section>
  )
}
