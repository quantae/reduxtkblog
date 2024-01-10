import './App.css';
import Counter from "./features/counter/Counter";
import AddPostForm from "./features/post/AddPostForm";
import PostsList from "./features/post/PostsList";

function App() {
  return (
    <main className="App">
      <AddPostForm />
      <PostsList />
      {/* <Counter /> */}
    </main>
  );
}

export default App;
