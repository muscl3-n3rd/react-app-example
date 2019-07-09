import React,  { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';
class Header extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return(
            <React.Fragment>
                <Navbar dark>
                    <div className="container">
                        <NavbarBrand href="/">Ristorante confunsion</NavbarBrand>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className='Container'>ç
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fundion</h1>
                                <p> We take inspiration from the world's best cuisines</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        )
    }
}

export default Header;