import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createDemotion, deleteDemotion, getDemotionsByUser } from "../../managers/DemotionManager"
import { getAllUsers, getUserById, updateUser, updateUserActive, updateUserStaff, updateUserStatus } from "../../managers/UserManager"

export const UserEdit = () => {
    const navigate = useNavigate()
    const [editUser, setEditUser] = useState([])
    const { userId } = useParams()
    const [users, setUsers] = useState([])
    const [demotionState, setDemotion] = useState(false)
    const [demotionStatus, setDemotionStatus] = useState([])

    let loggedInUser = localStorage.getItem("user_id")

    useEffect(() => {
        getUserById(userId).then(data => setEditUser(data))
        getAllUsers().then(data => setUsers(data))
        getDemotionsByUser(userId).then(data => setDemotionStatus(data))
    }, [userId])

    const adminApprovalDemote = () => {
        if (demotionStatus.action === 'demote') {
            if (demotionStatus.approver_one === parseInt(loggedInUser) || (demotionStatus.admin === parseInt(loggedInUser))) {
                return <div>User demotion pending approval.</div>
            }
            else if (demotionStatus.admin !== parseInt(loggedInUser)) {
                return <button onClick={() => {
                    deleteDemotion(demotionStatus.id)
                    updateUserStaff(userId)
                    .then(() => navigate(`/users/${userId}`))
                }}>Approve Demotion</button>
            }
        }

        else if (demotionStatus.message) {
            return <button onClick={() => {
                let count = 0
                users.map(user => {
                    if (user?.user?.is_staff === true) {
                        count++
                    }
                })

                if(count <= 2) {
                    window.alert("You must make a new admin account before demoting.") 
                }

                if(count > 2) {
                    let newDemotion = {
                        action: "demote",
                        admin: userId,
                        approver_one: loggedInUser
                    }
                    createDemotion(newDemotion)
                }
            }}>Make Author</button>
        }
    }

    const adminApprovalDeactivate = () => {
        if (demotionStatus.action === 'deactivate') {
            if (demotionStatus.approver_one === parseInt(loggedInUser) || (demotionStatus.admin === parseInt(loggedInUser))) {
                return <div>User deactivation pending approval.</div>
            }
            else if (demotionStatus.admin !== parseInt(loggedInUser)) {
                return <button onClick={() => {
                    deleteDemotion(demotionStatus.id)
                    updateUserActive(userId)
                    .then(() => navigate(`/users/${userId}`))
                }}>Approve Deactivation</button>
            }
        }

        else if (demotionStatus.message || demotionStatus.action === "demote") {
            return <button onClick={() => {
                let count = 0
                users.map(user => {
                    if (user?.user?.is_staff === true) {
                        count++
                    }
                })

                if(count <= 2) {
                    if(editUser?.user?.is_staff) {
                        window.alert("You must make a new admin account before deactivating.") 
                    }
                    else {
                        let newDemotion = {
                            action: "deactivate",
                            admin: userId,
                            approver_one: loggedInUser
                        }
                        createDemotion(newDemotion)
                    }
                }

                if(count > 2) {
                    let newDemotion = {
                        action: "deactivate",
                        admin: userId,
                        approver_one: loggedInUser
                    }
                    createDemotion(newDemotion)
                }
            }}>Deactivate</button>
        }
    }

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
                                    adminApprovalDemote()
                                    :
                                    <button
                                    onClick={
                                        () => {
                                            const confirmBox = window.confirm("Confirm: Promote User to 'Admin'")
                                            if  (confirmBox)
                                            updateUserStaff(userId)
                                        .then(() => navigate(`/users/${userId}`))
                                    }}
                                    >Make Admin</button>
                                    }
                                </div>
                                <div className="field">
                                    <label htmlFor="active" className="label">Activation Status: </label>
                                    {
                                    editUser?.user?.is_active 
                                    ?
                                    adminApprovalDeactivate()
                                    :
                                    <button
                                    onClick={
                                        () => {
                                            const confirmBox = window.confirm("Confirm: Reactivate User")
                                            if  (confirmBox)
                                            updateUserActive(userId)
                                        .then(() => navigate(`/users/${userId}`))
                                    }}
                                    >Reactivate</button>
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
