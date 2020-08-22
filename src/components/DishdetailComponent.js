import React, {Component} from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

class Dishdetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
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

    render() {
        const dish = this.props.selectedDish;

        if (dish != null) {
            return (
                <div className="row">
                    <div className={"col-12 col-md-5 m-1"}>
                        <Card>
                            <CardImg top src={dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className={"col-12 col-md-5 m-1"}>
                        {this.renderComments(dish.comments)}
                    </div>
                </div>
            )
        } else
            return (
                <div></div>
            );
    }


}

export default Dishdetail;