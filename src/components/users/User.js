import { Link } from "react-router-dom"


export const User = ({ u }) => {
    return <>
        <div key={u?.id} className="user">
            <Link to={`/users/${u?.id}/`} className="user-">{u?.username}</Link>
            <p className="user-firstName">{u?.first_name}</p>
            <p className="user-lastName">{u?.last_name}</p>
            <p className="user-email">{u?.email}</p> </div>
        </>
}