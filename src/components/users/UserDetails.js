import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getUserById } from "../../managers/UserManager"

export const UserDetails = () => {
    const { userId } = useParams()
    const [user, setUser] = useState({
    })
    useEffect(() => {
        getUserById(userId).then(
            userData => setUser(userData))
    }, [])

return (<><div className="user-details">{user?.first_name} {user?.last_name}
        {user?.profile_image_url ? 
        <div><img src={user?.profile_image_url} alt="profile-pic" /></div>
        : "" } 
        <div>username {user?.username}</div>
        <div>Created On {user?.created_on}</div>
        <div> Bio {user?.bio}</div>
    </div></>)///check and see what exactly needs to be displayed here, may need to update the get as well if joins are necessary
}