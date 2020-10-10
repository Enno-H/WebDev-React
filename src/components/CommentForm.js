import React, {Component} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form'


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

export default CommentForm
