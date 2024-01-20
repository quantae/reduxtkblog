import "./App.css";
import Counter from "./features/counter/Counter";
import AddPostForm from "./features/post/AddPostForm";
import PostsList from "./features/post/PostsList";
import {
  Route,
  Routes,
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import SinglePostPage from "./features/post/SinglePostPage";
import Navbar from "./features/navbar/Navbar";
import Layout from "./components/layouts/Layout";
import EditPostForm from "./features/post/EditPostForm";
import UserList from "./features/users/UsersLists";
import UserPage from "./features/users/UserPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path="/"
        element={
          <>
            <AddPostForm />
            <PostsList />
          </>
        }
      />
      <Route path="posts/:postId" element={<SinglePostPage />} />
      <Route path="posts/edit/:postId" element={<EditPostForm />} />

      <Route path='user'>
        <Route index element={<UserList />}/>
        <Route path=":userId" element={<UserPage />} />
      </Route>

      {/* Catch all - replace with 404 compoent if you want */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Route>


  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
