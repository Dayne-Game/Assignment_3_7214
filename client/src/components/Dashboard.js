import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppNavbar from './AppNavbar'
import { Container, Row, Col, Card, CardTitle, CardText ,Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import UsersPosts from './UsersPosts';

class Dashboard extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    render() {
        const { user } = this.props.auth;

        // This is the Value I want to Pass ( This is the User ID )
        const userID = user ? user._id : '';
        const name = user ? user.name : '';

        return (
            <Fragment>
                <AppNavbar />
                <Container>
                    <Row>
                        <Col sm="9">
                            <div className="dashboard-header">
                                <h3>Welcome to your Dashboard</h3>
                            </div>
                            <div className="mt-3">
                                <UsersPosts myID={userID} />
                            </div>
                        </Col>
                        <Col sm="3">
                            <Card body>
                                <CardTitle><h4>Creating Posts!</h4></CardTitle>
                                <CardText>Want to create a Post in Markdown for everyone to see? Click the Button Below!</CardText>
                                <Link className="btn btn-info" to={`/AddPost/${userID}`}>Create Post</Link>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
 
}

const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(
mapStateToProps,
null
)(Dashboard);
