import { useState } from "react"
import { createTag } from "../../managers/TagManager"

export const TagForm = ({ loadTags, initialTag = { label: '' } }) => {

  const [tag, setTag] = useState(initialTag)

  const saveTagEvent = (event) => {
    event.preventDefault()

    createTag(tag)
      .then((data) => {
        loadTags(data)
        setTag({ label: '' })
      })
  }

  return (
    <form>
      <div className="field">
        <label className="label">New Tag:</label>
        <div className="control">

          <input
            required
            type="text"
            className="input"
            value={tag.label}
            onChange={
              (evt) => {
                const copy = { ...tag }
                copy.label = evt.target.value
                setTag(copy)
              }
            } />
        </div>
      </div>
      <button
        onClick={(evt) => saveTagEvent(evt)}
        className="button is-primary">
        Save
      </button>
    </form>
  )
}
