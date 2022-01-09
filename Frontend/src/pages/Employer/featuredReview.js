//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Button, Row, Col, Card, Container,
  } from 'react-bootstrap';
  import ReactStars from "react-rating-stars-component";
import backendServer from '../../webConfig';
import '../../style/button-group.css';
import { FaCheckCircle } from 'react-icons/fa';
import Pagination from "./../JobSeeker/Pagination";
import EmployerNavbar from './EmployerNavbar';


class Reviews extends Component {
    constructor(props) {
      super(props);
      this.state = {
        reviewDetails: [],
        successMsg: '',
        totalPosts: 0,
      };
    }
    
    componentDidMount() {
        // To-DO : Get company id from store
        const companyId = this.props.company.compid;
        console.log(this.props.company);
        let { reviewDetails } = this.state;
        const currentPage = 1;
        reviewDetails = [];
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.get(`${backendServer}/allCompanyReviews`, {
          params: {
            companyId,
          },
        })
          .then((response) => {
            this.setState({
                //reviewDetails: reviewDetails.concat(response.data),
                totalPosts: response.data.length,
              });
          });

          axios.get(`${backendServer}/allCompanyReviewsPaginated`, {
            params: {
              companyId,
              currentPage,
            },
          })
            .then((response) => {
              this.setState({
                  reviewDetails: reviewDetails.concat(response.data),
                });
            });
      }

      paginate = (pageNumber) => {
        let currentPage = pageNumber;
        const companyId = this.props.company.compid;
        let { reviewDetails } = this.state;
        reviewDetails = [];
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.get(`${backendServer}/allCompanyReviewsPaginated`, {
          params: {
            companyId,
            currentPage,
          },
        })
          .then((response) => {
            this.setState({
                reviewDetails: reviewDetails.concat(response.data),
              });
          });
      }

      handleSubmit = (e, reviewId) => {
        
        const { reviewDetails } = this.state;
        const index = reviewDetails.findIndex((review) => review.reviewId === reviewId);
        const reviews = [...reviewDetails];
        const inputData = {
          reviewId: reviews[index].reviewId,
        }
        reviews[index].isFeatured = 1;
        this.setState({reviewDetails : reviews});
        console.log(inputData);
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios
          .post(`${backendServer}/updateFeaturedReview`, inputData)
          .then((response) => {
            if (response.status === 200) {
              this.setState({ successMsg: response.data });
            } else {
              this.setState({ errorMsg: response.data });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }

    render() {
      // To-DO Fetch logged in userid from store
        const { reviewDetails, totalPosts } = this.state;
        console.log(reviewDetails);
       
        const reviewsDisplay = reviewDetails.map((review) => (
          <div>
            <Card style={{ width: '60rem', margin: '0.8em' }}>
              <Card.Body>
                <Row>
                <Col xs={2}>
                <Card.Title>
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
                  <b>{review.reviewTitle}</b>{' '}{review.isFeatured && <span style={{color:'green'}}><b>Featured<FaCheckCircle /></b></span>}
                  {' '}{!review.isFeatured && 
                  <Button onClick={(e) => { this.handleSubmit(e, review.reviewId)}} style={{backgroundColor:'white', color:'green', border: '1px solid gray'}}><b>Mark as featured</b></Button>}
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
           <EmployerNavbar />
            <br></br>
            <Container style={{ display: 'flex', justifyContent: 'center' }}>
            
            <Card style={{ width: '60rem', margin: '0.8em', background:'whitesmoke' }}>
            <Card.Title>
              <br />
               <Row>
                 <Col> <h4>Reviews added by jobseekers</h4>
                 </Col>
                </Row>
            </Card.Title>
              </Card>
              </Container>
              <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {reviewsDisplay}
              </Container>
              <Container style={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination postsPerPage={5} totalPosts={totalPosts} paginate={this.paginate}/>
              </Container>
        </div>
      );
    }
  }
  const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    company: state.company
  })
  
  export default connect(mapStateToProps)(Reviews);