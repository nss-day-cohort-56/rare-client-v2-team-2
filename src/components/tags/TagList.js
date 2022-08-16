import { useState, useEffect } from "react"
import { getAllTags, deleteTag } from "../../managers/TagManager"
import { TagForm } from "./TagForm"

export const TagList = ({ isStaff }) => {
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

      {isStaff
        ? <div className="column">
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
                        <button className="button is-danger" onClick={() => {
                          const confirmBox = window.confirm("Do you really want to delete this tag?")
                          if (confirmBox)
                            handleDelete(tag.id)
                        }}>delete</button>
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
        <TagForm loadTags={loadTags} tag={editTag} setTag={setEditTag} />
      </div>
    </div>
  </section>
}
