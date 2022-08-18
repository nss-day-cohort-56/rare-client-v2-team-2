import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { TagList } from "../components/tags/TagList"
import { CategoriesList } from "../components/categories/CategoriesList"
import { MyPost } from "../components/posts/MyPost"
import { PostDetails } from "../components/posts/PostDetails"
import { PostForm } from "../components/posts/PostForm"
import { PostList } from "../components/posts/postList"
import { EditPost } from "../components/posts/EditPost"
import { CommentForm } from "../components/comments/CommentForm"
import { CommentsList } from "../components/comments/CommentList"
import { Users } from "../components/users/UserList"
import { UserDetail } from "../components/users/UserDetail"
import { AuthorDetails } from "../components/authors/AuthorDetails"
import { UserEdit } from "../components/users/UserEdit"
import { CommentEdit } from "../components/comments/CommentEdit"
import { DeactivatedUsers } from "../components/users/DeactivatedList"
import { HomePage } from "../components/home/HomePage"
import { ReactionList } from "../components/reactions/ReactionList"



export const ApplicationViews = ({ isStaff, token, setToken, setUserId, userId, isActive }) => {
  return <Routes>
    
    <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />} />
    <Route path="/register" element={<Register setToken={setToken} setUserId={setUserId} />} />
    <Route element={<Authorized token={token} isActive={isActive} />}>
      {/* Add Routes here */}
      <Route path="" element={<HomePage />} />
      <Route path="/reactions" element={<ReactionList />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/my-posts" element={<MyPost />} />
      <Route path="/posts/create" element={<PostForm />} />
      <Route path="/posts/:postId/edit" element={<EditPost />} />
      <Route path="/authors/:authorId" element={<AuthorDetails />} />
      <Route path="/posts/:postId/comments" element={<CommentsList userId={userId} />} />
      <Route path="/posts/:postId" element={<PostDetails userId={userId} />} />
      <Route path="/posts/:postId/add-comment" element={<CommentForm />} />
      <Route path="/posts/:postId/comments/:commentId/edit" element={<CommentEdit />} />
      <Route path="/users/:userId" element={<UserDetail />} />
      {
          isStaff === true
            ? <>
              <Route path="/users">
                <Route index element={<Users />} />
                <Route path=":userId" element={<UserDetail />} />
                <Route path=":userId/edit" element={<UserEdit />} />
              </Route>
              <Route path="/deactivated" element={<DeactivatedUsers />} />
              <Route path="/categories" element={<CategoriesList />} />
              <Route path="/tags" element={<TagList />} />
              </>
            : <Route path="/users" element={<Navigate to="/posts" replace />} />
        }
    </Route>
  </Routes>
}
