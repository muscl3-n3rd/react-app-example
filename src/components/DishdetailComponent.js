import React  from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


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

    function RenderComments({comments}){
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

    const DishDetail = ( props ) => {
        if(props.dish) {
            return (
                <div className="row">
                    <RenderDish dish ={props.dish} />
                    <RenderComments comments={props.dish.comments} />
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }



export default DishDetail;
