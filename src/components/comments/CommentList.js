import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteComment, getCommentsByPostId } from '../../managers/CommentManager' 
import { FaTrashAlt, FaUserCircle, FaEdit } from 'react-icons/fa';


export const CommentsList = ({ userId }) => {
  const [comments, setComments] = useState([])
  const { postId } = useParams()
  let Navigate = useNavigate()
  
  const [staff, setStaff] = useState(false)

  useEffect(() => {
    let isStaff = localStorage.getItem("is_staff")
    setStaff(isStaff)
  }, [])


  const loadComments = useCallback(() => {
    getCommentsByPostId(postId).then((commentsData) => {
      setComments(commentsData)
    })
  }, [postId])
  
  useEffect(() => {
    loadComments()
  }, [loadComments])

  const handleDelete = (id) => {
    deleteComment(id).then(() => {
      loadComments()
    })
  }

  return <section className="section">
    <article className="panel is-info">
      <p className="panel-heading">
        Comments
      </p>
      {
        comments.map(comment => {
          return <div className="panel-block" key={comment.id}>
            <article className="media is-flex-grow-1">
              <figure className="media-left">
                <span className="icon is-large">
                  <FaUserCircle size={'3rem'} />
                </span>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{comment.author?.user.first_name} {comment.author?.user.last_name}</strong>
                    <br />
                    {comment.content}
                  </p>
                </div>

              </div>
              {
                parseInt(userId) === comment.author_id ?
                  <div className="media-right">
                    <span className="icon">
                      <FaEdit onClick={(() => Navigate(`/posts/${postId}/comments/:commentId/edit`))} />
                    </span>
                    <span className="icon">
                      <FaTrashAlt onClick={() => handleDelete(comment.id)} />
                    </span>
                  </div>
                  :
                 <>
                 {
                    staff ? <span className="icon">
                    <FaTrashAlt onClick={() => handleDelete(comment.id)} />
                    </span> : ""
                  }

                  </>

                }
            </article>
          </div>
        })
      }
    </article>
  </section>
}
