import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectAllPosts, selectPostsByUser } from "../post/postsSlice";
import { Link, useParams } from "react-router-dom";


const UserPage = () => {

    const { userId } = useParams();
    const user = useSelector(state => selectUserById(state, Number(userId)));
// we repalce postForUser
    // const postForUser = useSelector(state => {
    //     const allPosts = selectAllPosts(state);
    //     return allPosts.filter(post => post.userId === Number(userId));
    // })

    const postForUser = useSelector(state => selectPostsByUser(state, Number(userId)))



    const postTitles = postForUser.map(post => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ))
    return (
<>
    <section>
        <h2>{user.name}</h2>
        <ul>{postTitles}</ul>
    </section>
</>
    )
}

export default UserPage;