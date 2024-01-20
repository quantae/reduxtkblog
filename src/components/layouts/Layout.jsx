import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../features/navbar/Navbar";
import AddPostForm from "../../features/post/AddPostForm";
import PostLists from "../../features/post/PostsList";

const Layout = () => {
  return (
    <main className="App">
      <Navbar />
     
    </main>
  );
};

export default Layout;
