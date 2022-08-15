import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPostById } from "../../managers/PostManager"
import { FaUserCircle } from 'react-icons/fa'

export const PostDetails = ({ userId }) => {
  const [post, setPost] = useState({})
  const { postId } = useParams()

  useEffect(() => {
    getPostById(postId).then(postData => setPost(postData))
  }, [postId])

  return <section className="section">
    <div className="card">
      <header className="card-header is-justify-content-center">
        <h2 className="title is-size-3 p-3 ">
          {post.title}
        </h2>
      </header>
      <div className="card-image">
        <figure className="image">
          <img src={post?.image_url} alt={post.title} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <span className="icon is-large">
              <FaUserCircle size={'3rem'} />
            </span>
          </div>
          <div className="media-content">
            <p className="title is-4">{post.user?.first_name} {post.user?.last_name}</p>
            <p className="subtitle is-6">@{post.user?.username}</p>
          </div>
        </div>

        <div className="content">
          {post.content}
          <hr />
          <time >{post.publication_date}</time>
        </div>
      </div>
      <footer className="card-footer">
        <Link to={`/posts/${postId}/comments`} className="card-footer-item">View Comments</Link>
        <Link to={`/posts/${postId}/add-comment`} className="card-footer-item">Add Comments</Link>
        {
          parseInt(userId) === post.user?.id ? <Link to={`/posts/${postId}/edit`} className="card-footer-item">Edit</Link> : <></>
        }
      </footer>
    </div>
  </section>
}

