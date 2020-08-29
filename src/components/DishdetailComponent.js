import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";


function RenderDish({dish}) {
    return (
        <div className={"col-12 col-md-5 m-1"}>
            <Card>
                <CardImg top src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments}) {
    if (comments != null)
        return (
            <div className={"col-12 col-md-5 m-1"}>
                <div>
                    <h4>Comments</h4>
                    <ul className={"list-unstyled"}>
                        {
                            comments.map((comment) => {
                                return (
                                    <li key={comment.id}>
                                        <p className="text-left">{comment.comment}</p>
                                        <p className="text-left">
                                            --{comment.author},
                                            &nbsp;
                                            {new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: '2-digit'
                                            }).format(new Date(comment.date))}
                                        </p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    else
        return (
            <div className={"col-12 col-md-5 m-1"}></div>
        );
}

const Dishdetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.dish.comments}/>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}


export default Dishdetail;