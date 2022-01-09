//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import {
    Row, Col, Card, Container
  } from 'react-bootstrap';
  import { Link } from 'react-router-dom';
  import ReactStars from "react-rating-stars-component";
import backendServer from '../../webConfig';
import '../../style/button-group.css';
import Pagination from "./../JobSeeker/Pagination";
import JobSeekerLoggedInNavbar from './JobSeekerLoggedInNavbar';
import { withRouter } from 'react-router-dom';

class ReviewProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        reviewDetails: [],
        totalPosts: 0,
        noReviewsMsg: ''
      };
    }
    
    componentDidMount() {
        // To-DO : Get selected company id
    
        const jobSeekerId = this.props.userInfo.id;
        console.log("User id : "+jobSeekerId);
        let { reviewDetails } = this.state;
        const currentPage = 1;
        reviewDetails = [];
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.get(`${backendServer}/reviewsByProfile`, {
          params: {
            jobSeekerId,
          },
        })
          .then((response) => {
            console.log("response.data.length"+response.data.length);
            this.setState({
                //reviewDetails: reviewDetails.concat(response.data),
                totalPosts: response.data.length,
              });
          });

          axios.get(`${backendServer}/reviewsByProfilePaginated`, {
            params: {
              jobSeekerId,
              currentPage,
            },
          })
            .then((response) => {
              if(response.status === 200){
                this.setState({
                    reviewDetails: reviewDetails.concat(response.data),
                    noReviewsMsg: ''
                  });
                }
            })
            .catch((error) => {
              this.setState({
                noReviewsMsg: 'No reviews available',
              });
          });
      }

      handleCompanyLink = (e, companyId, companyName)  => {
        const payload1 = companyName;
        this.props.companyName(payload1);
        const payload2 = companyId;
        this.props.companyId(payload2);
      }

      paginate = (pageNumber) => {
        let currentPage = pageNumber;
        const jobSeekerId = this.props.userInfo.id;
          let { reviewDetails } = this.state;
          reviewDetails = [];
          axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
          axios.get(`${backendServer}/reviewsByProfilePaginated`, {
            params: {
              jobSeekerId,
              currentPage,
            },
          })
            .then((response) => {
              this.setState({
                  reviewDetails: reviewDetails.concat(response.data),
                  noReviewsMsg: ''
                });
            })
            .catch((error) => {
              this.setState({
                noReviewsMsg: 'No reviews available',
              });
          });
      }

    render() {
      // To-DO Fetch logged in userid from store
        const { reviewDetails, totalPosts, noReviewsMsg } = this.state;
        const userReviews = reviewDetails.map((review) => (
            <div>
              <Card style={{ width: '60rem', margin: '0.8em' }}>
                <Card.Body>
                  <Row>
                  <Col xs={2}>
                  <Card.Title>
                    <b>{review.companyName}</b>
                    <br></br>
                    <b>{review.rating}</b>
                    <ReactStars
                      count={5}
                      size={15}
                      value={review.rating}
                      isHalf={true}
                      activeColor="#9d2b6b"
                      edit={false}
                    />
                  </Card.Title>
                  </Col>
                  <Col xs={8}>
                  <Card.Title>
                  <Link style={{color:'#2457a7', textDecoration: 'none'}} to="/reviews" onClick={(e) => { this.handleCompanyLink(e, review.companyId, review.companyName) }}><b>{review.reviewTitle}</b>
                  </Link>
                  {review.adminReviewStatus === 'APPROVED' && <span style={{color:"green"}}>{' '}[Admin approved]</span>}
                  {review.adminReviewStatus === 'PENDING_APPROVAL' && <span style={{color:"orange"}}>{' '}[Admin approval pending]</span>}
                  {review.adminReviewStatus === 'REJECTED' && <span style={{color:"red"}}>{' '}[Admin rejected]</span>}
                  </Card.Title>
                  <Card.Text>
                    <small>{review.reviewerRole}{' - '}{review.city}{', '}{review.state}{' - '}{new Date(review.postedDate).toDateString()}</small>
                  </Card.Text>
                  <Card.Text>
                  {review.reviewComments}
                  </Card.Text>
                  <Card.Text>
                  <b>Pros</b><br />
                  {review.pros}<br />
                  <b>Cons</b><br />
                  {review.cons}<br />
                  </Card.Text>
                  </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          ));
      return (
        <div>
            <JobSeekerLoggedInNavbar />
              {noReviewsMsg !== '' && 
              <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Card style={{ width: '60rem', margin: '0.8em' }}>
                <Card.Title>
                <Row><Col>{noReviewsMsg}</Col></Row>
                </Card.Title>
              </Card>
              </Container>}
              <h4>My reviews</h4>
              <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              <br/>
              { noReviewsMsg === '' && userReviews}
              </Container>
              <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {noReviewsMsg === '' && <Pagination postsPerPage={5} totalPosts={totalPosts} paginate={this.paginate}/>}
              </Container>
        </div>
      );
    }
  }
  const mapDispatchToProps = (dispatch) => {
    console.log('dispatching props')
    return {
      companyName: (payload) => {
        dispatch({ type: 'setCompName', payload })
      },
      companyId: (payload) => {
        dispatch({ type: 'setCompId', payload })
      },
    }
  }

  const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withRouter(ReviewProfile))