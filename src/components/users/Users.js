import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User } from "./User"
import { getAllUsers} from "../../managers/UserManager"


export const Users = () => {
const [users, setUsers] = useState([]);

useEffect(() => {
    getAllUsers().then(userData => setUsers(userData))
}, [])

//the entries need to be displayed alphabetically, should do on server side plz thank
// we are going to display a list of users here
//the list will contain their username, first and last name, and email.  they will be ordered by username
    return ( <> 
    <div>"Hello I'll be a user List someday"</div>
        {users.map(u => {  return <>
<User u={u} /></>

})} </>
)
}
