import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppNavbar from './AppNavbar'
import { Container, Row, Col } from 'reactstrap'
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

        return (
            <Fragment>
                <AppNavbar />
                <Container>
                    <Row>
                        <Col sm="8">
                            <h3>Left Column</h3>
                        </Col>
                        <Col sm="4">
                            <UsersPosts myID={userID} />
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
