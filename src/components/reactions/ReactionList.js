import { useEffect, useState } from "react"
import { getAllReactions } from "../../managers/ReactionManager"
import { ReactionForm } from "./ReactionForm"

export const ReactionList = () => {
    const [reactions, setReactions] = useState([])

    const loadReactions = () => {
        getAllReactions().then(data => setReactions(data))
    }

    useEffect(() => {
        loadReactions()
    },[])

    const isStaff = localStorage.getItem("is_staff") === "true"


    return <section className="section">
    <div className="columns">
    {
        isStaff
        ?
        <div className="column">
            <table className="table is-fullwidth">
            <thead>
                <tr>
                <th>Reactions</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                reactions.map(reaction => (
                    <tr key={reaction.id}>
                    <td>{reaction.label}</td>
                    <td>
                        <div className="buttons">
                        {/* <button className="button is-warning" onClick={() => {}}>edit</button>
                        <button className="button is-danger" onClick={() => {
                            const confirmBox = window.confirm("Do you really want to delete this tag?")
                            if (confirmBox)
                            handleDelete(tag.id)
                          }}>delete</button> */}
                        </div>
                    </td>
                    </tr>
                ))
                }
            </tbody>
            </table>
        </div>
        : ""
    }
    <div className="column">
        <ReactionForm loadReactions={loadReactions}/>
      </div>
    </div>
</section>
}