import React, { useState, useEffect } from "react";
import axios from "axios";

import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import "./styles.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  console.log(posts);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage; //1*10, 2*10, 3*10
  const indexOfFirstPost = indexOfLastPost - postsPerPage; //10-10, 20-10, 30-10
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); //(0,10), (10,20), (20,30)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Pagination App</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
