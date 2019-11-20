import React, {Fragment} from 'react'
import { 
    Container,
    Row,
    Col
} from 'reactstrap';

import AppNavbar from '../components/AppNavbar'
import PostsList from '../components/PostsList'

export default function Home() {
    return (
        <Fragment>
            <AppNavbar />
            <Container>
                <div className="header-panel">
                    <h1>My Blog Website!</h1>
                </div>
                <Row>
                    <Col sm="8" className="mt-3">
                        <p>To start creating Posts you will need to Register! When you register you will have access to your Dashboard where you can create and edit your posts!</p>
                        <h3>Markdown Syntax!</h3>
                        <p>When creating posts on this website you will need to write in Markdown. Markdown converts what ever you have written into HTML format so you can easily view it on the website!</p>
                        <p>Markdown is very simple to use and get the hang of, you should be able to master Markdown in 30min. Here is a link to a Markdown Cheatsheet where you can see what syntax does what in Markdown</p>
                        <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank" rel="noopener noreferrer">Markdown Cheetsheet</a>
                    </Col>
                    <Col sm="4" className="mt-3">
                        <h3>Get Reading!</h3>
                        <PostsList />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
