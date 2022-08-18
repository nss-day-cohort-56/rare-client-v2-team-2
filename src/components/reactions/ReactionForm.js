import { useState } from "react"
import { createReaction } from "../../managers/ReactionManager"

export const ReactionForm = ({loadReactions}) => {

    const [reaction, setReaction] = useState({
        reaction_id: "",
        label: "",
        image_url: ""
    })

    const saveReactionEvent = (event) => {
        event.preventDefault()
        createReaction(reaction).then((data) => {
            loadReactions(data)
        })
    }




    return (
        <form>
        <div className="field">
            <label className="label">New Reaction:</label>
            <div className="control">
            <label htmlFor="title" className="label">Title: </label>
            <input
                required
                type="text"
                className="input"
                value={reaction.label}
                onChange={
                (evt) => {
                    const copy = { ...reaction }
                    copy.label = evt.target.value
                    setReaction(copy)
                }
                } />
                <label htmlFor="title" className="label">Image URL: </label>
                <input
                required
                type="text"
                className="input"
                value={reaction.image_url}
                onChange={
                (evt) => {
                    const copy = { ...reaction }
                    copy.image_url = evt.target.value
                    setReaction(copy)
                }
                } />
            </div>
        </div>
        <button
            onClick={(evt) => saveReactionEvent(evt)}
            className="button is-primary">
            Save
            </button>
        <button
        onClick={loadReactions}
            className="button is-warning">
            Cancel
        </button>
        </form>
    )
}
