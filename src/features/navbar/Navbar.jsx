import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { increaseCount, getCount } from '../post/postsSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const count = useSelector(getCount)
  return (
    <div>
      <nav>
        <ul>
          <li style={{marginBottom: "1rem"}}><Link to="/">Home</Link></li>
          <li style={{marginBottom: "1rem"}}><Link to="post">Posts</Link></li>
          <li style={{marginBottom: "1rem"}}><Link to="user">Users</Link></li>
<button onClick={() => dispatch(increaseCount())}>{count}</button>
        </ul>

      </nav>
      <Outlet/>
    </div>
  )
}

export default Navbar
