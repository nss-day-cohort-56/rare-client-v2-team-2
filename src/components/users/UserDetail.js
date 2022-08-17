import { getUserById, updateUser } from "../../managers/UserManager";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UserDetail = () => {
    const [rareUser, setRareUser] = useState([])
    const { userId } = useParams()
    const navigate = useNavigate()
    const [imageString, setString] = useState("")
    const [profileImage, setImage] = useState("")

    useEffect(() => {
        getUserById(userId)
            .then(setRareUser)
    }, [userId])

    const staff = (selectedUser) => {
        if (selectedUser?.is_staff === true) {
            return "Staff"
        }
        else {
            return "Customer"
        }
    }

    const active = (selectedUser) => {
        if (selectedUser?.active === true) {
            return "Yes"
        }
        else {
            return "No"
        }
    }

    useEffect(
        () => {
            let image = rareUser?.profile_image_url
            setImage(image)
        },
        [rareUser]
    )

    // useEffect(() => {console.log(rareUser)}, [])

    let userName = rareUser?.user?.username
    let firstName = rareUser?.user?.first_name
    let lastName = rareUser?.user?.last_name
    let email = rareUser?.user?.email
    let joinDate = rareUser?.created_on
    let profileImg = rareUser?.profile_image_url
    let bio = rareUser?.bio
    let profileType = staff(rareUser?.user)
    let isActive = active(rareUser?.user)
    
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createProfilePictureString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setString(base64ImageString)
    
            // Update a component state variable to the value of base64ImageString
        });
    }

    return( 
        <>
            <div className="user_container">
                <div className="userTitle">Users</div>
                <section className="userBox" key={rareUser.id}>
                    <div className="user" >
                        <img src={`http://localhost:8000${profileImage}`} alt="userImage" className="userImage" width="400" height="500"/>
                        <br></br>
                        <input type="file" id="image" onChange={createProfilePictureString} />
                        <input type="hidden" name="user_id" value={userId} />
                        <button onClick={() => {
                            let newUserData = {
                                ...rareUser,
                                image: imageString
                            }
                            updateUser(userId, newUserData).then(() => {
                                getUserById(userId)
                                .then(setRareUser)
                            })
                        }}>Upload</button>
                        <div value={rareUser.id}>Bio: {bio}</div>
                        <div value={rareUser.id}>Name: {firstName} {lastName}</div>
                        <div value={rareUser.id}>User Name: {userName}</div>
                        <div value={rareUser.id}>Email: {email}</div>
                        <div value={rareUser.id}>Profile Type: {profileType}</div>
                        <div value={rareUser.id}>Date Joined: {Date(joinDate)}</div>
                        <div value={rareUser.id}>Is Active? {isActive}</div>
                    </div>
                    <button className="button" onClick={() => {
                        navigate(`/users`)
                    }}>Back To Users</button>
                </section>
            </div>
        </>
    )


}