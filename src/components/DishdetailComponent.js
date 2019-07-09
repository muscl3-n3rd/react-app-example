import React  from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                        <RenderComments comments={props.comments} />
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
