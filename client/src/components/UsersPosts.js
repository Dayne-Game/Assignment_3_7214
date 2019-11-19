import React, { useState, useEffect } from 'react'
import { Nav, NavItem, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

// Get Posts to display on the Home Page
let GetUsersPosts = async (mystate, id) => {
    await fetch(`http://localhost:5000/api/posts/user/${id}`)
    .then(resp => resp.json())
    .then(post => mystate({posts: post}))
    .catch(e => console.log(e))
}

const UsersPosts = (props) => {

    // Props.myID is userID from the Dashboard Component

    const [ remoteData, setData ] = useState({ posts: [] })
    console.log(props.myID)

    useEffect(() => {
        GetUsersPosts(setData, props.myID)
    }, [])

    return (
        <Nav vertical>
            {remoteData.posts.map((p, i) => {

                if(p.title === "Oops! You Have NO Posts! Get Creating Now!") {
                    return (
                        <NavItem>
                            <p>{p.title}</p>
                        </NavItem>
                    )
                } else {
                    // Remove # from myPost.title
                    var title = p.title.replace('#', '');
                    return (
                        <NavItem key={i} className="item-deco">
                            <Link className="nav-link custom-nav-link mb-2" to={{ pathname: '/Post', state: { postID: p._id } }}>{title}</Link>
                            <Button color="danger" className="mr-2">Delete</Button>
                            <Button color="info">Update</Button>
                        </NavItem>
                    )
                }
            })}
        </Nav>
    )
}

export default UsersPosts;