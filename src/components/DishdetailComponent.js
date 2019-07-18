import React, { Component }  from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal,
    ModalBody, ModalHeader, ModalFooter, Row, Label, Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, Errors, LocalForm} from "react-redux-form";
import {maxLength, minLength, required} from "../shared/validations";
import CommentForm from '../components/CommentForm';
import { Loading } from './LoadingComponent';
import {baseUrl} from "../shared/baseUrl";

function RenderDish({ dish }) {
    return (
        <div className="col-md-5 col-xm-12 col-xs-12 m-1">
            <Card>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments, postComment, dishId}){
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
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        </div>
    )
}

const DishDetail = ( props ) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if(props.dish) {
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
                    <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                </div>
            </div>
        )
    }
};

export default DishDetail;
