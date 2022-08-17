import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById, updateUser } from "../../managers/UserManager"

export const UserEdit = () => {
    const navigate = useNavigate()
    const [editUser, setEditUser] = useState([])
    const { userId } = useParams()

    useEffect(() => {
        getUserById(userId).then(data => setEditUser(data))
    }, [userId])


    return (
        <>
            <section key={`user--${editUser.id}`}className="section">
                    <article className="panel is-info">
                        <h2 className="panel-heading">Change Access for User: {editUser?.user?.username}</h2>
                        <div className="panel-block">
                            <form style={{ width: "100%" }}>
                                <div className="field">
                                    <label htmlFor="is_staff" className="label">Access: </label>
                                    {
                                    editUser?.user?.is_staff 
                                    ?
                                    <button
                                        onClick={
                                            () => updateUser(userId)
                                            .then(() => navigate(`/users/${userId}`))
                                        }
                                    >Make Author</button>
                                    :
                                    <button
                                        onClick={
                                            () => updateUser(userId)
                                            .then(() => navigate(`/users/${userId}`))
                                        }
                                    >Make Admin</button>
                                    }           
                                </div>
                            </form>
                        </div>
                    </article>
            </section>

            <button type="submit"
                onClick={() => {
                        navigate(`/users`)
                }} 
                className="button is-success">Back
            </button>
        </>
    )
}







// import { useEffect, useState } from "react"
// import { Navigate, useParams } from "react-router-dom"
// import { getUserById, updateUser } from "../../managers/UserManager"


// export const UserEdit = () => {

//     const [rareUser, setRareUser] = useState({})
//     const { userId } = useParams()

//     useEffect(() => {
//         getUserById(userId)
//             .then(setRareUser)
//     }, [userId])

//     const handleSubmit = (evt) => {
//         evt.preventDefault()

//         updateUser(userId, rareUser).then((user) => {
//             Navigate(`/users/${userId}`)
//         })
//     }

//     const handleChange = (evt) => {
//         const userCopy = {...rareUser}
//         userCopy[evt.target.name] = evt.target.value
//         setRareUser(userCopy)
//     }

//     return(
//         <section className="section">
//             <article className="panel is-info">
//                 <h2 className="panel-heading">Update User</h2>
//                 <div className="panel-block">
//                     <form style={{ width: "100%" }}>
//                         <div className="field">
//                             <label htmlFor="is_staff" className="label">Access: </label>
//                                 <input key={`user--${userId}`}
//                                     onChange={
//                                         (evt) => {
//                                             const copy = new Set(rareUser)
//                                             const id = evt.target.id
//                                             if(evt.target.checked) {
//                                                 copy.add()
//                                             }
//                                         }
//                                     }

                               
//                         </div>    
//                     </form>    
//                 </div>
//             </article>
//         </section>
//     )

// }