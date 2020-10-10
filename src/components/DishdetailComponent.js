import React, {Component} from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Row,
    Label, Button} from "reactstrap";
import {Link} from "react-router-dom"
import {Control, Errors, LocalForm} from "react-redux-form";

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
                <CommentForm/>
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
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}/>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isModalOpen: false
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group pl-3 pr-3'>
                                <Label htmlFor='rating'>Rating</Label>
                                <Control.select model=".rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>

                            <Row className='form-group pl-3 pr-3'>
                                <Label htmlFor='author'>Name</Label>
                                <Control.text model='.author'
                                              id="author"
                                              name="author"
                                              placeholder="Enter Your Name"
                                              className="form-control"
                                              validators={{
                                                  required,
                                                  minLength: minLength(3),
                                                  maxLength: maxLength(15)
                                              }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show='touched'
                                    messages={{
                                        required: "Required ",
                                        minLength: " Must be greater than 2 characters",
                                        maxLength: " Must be less than 15 characters"
                                    }}
                                />
                            </Row>
                            <Row className="form-group row pl-3 pr-3">
                                <Label htmlFor='message'>Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                                  rows="6" className='form-control'
                                />
                            </Row>
                            <Button color="primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <div>
                    <Button color="secondary" outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"/>&nbsp;
                        Submit Button
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}


export default Dishdetail;