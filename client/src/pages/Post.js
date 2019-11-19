import React, { useState, useEffect, Fragment } from 'react'
import Markdown from 'react-markdown'

export default function Post(props) {
    const [remoteData, setData] = useState({ posts: {} })

    useEffect(() => {
        GetSelectedPost(setData, props.location.state.postID)
    }, [ ])

    return (
        <Fragment>  
            <div id="title">{<Markdown source={remoteData.posts.title} />}</div>
            <div id="author">{<Markdown source={remoteData.posts.author} />}</div>
            <div id="content">{<Markdown source={remoteData.posts.content} />}</div>
        </Fragment>
    )
}

// Get the Selected Post
let GetSelectedPost = async (mystate, id) => {
    await fetch(`http://localhost:5000/api/posts/${id}`)
    .then(resp => resp.json())
    .then(post => mystate({posts: post}))
    .catch(e => console.log(e))
}

