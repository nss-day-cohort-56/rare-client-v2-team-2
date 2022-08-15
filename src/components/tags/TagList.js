import { useState, useEffect } from "react"
import { getAllTags, deleteTag } from "../../managers/TagManager"
import { TagForm } from "./TagForm"

export const TagList = () => {
  const [tags, setTags] = useState([])
  const [editTag, setEditTag] = useState({ label: '' })


  const loadTags = () => {
    getAllTags().then(tagsData => setTags(tagsData))
  }

  const handleDelete = (tagId) => {
    deleteTag(tagId).then(loadTags)
  }

  useEffect(() => {
    loadTags()
  }, [])

  return <section className="section">
    <div className="columns">
      <div className="column">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Tags</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              tags.map(tag => (
                <tr key={tag.id}>
                  <td>{tag.label}</td>
                  <td>
                    <div className="buttons">
                      <button className="button is-warning" onClick={() => { setEditTag(tag) }}>edit</button>
                      <button className="button is-danger" onClick={() => { handleDelete(tag.id) }}>delete</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="column">
        <TagForm loadTags={loadTags} tag={editTag} setTag={setEditTag} />
      </div>
    </div>
  </section>
}
