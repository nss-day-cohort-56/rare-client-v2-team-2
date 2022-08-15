import { useEffect, useState } from "react"
import { getAllPosts } from "../../managers/PostManager"
import { PostsTable } from "./PostsTable"


export const PostList = () => {
  const [posts, setPosts] = useState([])

  const loadPosts = () => getAllPosts().then(data => setPosts(data))

  useEffect(() => {
    loadPosts()
  }, [])

  return <section className="section">
    <article className="panel is-info">
      <p className="panel-heading">
        Posts
      </p>

      <div className="panel-block">
        <PostsTable posts={posts} />
      </div>
    </article>
  </section>
}
