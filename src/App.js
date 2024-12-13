import Blog from "./pages/Blog";
import BlogView from "./pages/BlogView";
import BlogAdd from "./pages/BlogAdd";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // <Blog />

    <Router>
    <Routes>
      <Route path="/" element={<Blog />} />
      <Route path="/posts/:id" element={<BlogView />} />
      <Route path="/posts/add" element={<BlogAdd />} />

    </Routes>
  </Router>
  );
}

export default App;
