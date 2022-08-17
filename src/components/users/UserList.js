import { getAllUsers } from "../../managers/UserManager";
import { useState } from "react"
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Users = () => {
    const [rareUsers, setRareUsers] = useState([])

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

    return (
        <>
            
            <div className="user_container">
                <div className="userTitle">Users</div>
                {rareUsers.map((rareUser) => {
                    let userName = rareUser.user.username
                    let firstName = rareUser.user.first_name
                    let lastName = rareUser.user.last_name
                    let profileType = staff(rareUser.user)

                    return <section className="userBox" key={rareUser.id}>
                        <div className="user" >

                        <div value={rareUser.id}>Name: {firstName} {lastName}</div>
                        <div value={rareUser.id}>Display Name: {userName}</div>
                        <div value={rareUser.id}>Profile Type: {profileType}</div>

                        </div>
                        <Link to={`/users/${rareUser.id}`}>
                            <div value={rareUser.id}>See Details</div>
                        </Link>
                        <Link to={`/users/${rareUser.id}/edit`}>
                            <div value={rareUser.id}>Edit User</div>
                        </Link>
                    </section>
                })}

            </div>
        </>
    )

}
