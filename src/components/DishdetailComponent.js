import React, {Component} from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

class Dishdetail extends Component {
    /*
    Has no local state, and is purely dependent on rendering its view based on the props that is passed on it.
    Acts as a pure presentational component.
     */
    constructor(props) {
        super(props);
    }

    renderComments(comments) {
        if (comments != null)
            return (
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
            )
        else
            return (
                <div></div>
            );
    }

    renderDish(dish) {
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

    render() {
        const dish = this.props.dish;

        if (dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <div className={"col-12 col-md-5 m-1"}>
                            {this.renderDish(dish)}
                        </div>
                        <div className={"col-12 col-md-5 m-1"}>
                            {this.renderComments(dish.comments)}
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            );
        }
    }


}

export default Dishdetail;