import { getUserById } from "../../managers/UserManager";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSubscriptionStatus, subscribeToAuthor } from "../../managers/SubscriptionManager";

export const AuthorDetails = () => {
    const [rareUser, setRareUser] = useState([])
    const [sub, setSub] = useState({})
    const { authorId } = useParams()
    
    const navigate = useNavigate()

    useEffect(() => {
        getUserById(authorId)
            .then(setRareUser)
        getSubscriptionStatus(authorId)
            .then(setSub)
    }, [authorId])

    const subscribe = (authorId) => {
        const payload = {"author": authorId}
        subscribeToAuthor(payload)
    }

    // const staff = (selectedUser) => {
    //     if (selectedUser?.is_staff === true) {
    //         return "Staff"
    //     }
    //     else {
    //         return "Customer"
    //     }
    // }

    // const active = (selectedUser) => {
    //     if (selectedUser?.active === true) {
    //         return "Yes"
    //     }
    //     else {
    //         return "No"
    //     }
    // }
    // useEffect(() => {console.log(rareUser)}, [])

    let userName = rareUser?.user?.username
    let firstName = rareUser?.user?.first_name
    let lastName = rareUser?.user?.last_name
    let email = rareUser?.user?.email
    // let joinDate = rareUser?.created_on
    let profileImg = rareUser?.profile_image_url
    let bio = rareUser?.bio
    // let profileType = staff(rareUser?.user)
    // let isActive = active(rareUser?.user)
    

    return( 
        <>
            <div className="user_container">
                <div className="userTitle">Users</div>
                <section className="userBox" key={rareUser.id}>
                    <div className="user" >
                        <img src={profileImg} alt="userImage" className="userImage" />
                        <div value={rareUser.id}>Bio: {bio}</div>
                        <div value={rareUser.id}>Name: {firstName} {lastName}</div>
                        <div value={rareUser.id}>User Name: {userName}</div>
                        <div value={rareUser.id}>Email: {email}</div>
                        {/* <div value={rareUser.id}>Profile Type: {profileType}</div>
                        <div value={rareUser.id}>Date Joined: {Date(joinDate)}</div>
                        <div value={rareUser.id}>Is Active? {isActive}</div> */}
                    </div>
                    <>{sub.created_on && !sub.ended_on ? <button >UnSubscribe</button> : <button onClick={subscribe()}>Subscribe</button>}</>
                    <button className="button" onClick={() => {
                        navigate(`/posts`)
                    }}>Back To Posts</button>
                </section>
            </div>
        </>
    )


}


