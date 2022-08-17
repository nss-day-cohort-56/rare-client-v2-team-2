import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const PostsTable = ({ posts, deleteClickEvent }) => {
  let navigate = useNavigate()
  const [staff, setStaff] = useState(false)

  useEffect(() => {
    let isStaff=localStorage.getItem("is_staff")
    setStaff(isStaff)
  }, [])

  let count = 0

  return <table className="table is-fullwidth">
    <thead>
      <tr>
        <th>Title</th>
        <th>Publication Date</th>
        <th>Category</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        posts.map(post => {
          if(post?.approved !== false) {
          return <tr key={post.id}>
            <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
            <td>{post.publication_date}</td>
            <td>{post.category?.label}</td>
            <td>
              {
                deleteClickEvent ?
                  <div className="buttons">
                    <button className="button is-warning" onClick={() => navigate(`/posts/${post.id}/edit`)}>edit</button>
                    <button className="button is-danger" onClick={() => { deleteClickEvent(post.id) }}>delete</button>
                  </div> : <></>
              }
            </td>
          </tr> 
          }
          else {
            if(staff === 'true') {
              return <tr key={post.id}>
              <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
              <td>{post.publication_date}</td>
              <td>{post.category?.label}</td>
              <td style={{fontStyle: "italic"}}>Needs Approval</td>
              <td>
                {
                  deleteClickEvent ?
                    <div className="buttons">
                      <button className="button is-warning" onClick={() => navigate(`/posts/${post.id}/edit`)}>edit</button>
                      <button className="button is-danger" onClick={() => { deleteClickEvent(post.id) }}>delete</button>
                    </div> : <></>
                }
              </td>
          </tr>
            }
            else {
              count++
            }
          }
        })
      }
      {count === 0 ? "" : <td>You have {count} post(s) awaiting approval.</td>}
    </tbody>
  </table>
}
