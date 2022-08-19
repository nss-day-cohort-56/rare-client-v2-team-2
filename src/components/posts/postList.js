import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/CategoryManager"
import { getAllPosts, getPostsByCategory, getPostsByTag, getPostsByTitle, getPostsByUser } from "../../managers/PostManager"
import { getAllTags } from "../../managers/TagManager"
import { getAllUsers } from "../../managers/UserManager"
import { PostsTable } from "./PostsTable"


export const PostList = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFiltered] = useState([])
  const [chosenCat, setChosenCategory] = useState(0)
  const [categoryList, setCategories] = useState([])
  const [chosenUser, setChosenUser] = useState(0)
  const [userList, setUsers] = useState([])
  const [searchTerms, setSearchTerms] = useState("")
  const [chosenTag, setChosenTag] = useState(0)
  const [tagList, setTagList] = useState([])

  const loadPosts = () => getAllPosts().then(data => setPosts(data))
  const loadUsers = () => getAllUsers().then(data => setUsers(data))
  const loadCategories = () => getAllCategories().then(data => setCategories(data))
  const loadTags = () => getAllTags().then(data => setTagList(data))

  useEffect(() => {
    loadPosts()
    loadUsers()
    loadCategories()
    loadTags()
  }, [])

  useEffect(
    () => {
        if(chosenCat === 0) {
            setFiltered(posts)
        }
        else {
            getPostsByCategory(chosenCat)
                .then((data) => {
                    setFiltered(data)
                })
        }
    },
    [chosenCat, posts]
)

useEffect(
  () => {
      if(chosenTag === 0) {
          setFiltered(posts)
      }
      else {
          getPostsByTag(chosenTag)
              .then((data) => {
                  setFiltered(data)
              })
      }
  },
  [chosenTag, posts]
)

useEffect(
    () => {
        if(chosenUser === 0) {
            setFiltered(posts)
        }
        else {
            getPostsByUser(chosenUser)
                .then((data) => {
                    setFiltered(data)
                })
        }
    },
    [chosenUser, posts]
)

useEffect(
    () => {
        if (searchTerms !== "") {
            getPostsByTitle(searchTerms).then(data => setFiltered(data))
        } 
        else {
            setFiltered(posts)
        }
    },
    [searchTerms, posts]
)

  return <section className="section">
    <article className="panel is-info">
      <p className="panel-heading">
        Posts
      </p>

      <select className="categoryFilter" onChange={(event) => {
                            let chosenCategory = event.target.value
                            setChosenCategory(parseInt(chosenCategory))
                        }}>
        <option value="0">Filter by Category...</option>
        {categoryList.map(category => {
            return <option value={`${category.id}`}>{category.label}</option>
        })}
            </select>
            <select className="userFilter" onChange={(event) => {
                            let chosen = event.target.value
                            setChosenUser(parseInt(chosen))
                        }}>
        <option value="0">Filter by User...</option>
        {userList.map(user => {
            return <option value={`${user.id}`}>{user?.user?.username}</option>
        })}
            </select>
        <select className="tagFilter" onChange={(event) => {
                            let chosenT = event.target.value
                            setChosenTag(parseInt(chosenT))
                        }}>
        <option value="0">Filter by Tag...</option>
        {tagList.map(tag => {
            return <option value={`${tag.id}`}>{tag.label}</option>
        })}
            </select>
        <div className="searchBar">
            <input 
                type="text" 
                placeholder="Input Title or Keyword..."
                onChange={
                    (changeEvent) => {
                        let search = changeEvent.target.value
                        setSearchTerms(search)
                    }
                }
                />
        </div>

      <div className="panel-block">
        <PostsTable posts={filteredPosts} />
      </div>
    </article>
  </section>
}
