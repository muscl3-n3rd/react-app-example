import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderDish(dish) {
        return (
            <div className="col-md-5 col-xm-12 col-xs-12 m-1">
                <Card>
                    <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name}/>
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

    renderComments(comments){
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
            </div>
        )
    }

    render(){
        if(this.props.dish) {
            return (
                <div className="row">
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish.comments)}
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
}


export default DishDetail;
