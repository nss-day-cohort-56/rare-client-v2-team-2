import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCommentById, updateComment } from "../../managers/CommentManager"

export const CommentEdit = () => {

    const { commentId, postId } = useParams()
    const Navigate = useNavigate()

    const [comment, setComment] = useState({})

    useEffect(() => {
        getCommentById(commentId).then(setComment)
    }, [commentId]
    )

    const changeCommentState = (domEvent) => {
        const updatedComment = {...comment}
        updatedComment[domEvent.target.name] = domEvent.target.value
        setComment(updatedComment)
    }

    return(
        <>
            <h1>Edit Comment</h1>
            <form className="commentForm">
                <h2 className="commentForm__title">Edit {comment.post}</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="content">Comment:</label>
                        <input type="text" name="content" required autoFocus className="form-control" value={comment.content}
                            onChange={changeCommentState} />
                    </div>
                </fieldset>
                
                <button type="submit" onClick={evt => {
                    // prevents the form from being submitted
                    evt.preventDefault()
                    
                    
                    const updatedComment = {
                        content: comment.content,
                        post_id: comment.post_id
                        
                    }
                    // Send POST request to API
                    updateComment(commentId, updatedComment)
                    .then(() => Navigate(`/posts/${postId}/comments`))
                }}
                className="btn btn-primary">Update</button>
            </form>
        </>
        )
}
