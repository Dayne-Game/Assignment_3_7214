import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'reactstrap';

export class AddPostNavbar extends Component {

    state = {
        isOpen: false
    };
    
    
    toggle = () => {
    this.setState({
        isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div>
                <Navbar color='dark' dark expand='sm'>
                    <Container fluid={true}>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='mr-auto' navbar>
                                <NavItem>
                                    <NavLink href="/Dashboard">Go Back to Dashboard</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default AddPostNavbar
