import React, { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem, Button, UncontrolledAlert } from 'reactstrap'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
    }, [props.myID])

    return (
        <ListGroup>
            {remoteData.posts.map((p, i) => {
                if(p.title === `Oops! You Have NO Posts! Get Creating Now!` || p.title === undefined) {
                    return (
                        <ListGroupItem key={i}>
                            {p.title}
                        </ListGroupItem>
                    )
                } else {
                    // Remove # from myPost.title
                    var title = p.title.replace('#', '');
                    return (
                        <ListGroupItem key={i} className="item-deco">
                            <Button onClick={() => DeletePost(p._id)} color="danger" size="sm">&times;</Button>
                            <Link className="posts-link" to={`/UpdatePost/${p._id}`}>{title}</Link>
                        </ListGroupItem>
                    )
                }
            })}
        </ListGroup>
    )
}

// Delete POST METHOD
let DeletePost = (id) => {
    const token = localStorage.getItem('a3_myJwtSecret');
    fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            // Grab current signed in users Token!
            'x-auth-token': localStorage.getItem('token')
        }
    }).then(res => res.json())
    .then(response => {
        alert(`Success: ${response.success}`);
        window.location.reload();
    })
}

export default UsersPosts;