import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteComment, getCommentsByPostId } from '../../managers/CommentManager' 
import { FaTrashAlt, FaUserCircle, FaEdit } from 'react-icons/fa';
import { getAllUsers } from "../../managers/UserManager";


export const CommentsList = ({ userId }) => {
  const [comments, setComments] = useState([])
  const { postId } = useParams()
  let Navigate = useNavigate()
  let [users, setUsers] = useState([])

  const loadComments = useCallback(() => {
    getCommentsByPostId(postId).then((commentsData) => {
      setComments(commentsData)
    })
  }, [postId])
  
  useEffect(() => {
    loadComments()
  }, [loadComments])

  useEffect(
    () => {
      getAllUsers().then(data => setUsers(data))
    }, []
  )

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
                      <FaEdit onClick={(() => Navigate(`/posts/${postId}/comments/${comment.id}/edit`))} />
                    </span>
                    <span className="icon">
                      <FaTrashAlt onClick={() => handleDelete(comment.id)} />
                    </span>
                  </div>
                  :
                  <>
                  {
                    users.map(user => {
                      if (parseInt(userId) === user.id && user?.user?.is_staff === true) {
                          return <div className="media-right">
                          <span className="icon">
                            <FaEdit onClick={(() => Navigate(`/posts/${postId}/comments/${comment.id}/edit`))} />
                          </span>
                          <span className="icon">
                            <FaTrashAlt onClick={() => handleDelete(comment.id)} />
                          </span>
                        </div>
                      }
                    })
                  }</>
              }
            </article>
          </div>
        })
      }
    </article>
  </section>
}
