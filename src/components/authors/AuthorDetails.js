import { getUserById } from "../../managers/UserManager";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSubscriptionStatus, subscribeToAuthor, unsubscribeToAuthor } from "../../managers/SubscriptionManager";

export const AuthorDetails = () => {
    const [rareUser, setRareUser] = useState([])
    const [subscription, setSub] = useState({})
    const [subId, setSubId] = useState(0)
    const { authorId } = useParams()

    const navigate = useNavigate()
    useEffect(() => {
        getUserById(authorId)
            .then(setRareUser)
        getSubscriptionStatus(authorId)
            .then(setSub)
    }, [authorId])
    useEffect(() => {
        let sub = {...subscription[0]}
        setSubId(sub.id)
    }, [subscription])

    const subObj = { author: authorId }
    const subscribe = (subObj) => {
        subscribeToAuthor(subObj).then(
            getSubscriptionStatus(authorId).then(setSub)
        )
    }
    const unsubscribe = () => {
        unsubscribeToAuthor(subId).then(
            getSubscriptionStatus(authorId).then(setSub)
        )
    }

    let userName = rareUser?.user?.username
    let firstName = rareUser?.user?.first_name
    let lastName = rareUser?.user?.last_name
    let email = rareUser?.user?.email
    let profileImg = rareUser?.profile_image_url
    let bio = rareUser?.bio


    return (
        <>
            <div className="user_container">
                <div className="userTitle">Author</div>
                <section className="userBox" key={rareUser.id}>
                    <div className="user" >
                        <img src={profileImg} alt="userImage" className="userImage" />
                        <div value={rareUser.id}>Bio: {bio}</div>
                        <div value={rareUser.id}>Name: {firstName} {lastName}</div>
                        <div value={rareUser.id}>User Name: {userName}</div>
                        <div value={rareUser.id}>Email: {email}</div>
                    </div>
                    <>{subscription.length ? <button onClick={() => { unsubscribe() }}>UnSubscribe</button> :

                        <button onClick={() => { subscribe(subObj) }}>Subscribe</button>}</>
                    <button className="button" onClick={() => {
                        navigate(`/posts`)
                    }}>Back To Posts</button>
                </section>
            </div>
        </>
    )


}


