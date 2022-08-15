// deconstruct param from view comments link 
// !! Change Comment in SQL to have user_id instead of author_id !!
// fetch comments joined by user_id filtered by post_id 
// .map through Comment passing down  id comments.user.first comments.user.last comments.content
// if local_user_id = user_id ? render with trashcan icon
// else render no trash can 

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { deleteComment, getCommentsByPostId } from "./CommentManager"
import { FaTrashAlt } from 'react-icons/fa';


export const CommentsList = () => {
    const [comments, setComments] = useState([])
    const { postId } = useParams()

    const localUser = localStorage.getItem("auth_token")
    const userObject = JSON.parse(localUser)

    useEffect(
        () => {
            getCommentsByPostId(postId)
                .then((commentArray) => {
                    setComments(commentArray)
                })
        },
        []
    )

    const deleteButton = (id) => {
        return deleteComment(id)
            .then(() => {
                getCommentsByPostId(postId)
                    .then((commentArray) => {
                        setComments(commentArray)
                    })
            })
    }


    return <>
        <h2>comments:<br /><br /></h2>
        <div>
            {
                comments.map(comment => {
                    return <div className="inLine">
                        {comment?.content} <div>
                            {userObject === comment.author_id
                                ? < FaTrashAlt onClick={() => {
                                    deleteButton(comment.id)
                                }
                                } />
                                : <></>
                            }</div>
                        <br />
                    </div>
                })
            }
        </div>
    </>
}
