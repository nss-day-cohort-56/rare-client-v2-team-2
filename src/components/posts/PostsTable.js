import { Link, useNavigate } from "react-router-dom"

export const PostsTable = ({ posts, deleteClickEvent }) => {
  let navigate = useNavigate()

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
        })
      }
    </tbody>
  </table>
}
