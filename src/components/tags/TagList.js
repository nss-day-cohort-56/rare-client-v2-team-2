import { useState, useEffect } from "react"
import { getAllTags } from "../../managers/TagManager"
import { TagForm } from "./TagForm"

export const TagList = () => {
  const [tags, setTags] = useState([])

  const loadTags = () => {
    getAllTags().then(tagsData => setTags(tagsData))
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
                  <td>Edit</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="column">
        <TagForm loadTags={loadTags} />
      </div>
    </div>
  </section>
}
