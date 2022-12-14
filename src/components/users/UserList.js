import { getAllUsers } from "../../managers/UserManager";
import { useState } from "react"
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Users = () => {
    const [rareUsers, setRareUsers] = useState([])
    const navigate = useNavigate()
    useEffect(()=> {
        getAllUsers().then(usersData => setRareUsers(usersData))
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
                <div className="userTitle">Users</div>
                {rareUsers.map((rareUser) => {
                    let userName = rareUser.user.username
                    let firstName = rareUser.user.first_name
                    let lastName = rareUser.user.last_name
                    let profileType = staff(rareUser.user)
                    let activationStatus = active(rareUser?.user)

                    return <section className="userBox" key={rareUser.id}>
                        <div className="user" >

                        <div value={rareUser.id}>Name: {firstName} {lastName}</div>
                        <div value={rareUser.id}>Display Name: {userName}</div>
                        <div value={rareUser.id}>Profile Type: {profileType}</div>
                        <div value={rareUser.id}>Activation Status: {activationStatus}</div>

                        </div>
                        <Link to={`/users/${rareUser.id}`}>
                            <div value={rareUser.id}>See Details</div>
                        </Link>
                        <Link to={`/users/${rareUser.id}/edit`}>
                            <div value={rareUser.id}>Edit User</div>
                        </Link>
                        
                    </section>
                })}
                <button type="submit"
                    onClick={() => {
                        navigate(`/deactivated`)
                    }} 
                    className="button is-success">Deactivated Users
                </button>
            </div>
        </>
    )

}
