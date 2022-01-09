import { React, Component } from 'react';
import {
  Modal, Button, Form, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import RangeSlider from 'react-bootstrap-range-slider';
import PropTypes from 'prop-types';
import backendServer from '../../webConfig';
import { Redirect } from 'react-router';

class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        errors: [],
        rating: 0,
        workHappinessScore: 0,
        learningScore: 0,
        appreciationScore: 0,
        reviewTitle: '',
        reviewComments: '',
        pros: '',
        cons: '',
        ceoApprovalRating: 0,
        howToPrepare: '',
        reviewerRole: '',
        city: '',
        state: '',
        openModal: false,
        redirectFlag: false,
    };
  }

  findFormErrors = () => {
    const { rating, reviewTitle, workHappinessScore, learningScore, appreciationScore, reviewComments, pros, cons, ceoApprovalRating, reviewerRole, city, state, errors } = this.state;
    if (!reviewTitle || reviewTitle === '') errors.reviewTitle = 'Review title cannot be blank!';
    if (!reviewComments || reviewComments === '') errors.reviewComments = 'Review cannot be blank!';
    if (!rating || rating === 0) errors.rating = ' Please select rating!';
    if (!workHappinessScore || workHappinessScore === 0) errors.workHappinessScore = ' Please select work happiness score!';
    if (!learningScore || learningScore === 0) errors.learningScore = ' Please select learning score!';
    if (!appreciationScore || appreciationScore === 0) errors.appreciationScore = ' Please select appreciation score!';
    if (!pros || pros === '') errors.pros = 'Review pros cannot be blank!';
    if (!cons || cons === '') errors.cons = 'Review cons cannot be blank!';
    if (!ceoApprovalRating || ceoApprovalRating === 0) errors.ceoApprovalRating = 'Please select CEO approval rating!';
    if (!reviewerRole || reviewerRole === '') errors.reviewerRole = 'Reviewer role cannot be blank!';
    if (!city || city === '') errors.city = 'City cannot be blank!';
    if (!state || state === '') errors.state = 'State cons be blank!';
    return errors;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.setState({
      errors: {},
    });
  }

  onStarClick = (rating) => {
      this.setState({rating: rating});
      this.setState({
        errors: {},
      });
  }

  onStarClickCEORating = (rating) => {
    this.setState({ceoApprovalRating: rating});
    this.setState({
      errors: {},
    });
  }
  
  onLearningScoreChange = (e) => {
    this.setState({learningScore: e.target.value});
    this.setState({
      errors: {},
    });
  }

  onWorkHappinessScoreChange = (e) => {
    this.setState({workHappinessScore: e.target.value});
    this.setState({
      errors: {},
    });
  }

  onAppreciationScoreChange = (e) => {
    this.setState({appreciationScore: e.target.value});
    this.setState({
      errors: {},
    });
  }

  closeModal = () => {
    this.setState({ openModal: false });
    //this.setState({redirectFlag: true});
    this.props.closeModal();
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = this.findFormErrors();
    if (Object.keys(newErrors).length > 0) {
    this.setState({
        errors: newErrors,
    });
    } else {
        // To-DO : Get logged in company id
        const companyId = this.props.companyId;
        const jobSeekerId = this.props.jobSeekerId;
        const { rating, reviewTitle, workHappinessScore, learningScore, appreciationScore, reviewComments, pros, cons, ceoApprovalRating, howToPrepare, reviewerRole, city, state } = this.state;
        const inputData = {
            companyId,
            jobSeekerId,
            rating,
            workHappinessScore,
            learningScore,
            appreciationScore,
            reviewTitle,
            reviewComments,
            reviewerRole,
            city,
            state,
            pros,
            cons,
            ceoApprovalRating,
            howToPrepare,
            postedDate : Date().toLocaleString(),

        };
        //console.log(inputData);
        axios.defaults.headers.common['authorization'] = this.props.token;
        axios
        .post(`${backendServer}/saveReview`, inputData)
        .then((response) => {

          if (response.status === 200) {
            
            this.setState({
              successMsg: response.data,
              rating: 0,
              workHappinessScore: 0,
              learningScore: 0,
              appreciationScore: 0,
              reviewTitle: '',
              reviewComments: '',
              pros: '',
              cons: '',
              ceoApprovalRating: 0,
              howToPrepare: '',
              reviewerRole: '',
              city: '',
              state: '',
              openModal: true,
            });

          } else {
            this.setState({ errorMsg: response.data });
          }
        })
        .catch((err) => {
          this.setState({ errorMsg: "Internal Server Error!" });
        });

    }
}

  render() {
    const { addReview, closeModal} = this.props;
    const { openModal, redirectFlag, errors, rating, workHappinessScore, appreciationScore, learningScore, reviewTitle, reviewComments, pros, cons, ceoApprovalRating, howToPrepare, reviewerRole, city, state } = this.state;
    let redirectVar = null;
    if (redirectFlag) {
      redirectVar = <Redirect to={{pathname: "/reviews", flag:true}} />;
    }
    return (
      <>
      {redirectVar}
        <Modal show={addReview} onHide={closeModal} style={{width: '90vw'}}>
          <Modal.Header closeButton>
            <Modal.Title>Enter review details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Row>
              <Col><b>Overall rating</b><span style={{color:'red'}}>*</span></Col>
              <Col>
                <Form.Group className="mb-3">
                <ReactStars
                      count={5}
                      size={25}
                      value={rating}
                      isHalf={true}
                      activeColor="#9d2b6b"
                      onChange={this.onStarClick}
                      isRequired={true}
                    />
                    <span style={{color: "#de404d"}}> { errors.rating }</span>
                </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col><b>Work Happiness Score</b><span style={{color:'red'}}>*</span></Col>
              <Col>
                <Form.Group className="mb-3">
              <RangeSlider
                    value={workHappinessScore}
                    min={0}
                    max={100}
                    onChange={this.onWorkHappinessScoreChange}
                  />
                  <span style={{color: "#de404d"}}> { errors.workHappinessScore }</span>
                  </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col><b>Learning Score</b><span style={{color:'red'}}>*</span></Col>
              <Col>
                <Form.Group className="mb-3">
              <RangeSlider
                    value={learningScore}
                    min={0}
                    max={100}
                    onChange={this.onLearningScoreChange}
                  />
                  <span style={{color: "#de404d"}}> { errors.learningScore }</span>
                  </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col><b>Appreciation Score</b><span style={{color:'red'}}>*</span></Col>
              <Col>
                <Form.Group className="mb-3">
              <RangeSlider
                    value={appreciationScore}
                    min={0}
                    max={100}
                    onChange={this.onAppreciationScoreChange}
                  />
                  <span style={{color: "#de404d"}}> { errors.appreciationScore }</span>
                  </Form.Group>
              </Col>
              </Row>
              <Row>
                <Col><b>CEO Approval rating</b><span style={{color:'red'}}>*</span></Col>
                    <Col>
                    <Form.Group className="mb-3">
                    <ReactStars
                      count={5}
                      size={25}
                      value={ceoApprovalRating}
                      isHalf={true}
                      activeColor="#9d2b6b"
                      onChange={this.onStarClickCEORating}
                    />
                    <span style={{color: "#de404d"}}> { errors.ceoApprovalRating }</span>
                </Form.Group>
                    </Col>
                    </Row>
              <Row>
              <Col><b>Review Title</b><span style={{color:'red'}}>*</span></Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="reviewTitle" type="text" placeholder="Enter Review Summary"
                  className="mr-sm-2" onChange={this.handleChange} value={reviewTitle} isInvalid={!!errors.reviewTitle} maxLength="45"/>
                  <Form.Control.Feedback type="invalid">
                    { errors.reviewTitle }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col><b>Your job role</b><span style={{color:'red'}}>*</span></Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="reviewerRole" type="text" placeholder="Enter your role"
                  className="mr-sm-2" onChange={this.handleChange} value={reviewerRole} isInvalid={!!errors.reviewerRole} maxLength="45"/>
                  <Form.Control.Feedback type="invalid">
                    { errors.reviewerRole }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col><b>City</b><span style={{color:'red'}}>*</span></Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="city" type="text" placeholder="Enter your city"
                  className="mr-sm-2" onChange={this.handleChange} value={city} isInvalid={!!errors.city} maxLength="45"/>
                  <Form.Control.Feedback type="invalid">
                    { errors.city }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col><b>State</b><span style={{color:'red'}}>*</span></Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="state" type="text" placeholder="Enter your city"
                  className="mr-sm-2" onChange={this.handleChange} value={state} isInvalid={!!errors.state} maxLength="45"/>
                  <Form.Control.Feedback type="invalid">
                    { errors.state }
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              <Row>
                <Col><b>Your Review</b><span style={{color:'red'}}>*</span></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="reviewComments" as="textarea" rows={3} className="mr-sm-2" onChange={this.handleChange} value={reviewComments} isInvalid={!!errors.reviewComments} maxLength="255"/>
                  <Form.Control.Feedback type="invalid">
                    { errors.reviewComments }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                <Col><b>Pros</b><span style={{color:'red'}}>*</span></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="pros" as="textarea" rows={3} className="mr-sm-2" onChange={this.handleChange} value={pros} isInvalid={!!errors.pros} maxLength="255"/>
                  <Form.Control.Feedback type="invalid">
                    { errors.pros }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                <Col><b>Cons</b><span style={{color:'red'}}>*</span></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="cons" as="textarea" rows={3} className="mr-sm-2" onChange={this.handleChange} value={cons} isInvalid={!!errors.cons} maxLength="255"/>
                  <Form.Control.Feedback type="invalid">
                    { errors.cons }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                <Col><b>How should I prepare for an interview at this company?</b></Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                  <Form.Control name="howToPrepare" as="textarea" rows={3} className="mr-sm-2" onChange={this.handleChange} value={howToPrepare} isInvalid={!!errors.howToPrepare} maxLength="255"/>
                  <Form.Control.Feedback type="invalid">
                    { errors.howToPrepare }
                  </Form.Control.Feedback>
                </Form.Group>
                    </Col>
                    </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {openModal && (
        <Modal show={openModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Review added successfully!!</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        )}
      </>
    );
  }
}

ReviewModal.propTypes = {
  addReview: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
export default ReviewModal;
