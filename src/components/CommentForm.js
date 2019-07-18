import React, { Component } from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import {Control, Errors, LocalForm} from "react-redux-form";
import { required, maxLength, minLength, isNumber, validEmail } from "../shared/validations";

class CommentForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values){
        alert("Current State is: " + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.yourName, values.comment)
    }

    render(){
        return(
            <div>
                <Button onClick={this.toggleModal} type="submit" color="primary" > Submit Comment </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit a Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row>
                                <Label htmlFor="name" md={2}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                                    defaultValue="1"
                                                    value={this.props.rating}
                                                    className="form-control" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourName" id="yourName" name="yourName"
                                                  placeholder="Your Name" value={this.props.yourName}
                                                  className="form-control" validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".yourName"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 character or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Your Comment</Label>
                                <Col md={12}>
                                    <Control.text model=".comment" id="comment" name="comment" placeholder="Your Comment"
                                                  value={this.props.comment} className="form-control" rows="6" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}} >
                                    <Button type="submit" color="primary" >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>

                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

export default CommentForm;