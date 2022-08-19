import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { getSinglePost, updatePost } from "../../managers/PostManager"
import { getAllTags } from "../../managers/TagManager"

export const EditPost = () => {
  const [post, setPost] = useState({})
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [tagsForPost, setTagsForPost] = useState([])
  const { postId } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    getSinglePost(postId).then(data => {
      setPost(data)
      const tagIds = data?.post?.tags.map(t => t.id)
      setTagsForPost(tagIds)
    })
    getAllCategories().then(categoriesData => setCategories(categoriesData))
    getAllTags().then(data => setTags(data))
  }, [postId])

  const updateTags = (tagId, e) => {
    const tagsCopy = [...tagsForPost]
    
    if (e.target.checked) {
      tagsCopy.push(tagId)
    } else {
      const index = tagsCopy.indexOf(tagId)
      tagsCopy.splice(index, 1)
    }
    setTagsForPost(tagsCopy)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    
    let postData = {
      title: post?.post?.title,
      publication_date: post?.post?.publication_date,
      image_url: post?.post?.image_url,
      category_id: post?.post?.category?.id,
      content: post?.post?.content,
      approved: post?.post?.approved,

      tags: tagsForPost
    }

    updatePost(postId, postData).then((post) => {
      navigate(`/posts/${postId}`)
    })
  }

  const handleChange = (event) => {
    const postCopy = { ...post }
    postCopy[event?.target?.name] = event.target.value
    setPost(postCopy)
  }


  return (
    <section className="section">
      <article className="panel is-info">
        <h2 className="panel-heading">Update post</h2>
        <div className="panel-block">
          <form style={{ width: "100%" }}>
            <div className="field">
              <label htmlFor="title" className="label">Title: </label>
              <div className="control">
                <input type="text" name="title" required autoFocus className="input"
                  placeholder="Title"
                  defaultValue={post?.post?.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="image_url" className="label">Image URL: </label>
              <div className="control">
                <div className="control">
                <input type="file" id="post_image" onChange={handleChange} />
                <input type="hidden" name="post_id" value={post.id} />
                
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="content" className="label">Content: </label>
              <div className="control">
                <div className="control">
                  <textarea
                    className="textarea"
                    name="content"
                    defaultValue={post?.post?.content}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="category" className="label">Category: </label>
              <div className="control">
                <div className="select">
                  <select name="category_id"
                  defaultValue={(post.category_id)}
                  onChange={handleChange}>
                  <option value="0">Select a category</option>
                  {
                    categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))
                  }
                </select>

                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="content" className="label">Tags:</label>
              {
                tags.map(tag => (
                  <div className="field" key={`tag--${tag.id}`}>
                    <div className="control">
                      <label className="checkbox" htmlFor={tag.label}>
                        <input type="checkbox" name={tag.label}
                          checked={tagsForPost.includes(tag.id)}
                          onChange={(e) => {
                            updateTags(tag.id, e)
                          }} />
                        {tag.label}
                      </label>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="field">
              <div className="control">
                <button type="submit"
                  onClick={handleSubmit}
                  className="button is-success">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </article>
    </section>
  )
}
