import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { createPost, getPostById, updatePost } from "../../managers/PostManager"
import { getAllTags } from "../../managers/TagManager"

export const PostForm = () => {
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [post, setPost] = useState({})
  const [tagsForPost, setTagsForPost] = useState([])
  let navigate = useNavigate()
  const [staff, setStaff] = useState(false)
  const [ postImage, setImage] = useState("")

  useEffect(() => {
    let isStaff=localStorage.getItem("is_staff")
    setStaff(isStaff)
  }, [])

  useEffect(() => {
    getAllCategories().then(categoriesData => setCategories(categoriesData))
    getAllTags().then(tagsData => setTags(tagsData))
  }, [])


  const updateTags = (tagId) => {
    let tagsCopy = [...tagsForPost]
    const index = tagsCopy.indexOf(tagId)
    if (index < 0) {
      tagsCopy.push(tagId)
    } else {
      tagsCopy.splice(index, 1)
    }
    setTagsForPost(tagsCopy)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const postData = {
      ...post,
      tags: tagsForPost
    }

    createPost(postData).then((post) => {
      if(staff === true) {
        navigate(`posts/${post.id}`)
      }
      else {
        navigate(`/my-posts`)
      }
    })
  }

  const handleChange = (event) => {
    const newPost = { ...post }
    newPost[event.target.name] = event.target.value
    setPost(newPost)
  }

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}

const createPostImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
        console.log("Base64 of file is", base64ImageString);
        let copy = {...post}
        copy.image_url = base64ImageString
        setPost(copy)
        // Update a component state variable to the value of base64ImageString
    });
}
  

  return (
    <section className="section">
      <article className="panel is-info">
        <h2 className="panel-heading">Create post</h2>
        <div className="panel-block">
          <form style={{ width: "100%" }}>
            <div className="field">
              <label htmlFor="title" className="label">Title: </label>
              <div className="control">
                <input type="text" name="title" required className="input"
                  placeholder="Title"
                  value={post.title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="image_url" className="label">Image URL: </label>
              <div className="control">
                <div className="control">
                <input type="file" id="post_image" onChange={createPostImageString} />
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
                    value={post.content}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="category_id" className="label">Category: </label>
              <div className="control">
                <div className="select">
                  <select name="category_id"
                    value={parseInt(post.category_id)}
                    onChange={handleChange}>
                    <option value="0">Select a category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="content" className="label">Tags: </label>
              {
                tags.map(tag => {
                  return (
                    <div className="field" key={`tag--${tag.id}`}>
                      <div className="control">
                        <label className="checkbox" htmlFor={tag.label}>
                          <input type="checkbox" name={tag.label}
                            checked={tagsForPost.includes(tag.id)}
                            onChange={() => {
                              updateTags(tag.id)
                            }} />
                          {tag.label}
                        </label>
                      </div>
                    </div>
                  )
                })

              }
            </div>
            <div className="field">
              <div className="control">
                <button type="submit"
                  onClick={handleSubmit}
                  className="button is-link">
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
