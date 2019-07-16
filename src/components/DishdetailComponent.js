import React, { Component }  from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal,
    ModalBody, ModalHeader, ModalFooter, Row, Label, Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, Errors, LocalForm} from "react-redux-form";
import {maxLength, minLength, required} from "../shared/validations";

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
       this.toggleModal();
       this.props.addComment(this.props.dishId, values.rating, values.yourName, values.comment)
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

function RenderDish({ dish }) {
    return (
        <div className="col-md-5 col-xm-12 col-xs-12 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments, addComment, dishId}){
    console.log(comments)
    return (
        <div className="col-md-5 col-xm-12 col-xs-12 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {comments && comments.map((comment) => {
                    return (
                        <div  key={comment.id}>
                            <li>
                                <p className="mb-1">{comment.comment}</p>
                                <small className="text-muted">-- {comment.author},
                                    {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'})
                                        .format(new Date(Date.parse(comment.date)))
                                    }
                                </small>
                            </li>
                        </div>
                    )
                })
                }
            </ul>
            <div className="row">
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
        </div>
    )
}

const DishDetail = ( props ) => {
    if(props.dish) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12" >
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish ={props.dish} />
                    <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                </div>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
};

export default DishDetail;
