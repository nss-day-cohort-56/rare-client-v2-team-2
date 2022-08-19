import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deletePost, getPostById, updatePost } from "../../managers/PostManager"
import { FaUserCircle } from 'react-icons/fa'
import { getAllReactions, addReaction } from "../../managers/ReactionManager"

export const PostDetails = ({ userId }) => {
  const [post, setPost] = useState({})
  const [tagsForPost, setTags] = useState([])
  const { postId } = useParams()
  let navigate = useNavigate()
  const [staff, setStaff] = useState(false)
  const [reactions, setReactions] = useState([])

  useEffect(() => {
    let isStaff = localStorage.getItem("is_staff")
    setStaff(isStaff)
  }, [])

  useEffect(() => {
    getPostById(postId).then(postData => setPost(postData))
  }, [postId])

  useEffect(() => {
    let tags = []
    post?.post?.tags?.map(tag => {
      tags.push(parseInt(tag.id))
    })

    setTags(tags)
  }, [post])


  useEffect(() => {
    getAllReactions().then(setReactions)
  }, [])

  const showDelete = () => {
    if (parseInt(userId) === post?.post?.user?.id || staff === 'true') {
      if (staff === 'true' && parseInt(userId) !== post?.post?.user?.id) {
        return <><button style={{ background: "#D1483F" }} onClick={() => {
          deletePost(postId).then(() => {
            navigate('/posts')
          })
        }}>Delete</button>

        <button style={{background:"#D1483F"}} onClick={(evt) => {
          evt.preventDefault()
           const postData = {
             ...post,
             category_id: post.category.id,
             tags: tagsForPost,
             approved: false
           }
           updatePost(postId, postData).then(() => {
             navigate(`/posts`)
           })
        }}>Unapprove Post</button></>

      }
      else {
        return <button style={{ background: "#D1483F" }} onClick={() => {
          deletePost(postId).then(() => {
            navigate('/posts')
          })
        }}>Delete</button>
      }
    }
  }

  const getReactionCount = (reaction) => {
    let currentReaction = post?.reactions?.find(reactionCount => reactionCount.id == reaction.id)
    if (currentReaction != undefined) {
      return currentReaction.reaction_count
    }
    else {
      return 0
    }
  }

  return <section className="section">
    <div className="card">
      <header className="card-header is-justify-content-center">
        <h2 className="title is-size-3 p-3 ">
          {post.title}
        </h2>
      </header>
      <div className="card-image">
        <img src={`http://localhost:8000${post?.post?.image_url}`} alt={post.title} width="500" height="500" />
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <span className="icon is-large">
              <img src={`http://localhost:8000${post?.post?.user?.profile_image_url}`} alt={post.title} onClick={() => { navigate(`/authors/${post?.post?.user?.id}`) }} style={{ cursor: "pointer" }} />
            </span>
          </div>
          <div className="media-content">
            <p className="title is-4">{post?.post?.user?.user?.first_name} {post?.post?.user?.user?.last_name}</p>
            <p className="subtitle is-6">@{post?.post?.user?.user?.username}</p>
          </div>
        </div>

        <div className="content">
          {post.content}
          <hr />
          <time >{post.publication_date}</time>
          <div>
            {
              reactions.map(reaction => {
                return <span>
                  <button onClick={(() => {
                    let newReaction = { reaction_id: reaction.id }
                    addReaction(postId, newReaction)
                      .then(window.location.reload())
                  }
                  )}>
                    <img className="reaction" key={`reaction--${reaction.id}`} src={reaction.image_url} alt={reaction.label} /></button>
                  Count: {getReactionCount(reaction)}
                </span>
              })
            }
          </div>
        </div>
      </div>

      <footer className="card-footer">
        <Link to={`/posts/${postId}/comments`} className="card-footer-item">View Comments</Link>
        <Link to={`/posts/${postId}/add-comment`} className="card-footer-item">Add Comments</Link>
        {
          parseInt(userId) === post.user?.id ? <Link to={`/posts/${postId}/edit`} className="card-footer-item">Edit</Link> : <></>
        }
        {
          staff === 'true' ? <>
            {post?.post?.approved === false ? <>
              <button style={{ background: "#2CB71E" }} onClick={(evt) => {
                evt.preventDefault()
                const postData = {
                  ...post,
                  category_id: post.category.id,
                  tags: tagsForPost,
                  approved: true
                }
                updatePost(postId, postData).then(() => {
                  navigate(`/posts`)
                })
              }}>Approve Post</button>
              <button style={{ background: "#D1483F" }} onClick={() => {
                deletePost(postId).then(() => {
                  navigate(`/posts`)
                })
              }}>Deny Post</button>
            </> : showDelete()}
          </> : ""
        }
      </footer>
    </div>
  </section >
}
