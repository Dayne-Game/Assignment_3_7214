import React, { useState } from 'react'
import { Nav, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'

// Get Posts to display on the Home Page
let GetPosts = (mystate) => {
    fetch('http://localhost:5000/api/posts')
    .then(resp => resp.json())
    .then(post => mystate({posts: post}))
    .catch(e => console.log(e))
}

export default function PostsList() {

    const [remoteData, setData] = useState({ posts: [] })
    GetPosts(setData)

    return (
        <Nav vertical>
            {remoteData.posts.map((p, i) => {

                // Remove # from myPost.title
                var title = p.title.replace('#', '');

                return (
                    <NavItem key={i} className="item-deco">
                        <Link className="nav-link custom-nav-link mb-2" to={{ pathname: '/Post', state: { postID: p._id } }}>{title}</Link>
                    </NavItem>
                )
            })}
        </Nav>
    )
}
