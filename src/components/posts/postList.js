import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/CategoryManager"
import { getAllPosts, getPostsByCategory, getPostsByTag, getPostsByTitle } from "../../managers/PostManager"
import { getAllTags } from "../../managers/TagManager"
import { getAllUsers } from "../../managers/UserManager"
import { PostsTable } from "./PostsTable"


export const PostList = () => {
  const [posts, setPosts] = useState([])
  const [chosenCategory, setChosenCategory] = useState(0)
  const [chosenTag, setChosenTag] = useState(0)
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])

  const [chosenUser, setChosenUser] = useState(0)
  const [userList, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const loadPosts = () => getAllPosts().then(data => setPosts(data))

  useEffect(() => {
    loadPosts()
    getAllCategories().then(data => setCategories(data))
    getAllUsers().then(data => setUsers(data))
    getAllTags().then(data => setTags(data))
  }, [])

  useEffect(() => {
    if (chosenCategory) {
      getPostsByCategory(chosenCategory)
        .then((data) => {
          setPosts(data)
        })
    }
  }, [chosenCategory])

  useEffect(() => {
    if (chosenTag) {
      getPostsByTag(chosenTag)
        .then((data) => {
          setPosts(data)
        })
    }
  }, [chosenTag])

  useEffect(() => {
    // if (chosenUser) {
    //   getPostsByUserId(chosenUser)
    //     .then((data) => {
    //       setPosts(data)
    //     })
    // }
  }, [chosenUser])

  useEffect(() => {
    if (searchTerm !== "") {
      getPostsByTitle(searchTerm).then(data => setPosts(data))
    }
  }, [searchTerm])

  return <section className="section">
    <article class="panel is-info">
      <p class="panel-heading">
        Posts
      </p>
      <div class="panel-block">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input className="input"
                  type="text"
                  placeholder="Input Title or Keyword..."
                  onChange={
                    (changeEvent) => {
                      let search = changeEvent.target.value
                      setSearchTerm(search)
                    }
                  }
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class="select">
                  <select onChange={(event) => {
                    let chosenCategoryegory = event.target.value
                    setChosenCategory(parseInt(chosenCategoryegory))
                  }}>
                    <option value="0">Search by Category...</option>
                    {categories.map(category => {
                      return <option value={`${category.id}`}>{category.label}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class="select">
                  <select className="tagFilter" onChange={(event) => {
                    let chosenTag = event.target.value
                    setChosenTag(parseInt(chosenTag))
                  }}>
                    <option value="0">Search by Tag...</option>
                    {tags.map(tag => {
                      return <option value={`${tag.id}`}>{tag.label}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class="select">
                  <select onChange={(event) => {
                    let chosen = event.target.value
                    setChosenUser(parseInt(chosen))
                  }}>
                    <option value="0">Search by User...</option>
                    {userList.map(user => {
                      return <option value={`${user.id}`}>{user.first_name}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <PostsTable posts={posts} />
      </div>
    </article>
  </section>
}
