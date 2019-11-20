import React, { useEffect, useState, Fragment } from 'react'
import { Button, Container, Row, Col, Label, Input,  Form, FormGroup} from 'reactstrap'
import Markdown from 'react-markdown';
import ReactDOM from 'react-dom'
import AppNavbar from './AppNavbar'

export default function UpdatePost(props) {

    const {id} = props.match.params
    console.log(id);

    const [ remoteData, setData ] = useState({ posts: {} })

    useEffect(() => {
        GetSelectedPost(setData, id)
    }, [])

    return (
        <Fragment>
            <AppNavbar />
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Form>
                            <FormGroup>
                                <Label for="title">Post Title</Label>
                                <Input type="text" name="title" id="postTitle" placeholder="# My Title!" defaultValue={remoteData.posts.title} onInput={() => MarkdownToHTML('postTitle', 'post-title')} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Your Name (Author)</Label>
                                <Input type="text" name="author" id="postAuthor" placeholder="John Doe" defaultValue={remoteData.posts.author} onInput={() => MarkdownToHTML('postAuthor', 'post-author')} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Post Content</Label>
                                <Input type="textarea" rows="20" name="content" id="postContent" defaultValue={remoteData.posts.content} placeholder="This is my first posts YAY!" onInput={() => MarkdownToHTML('postContent', 'content-box')} />
                            </FormGroup>
                            <Button type="submit" block onClick={() => UpdateSelectedPost('postTitle', 'postAuthor', 'postContent', id)}>Submit</Button>
                        </Form>
                    </Col>
                    <Col>
                        <div className="preview-container">
                            <div className="preview">
                                <div className="post-title-box">
                                    <div id="post-title"></div>
                                    <div id="post-author"></div>
                                    <span className="post-title-box-span"></span>
                                </div>
                                <div id="content-box"></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

let MarkdownToHTML = (input, output) => {
    var content = document.getElementById(`${input}`).value
    ReactDOM.render(<Markdown source={content} />, document.getElementById(`${output}`));
}

let dayne = (title) => {
    var t = document.getElementById(`${title}`).value
    console.log(t)
}

// Get the Selected Post
let GetSelectedPost = async (mystate, id) => {
    await fetch(`http://localhost:5000/api/posts/${id}`)
    .then(resp => resp.json())
    .then(post => mystate({posts: post}))
    .catch(e => console.log(e))
}

let UpdateSelectedPost = (postTitle, postAuthor, postContent, pid) => {
    var post_title = document.getElementById(`${postTitle}`).value;
    var post_author = document.getElementById(`${postAuthor}`).value;
    var post_content = document.getElementById(`${postContent}`).value;

    fetch(`http://localhost:5000/api/posts/${pid}`, {
        method: 'PUT',
        body: JSON.stringify({ title: post_title, author: post_author, content: post_content }),
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
    }).then(res => res.json())
    .then(response => {
        alert(`Success: ${response.success}`);
    })
    .catch(error => console.error('Error:', error));
}
