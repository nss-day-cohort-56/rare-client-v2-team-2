import { getAllUsers, updateUser, updateUserActive } from "../../managers/UserManager";
import { useState } from "react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DeactivatedUsers = () => {


    const [rareUsers, setRareUsers] = useState([])
    const navigate = useNavigate()
    useEffect(()=> {
        fetch("http://localhost:8000/users", {
            headers: {
                'Authorization': `Token ${localStorage.getItem('auth_token')}`
            }
        }).then(res => res.json())
        .then((data) =>{ setRareUsers(data )})
    }, [])

    //determine if user is staff
    const staff= (selectedUser) => {
        if (selectedUser.is_staff === true) {
            return "Staff"
        }
        else {
            return "Customer"
        }
    }

    const active= (selectedUser) => {
        if (selectedUser.is_active === true) {
            return "Active"
        }
        else {
            return "Inactive"
        }
    }

    return (
        <>
            
            <div className="user_container">
                <div className="userTitle">Deactivated Users:</div>
                {rareUsers.map((rareUser) => {
                    let userName = rareUser.user.username
                    let firstName = rareUser.user.first_name
                    let lastName = rareUser.user.last_name
                    let profileType = staff(rareUser.user)
                    let activationStatus = active(rareUser?.user)
                    
                    return <section className="userBox" key={rareUser.id}>
                        <div className="user" >
                        {
                        rareUser?.user?.is_active !== true
                        ?
                        <>
                        <div value={rareUser.id}>Name: {firstName} {lastName}</div>
                        <div value={rareUser.id}>Display Name: {userName}</div>
                        <div value={rareUser.id}>Profile Type: {profileType}</div>
                        <div value={rareUser.id}>Activation Status: {activationStatus}</div>
                        <button
                                    onClick={
                                        () => {
                                            const confirmBox = window.confirm("Confirm: Reactivate User")
                                            if  (confirmBox)
                                            updateUserActive(rareUser.id)
                                        .then(() => navigate(`/users/`))
                                    }}
                                    >Reactivate</button>
                        </>
                        :
                        ""
                        }
                        </div>
                    </section>
                })}
                
                <button type="submit"
                    onClick={() => {
                        navigate(`/users`)
                    }} 
                    className="button is-success">Back
                </button>
            </div>
        </>
    )

}
