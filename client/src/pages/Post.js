import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'

export default function Post(props) {
    const [remoteData, setData] = useState({ posts: {} })

    useEffect(() => {
        GetSelectedPost(setData, props.location.state.postID)
    }, [ ])

    return (
        <div className="post-container">
            <Link to='/' className="go-back-link">Go Back</Link>
            <div className="post">
                <div className="title-box">
                    <div className="post-title">{<Markdown source={remoteData.posts.title} />}</div>
                    <div className="post-author">{<Markdown source={remoteData.posts.author} />}</div>
                    <span></span>
                </div>
                <div className="article-container">{<Markdown source={remoteData.posts.content} />}</div>
            </div>
        </div>
    )
}

// Get the Selected Post
let GetSelectedPost = async (mystate, id) => {
    await fetch(`http://localhost:5000/api/posts/${id}`)
    .then(resp => resp.json())
    .then(post => mystate({posts: post}))
    .catch(e => console.log(e))
}
