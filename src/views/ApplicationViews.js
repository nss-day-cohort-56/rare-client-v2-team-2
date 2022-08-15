import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Users } from "../components/users/Users"
import { UserDetails } from "../components/users/UserDetails"
import { TagList } from "../components/tags/TagList"
import { CategoriesList } from "../components/categories/CategoriesList"
import { MyPost } from "../components/posts/MyPost"
import {PostDetails} from "../components/posts/PostDetails"
import { PostForm } from "../components/posts/PostForm"
import { PostList } from "../components/posts/postList"
import { EditPost } from "../components/posts/EditPost"
import {CommentForm} from "../components/comments/CommentForm"
import { CommentsList } from "../components/comments/CommentList"



export const ApplicationViews = ({ token, setToken, setUserId, userId }) => {
  return <main className="list">
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />} />
      <Route path="/register" element={<Register setToken={setToken} setUserId={setUserId} />} />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}
        <Route path="/tags" element={<TagList />} />
        <Route path="/users" element={<Users />} />
        <Route path="users/:userId/" element={<UserDetails />} />

        <Route path="/posts" element={<PostList />} />
        <Route path="/my-posts" element={<MyPost />} />
        <Route path="/newpost" element={<PostForm />} />
        <Route path="/editpost/:postId" element={<EditPost />} />

        <Route path="/categories" element={<CategoriesList />} />
        <Route path="posts/:postId/comments" element={<CommentsList />} />
        <Route path="posts/:postId" element={<PostDetails userId={userId} />} />
        <Route path="posts/:postId/add-comment" element={<CommentForm />} />
      </Route>
    </Routes>
  </main>
}
