import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Button, Container, Row, Col, Label, Input,  Form, FormGroup} from 'reactstrap'
import Markdown from 'react-markdown'
import AddPostNavbar from './AddPostNavbar'

const uuidv4 = require('uuid/v4');

export default function AddPost(props) {
    const {id} = props.match.params

    return (
        <Fragment>
            <AddPostNavbar />
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Form>
                            <FormGroup>
                                <Label for="title">Post Title</Label>
                                <Input type="text" name="title" id="postTitle" placeholder="# My Title!" onInput={() => MarkdownToHTML('postTitle', 'post-title')} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Your Name (Author)</Label>
                                <Input type="text" name="author" id="postAuthor" placeholder="John Doe" onInput={() => MarkdownToHTML('postAuthor', 'post-author')} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Post Content</Label>
                                <Input type="textarea" rows="20" name="content" id="postContent" placeholder="This is my first posts YAY!" onInput={() => MarkdownToHTML('postContent', 'content-box')} />
                            </FormGroup>
                            <Button type="submit" block onClick={() => AddPostToDB('postTitle', 'postAuthor', 'postContent', id)}>Submit</Button>
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

let AddPostToDB = (postTitle, postAuthor, postContent, userID) => {
    var post_title = document.getElementById(`${postTitle}`).value;
    var post_author = document.getElementById(`${postAuthor}`).value;
    var post_content = document.getElementById(`${postContent}`).value;

    console.log(userID)

    fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: JSON.stringify({_id: uuidv4(), uid: userID, title: post_title, author: post_author, content: post_content}),
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
