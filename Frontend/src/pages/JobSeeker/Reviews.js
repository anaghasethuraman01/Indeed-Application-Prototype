//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import {
    ButtonGroup, Button, Row, Col, Card, Container, Form,
  } from 'react-bootstrap';
import { FaLongArrowAltDown } from 'react-icons/fa';
  import ReactStars from "react-rating-stars-component";
import backendServer from '../../webConfig';
import '../../style/button-group.css';
import ReviewModal from '../JobSeeker/ReviewModal';
import Pagination from "./../JobSeeker/Pagination";
import CompanyTabs from '../Company/CompanyTabs';
import { RatingView } from 'react-simple-star-rating'

class Reviews extends Component {
    constructor(props) {
      super(props);
      this.state = {
        reviewDetails: [],
        reviewDetailsRatingSort: [],
        reviewDetailsDateSort: [],
        reviewDetailsHelpfulSort: [],
        reviewDetailsRatingFilter: [],
        openModal: false,
        rateSortFlag: false,
        dateSortFlag: false,
        helpfulSortFlag: false,
        filterFlag: false,
        totalPosts: 0,
        totalPostsFilter : 0,
        ratingSel: '',
        noReviewsMsg: ''
      };
    }
    
    componentDidMount() {
        // To-DO : Get selected company id
        
        const companyId = this.props.company.compid;
        const jobSeekerId = this.props.userInfo.id;
        console.log("company id : "+companyId);
        console.log("User id : "+jobSeekerId);
        let { reviewDetails } = this.state;
        const currentPage = 1;
        reviewDetails = [];
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.get(`${backendServer}/companyReviews`, {
          params: {
            companyId,
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
          axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
          axios.get(`${backendServer}/companyReviewsPaginated`, {
            params: {
              companyId,
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

      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
        if(e.target.value === ''){
          this.setState({filterFlag: false});
        }
      }

      paginate = (pageNumber) => {
        let currentPage = pageNumber;
        const companyId = this.props.company.compid;
        const jobSeekerId = this.props.userInfo.id;
        const { rateSortFlag, dateSortFlag, helpfulSortFlag, filterFlag, ratingSel } = this.state;
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        if(rateSortFlag){
          let { reviewDetailsRatingSort } = this.state;
          reviewDetailsRatingSort = [];
          axios.get(`${backendServer}/companyReviewsRatingSort`, {
            params: {
            companyId,
            jobSeekerId,
            currentPage,
          },
        })
          .then((response) => {
            this.setState({
              reviewDetailsRatingSort: reviewDetailsRatingSort.concat(response.data),
              noReviewsMsg: ''
              });
          })
          .catch((error) => {
            this.setState({
              noReviewsMsg: 'No reviews available',
            });
        });
        }
        else if(dateSortFlag){
          let { reviewDetailsDateSort } = this.state;
          reviewDetailsDateSort = [];
          axios.get(`${backendServer}/companyReviewsDateSort`, {
            params: {
            companyId,
            jobSeekerId,
            currentPage,
          },
        })
          .then((response) => {
            this.setState({
              reviewDetailsDateSort: reviewDetailsDateSort.concat(response.data),
              noReviewsMsg: ''
              });
          })
          .catch((error) => {
            this.setState({
              noReviewsMsg: 'No reviews available',
            });
        });
        }else if(helpfulSortFlag){
          let { reviewDetailsHelpfulSort } = this.state;
          reviewDetailsHelpfulSort = [];
          axios.get(`${backendServer}/companyReviewsHelpfulSort`, {
            params: {
            companyId,
            jobSeekerId,
            currentPage,
          },
        })
          .then((response) => {
            this.setState({
              reviewDetailsHelpfulSort: reviewDetailsHelpfulSort.concat(response.data),
              noReviewsMsg: ''
              });
          })
          .catch((error) => {
            this.setState({
              noReviewsMsg: 'No reviews available',
            });
        });
        }
        else if(filterFlag){
          let { reviewDetailsRatingFilter } = this.state;
          reviewDetailsRatingFilter = [];
          axios.get(`${backendServer}/companyReviewsRatingFilter`, {
            params: {
            companyId,
            jobSeekerId,
            currentPage,
            ratingSel
          },
        })
          .then((response) => {
            this.setState({
              reviewDetailsRatingFilter: reviewDetailsRatingFilter.concat(response.data),
              noReviewsMsg: ''
              });
          })
          .catch((error) => {
            this.setState({
              noReviewsMsg: 'No reviews available',
            });
        });
        }
        else{
          let { reviewDetails } = this.state;
          reviewDetails = [];
          axios.get(`${backendServer}/companyReviewsPaginated`, {
            params: {
              companyId,
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
      }

      addReview = (e) => {
        e.preventDefault();
        this.setState({ openModal: true });
      }

      closeModal = () => {
        console.log('inside close modal')
        this.setState({ openModal: false });
      }

      ratingSort = () => {
        this.setState({ rateSortFlag: true, dateSortFlag: false, helpfulSortFlag: false });
        const companyId = this.props.company.compid;
        const jobSeekerId = this.props.userInfo.id;
        let { reviewDetailsRatingSort, ratingSel } = this.state;
        const currentPage = 1;
        reviewDetailsRatingSort = [];
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.get(`${backendServer}/companyReviewsRatingSort`, {
          params: {
            companyId,
            jobSeekerId,
            currentPage,
            ratingSel
          },
        })
          .then((response) => {
            this.setState({
              reviewDetailsRatingSort: reviewDetailsRatingSort.concat(response.data),
              noReviewsMsg: ''
              });
          })
          .catch((error) => {
            this.setState({
              noReviewsMsg: 'No reviews available',
            });
        });
      }

      dateSort = () => {
        this.setState({ rateSortFlag: false, dateSortFlag: true, helpfulSortFlag: false });
        const companyId = this.props.company.compid;
        const jobSeekerId = this.props.userInfo.id;
        let { reviewDetailsDateSort, ratingSel } = this.state;
        const currentPage = 1;
        reviewDetailsDateSort = [];
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.get(`${backendServer}/companyReviewsDateSort`, {
          params: {
            companyId,
            jobSeekerId,
            currentPage,
            ratingSel
          },
        })
          .then((response) => {
            this.setState({
              reviewDetailsDateSort: reviewDetailsDateSort.concat(response.data),
              noReviewsMsg: ''
              });
          })
          .catch((error) => {
            this.setState({
              noReviewsMsg: 'No reviews available',
            });
        });
      }

      helpfulSort= () => {
        this.setState({ rateSortFlag: false, dateSortFlag: false, helpfulSortFlag: true });
        const companyId = this.props.company.compid;
        const jobSeekerId = this.props.userInfo.id;
        let { reviewDetailsHelpfulSort, ratingSel } = this.state;
        const currentPage = 1;
        reviewDetailsHelpfulSort = [];
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.get(`${backendServer}/companyReviewsHelpfulSort`, {
          params: {
            companyId,
            jobSeekerId,
            currentPage,
            ratingSel
          },
        })
          .then((response) => {
            this.setState({
              reviewDetailsHelpfulSort: reviewDetailsHelpfulSort.concat(response.data),
              noReviewsMsg: ''
              });
          })
          .catch((error) => {
            this.setState({
              noReviewsMsg: 'No reviews available',
            });
        });
      }

      handleSearch = () => {
        let { reviewDetailsRatingFilter, ratingSel } = this.state;
      
          this.setState({ rateSortFlag: false, dateSortFlag: false, helpfulSortFlag: false, filterFlag: true });
          const companyId = this.props.company.compid;
          const jobSeekerId = this.props.userInfo.id;
          const currentPage = 1;
          reviewDetailsRatingFilter = [];
          axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
          axios.get(`${backendServer}/companyReviewsRatingFilterTotal`, {
            params: {
              companyId,
              jobSeekerId,
              ratingSel,
            },
          })
            .then((response) => {
              this.setState({
                totalPostsFilter: response.data.length,
                noReviewsMsg: ''
                });
            })
            .catch((error) => {
              this.setState({
                noReviewsMsg: 'No reviews available',
              });
          });
          axios.get(`${backendServer}/companyReviewsRatingFilter`, {
            params: {
              companyId,
              jobSeekerId,
              ratingSel,
              currentPage,
            },
          })
            .then((response) => {
              this.setState({
                reviewDetailsRatingFilter: reviewDetailsRatingFilter.concat(response.data),
                noReviewsMsg: ''
                });
            })
            .catch((error) => {
              this.setState({
                noReviewsMsg: 'No reviews available',
              });
          });
      }

      handleSubmit = (e, reviewId, type) => {
        const { reviewDetails, filterFlag, reviewDetailsRatingFilter,  reviewDetailsRatingSort, reviewDetailsDateSort, reviewDetailsHelpfulSort, rateSortFlag, helpfulSortFlag, dateSortFlag } = this.state;
        let inputData = '';
        if(rateSortFlag){
          const index = reviewDetailsRatingSort.findIndex((review) => review.reviewId === reviewId);
          const reviews = [...reviewDetailsRatingSort];
          if(type === 'Yes'){
            const { yesReviewHelpfulCount } = reviews[index];
            reviews[index].yesReviewHelpfulCount = yesReviewHelpfulCount+1;
            this.setState({ reviewDetailsRatingSort: reviews });
          }else{
            const { noHelpfulCount } = reviews[index];
            reviews[index].noHelpfulCount = noHelpfulCount+1;
            this.setState({ reviewDetailsRatingSort: reviews });
          }
          inputData = {
            reviewId: reviews[index].reviewId,
            yesReviewHelpfulCount: reviews[index].yesReviewHelpfulCount,
            noHelpfulCount: reviews[index].noHelpfulCount,
          }
        }
        else if(helpfulSortFlag){
          const index = reviewDetailsHelpfulSort.findIndex((review) => review.reviewId === reviewId);
          const reviews = [...reviewDetailsHelpfulSort];
          if(type === 'Yes'){
            const { yesReviewHelpfulCount } = reviews[index];
            reviews[index].yesReviewHelpfulCount = yesReviewHelpfulCount+1;
            this.setState({ reviewDetailsHelpfulSort: reviews });
          }else{
            const { noHelpfulCount } = reviews[index];
            reviews[index].noHelpfulCount = noHelpfulCount+1;
            this.setState({ reviewDetailsHelpfulSort: reviews });
          }
          inputData = {
            reviewId: reviews[index].reviewId,
            yesReviewHelpfulCount: reviews[index].yesReviewHelpfulCount,
            noHelpfulCount: reviews[index].noHelpfulCount,
          }
        }
        else if(dateSortFlag){
          const index = reviewDetailsDateSort.findIndex((review) => review.reviewId === reviewId);
          const reviews = [...reviewDetailsDateSort];
          if(type === 'Yes'){
            const { yesReviewHelpfulCount } = reviews[index];
            reviews[index].yesReviewHelpfulCount = yesReviewHelpfulCount+1;
            this.setState({ reviewDetailsDateSort: reviews });
          }else{
            const { noHelpfulCount } = reviews[index];
            reviews[index].noHelpfulCount = noHelpfulCount+1;
            this.setState({ reviewDetailsDateSort: reviews });
          }
          inputData = {
            reviewId: reviews[index].reviewId,
            yesReviewHelpfulCount: reviews[index].yesReviewHelpfulCount,
            noHelpfulCount: reviews[index].noHelpfulCount,
          }
        }else if(filterFlag){
          const index = reviewDetailsRatingFilter.findIndex((review) => review.reviewId === reviewId);
          const reviews = [...reviewDetailsRatingFilter];
          if(type === 'Yes'){
            const { yesReviewHelpfulCount } = reviews[index];
            reviews[index].yesReviewHelpfulCount = yesReviewHelpfulCount+1;
            this.setState({ reviewDetailsRatingFilter: reviews });
          }else{
            const { noHelpfulCount } = reviews[index];
            reviews[index].noHelpfulCount = noHelpfulCount+1;
            this.setState({ reviewDetailsRatingFilter: reviews });
          }
          inputData = {
            reviewId: reviews[index].reviewId,
            yesReviewHelpfulCount: reviews[index].yesReviewHelpfulCount,
            noHelpfulCount: reviews[index].noHelpfulCount,
          }
        }
        else{
          const index = reviewDetails.findIndex((review) => review.reviewId === reviewId);
          const reviews = [...reviewDetails];
          if(type === 'Yes'){
            const { yesReviewHelpfulCount } = reviews[index];
            reviews[index].yesReviewHelpfulCount = yesReviewHelpfulCount+1;
            this.setState({ reviewDetails: reviews });
          }else{
            const { noHelpfulCount } = reviews[index];
            reviews[index].noHelpfulCount = noHelpfulCount+1;
            this.setState({ reviewDetails: reviews });
          }
          inputData = {
            reviewId: reviews[index].reviewId,
            yesReviewHelpfulCount: reviews[index].yesReviewHelpfulCount,
            noHelpfulCount: reviews[index].noHelpfulCount,
          }
        }
        console.log(inputData);
        axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios
          .post(`${backendServer}/updateHelpfulCount`, inputData)
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
        // console.log(this.props.location.flag);
        const jobSeekerId = this.props.userInfo.id;
        const { reviewDetails, ratingSel, filterFlag, totalPostsFilter, noReviewsMsg, reviewDetailsRatingFilter, reviewDetailsRatingSort, reviewDetailsDateSort, reviewDetailsHelpfulSort, openModal, dateSortFlag, rateSortFlag, helpfulSortFlag, totalPosts } = this.state;
        const loggedInUserReviews =  reviewDetails.filter((review) => review.jobSeekerId === jobSeekerId);
        const otherUserReviews = reviewDetails.filter((review) => review.jobSeekerId !== jobSeekerId);
        const companies = reviewDetails.map(review => review.companyName);
        const companyName = companies[0];
        console.log(reviewDetails);
        let sortedReviews =[];
        if((rateSortFlag && filterFlag) || rateSortFlag){
          sortedReviews = reviewDetailsRatingSort;
        }
        if((dateSortFlag && filterFlag) || dateSortFlag){
          sortedReviews = reviewDetailsDateSort;
        }
        if((helpfulSortFlag && filterFlag) || helpfulSortFlag){
          sortedReviews = reviewDetailsHelpfulSort;
        }
        if(filterFlag && !rateSortFlag && !dateSortFlag && !helpfulSortFlag){
          sortedReviews = reviewDetailsRatingFilter;
        }
        const sortedReviewsDisplay = sortedReviews.map((review) => (
          <div>
            <Card style={{ width: '60rem', margin: '0.8em' }}>
              <Card.Body>
                <Row>
                <Col xs={2}>
                <Card.Title>
                  <b>{review.rating}</b><br />
                  <RatingView ratingValue={review.rating} size={18} activeColor="#9d2b6b"/>
                </Card.Title>
                </Col>
                <Col xs={8}>
                <Card.Title>
                  <b>{review.reviewTitle}</b>
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
                <Card.Text>
                  <small>Was this review helpful?</small><br />
                  <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'Yes'); }}>Yes{' '}{review.yesReviewHelpfulCount}</Button>{' '}
                  <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'No'); }}>No{' '}{review.noHelpfulCount}</Button>
                </Card.Text>
                </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        ));
        const userReviews = loggedInUserReviews.map((review) => (
            <div>
              <Card style={{ width: '60rem', margin: '0.8em' }}>
                <Card.Body>
                  <Row>
                  <Col xs={2}>
                  <Card.Title>
                    <b>{review.rating}</b><br />
                    <RatingView ratingValue={review.rating} size={18} activeColor="#9d2b6b"/>
                  </Card.Title>
                  </Col>
                  <Col xs={8}>
                  <Card.Title>
                    <b>{review.reviewTitle}</b>
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
                  <Card.Text>
                    <small>Was this review helpful?</small><br />
                    <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'Yes'); }}>Yes{' '}{review.yesReviewHelpfulCount}</Button>{' '}
                    <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'No'); }}>No{' '}{review.noHelpfulCount}</Button>
                  </Card.Text>
                  </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          ));
          const OtherReviews = otherUserReviews.map((review) => (
            <div>
              <Card style={{ width: '60rem', margin: '0.8em' }}>
                <Card.Body>
                  <Row>
                  <Col xs={2}>
                  <Card.Title>
                    <b>{review.rating}</b><br />
                    <RatingView ratingValue={review.rating} size={18} activeColor="#9d2b6b"/>
                  </Card.Title>
                  </Col>
                  <Col xs={8}>
                  <Card.Title>
                    <b>{review.reviewTitle}</b>
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
                  <Card.Text>
                    <small>Was this review helpful?</small><br />
                    <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'Yes'); }}>Yes{' '}{review.yesReviewHelpfulCount}</Button>{' '}
                    <Button variant='light' style={{background:'lightgray'}} onClick={(e) => { this.handleSubmit(e, review.reviewId, 'No'); }}>No{' '}{review.noHelpfulCount}</Button>
                  </Card.Text>
                  </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          ));
      return (
        <div>
          <CompanyTabs></CompanyTabs>
            <br></br>
            <Container style={{ display: 'flex', justifyContent: 'center' }}>
            
            <Card style={{ width: '60rem', margin: '0.8em', background:'whitesmoke' }}>
            <Card.Title>
              <br />
               <Row>
                 <Col> <h4>{' '}{companyName}{' '} Reviews</h4>
                 </Col>
                 <Col />
                 <Col>
                 <Button onClick={this.addReview} style={{backgroundColor:'white', color:'#567cbb', border: '1px solid gray'}}><b>Review this company</b></Button>
                 </Col>
                </Row>
            </Card.Title>
            <Card.Body>
              <Row>
              <Col>
              <b>Search by rating</b>
              </Col> 
              <Col>
              <Form.Group className="mb-3">
                  <Form.Control as="select" value={ratingSel} name="ratingSel" onChange={this.handleChange}>
                    <option value="">All</option>
                    <option value="5">5</option>
                    <option value="4.5">4.5</option>
                    <option value="4">4</option>
                    <option value="3.5">3.5</option>
                    <option value="3">3</option>
                    <option value="2.5">2.5</option>
                    <option value="2">2</option>
                    <option value="1.5">1.5</option>
                    <option value="1">1</option>
                    <option value="0.5">0.5</option>
                  </Form.Control>
                </Form.Group>
                </Col>
                <Col>
                <Button variant='light' style={{backgroundColor:'white', color:'#567cbb', border: '1px solid gray'}} onClick={this.handleSearch}><b>Search</b></Button>{' '}
                </Col>
                </Row>
                <Row>
                  <Col>
                <b>Sort By</b>{' '} </Col>
                <Col>
            <ButtonGroup>
                <Button className={helpfulSortFlag ? 'active' : 'customButton'} variant="light" onClick={this.helpfulSort}>Helpfulness<FaLongArrowAltDown /></Button>
                <Button className={rateSortFlag ? 'active' : 'customButton'} variant="light" onClick={this.ratingSort}>Rating<FaLongArrowAltDown /></Button>
                <Button className={dateSortFlag ? 'active' : 'customButton'} variant="light" onClick={this.dateSort}>Date<FaLongArrowAltDown /></Button>
            </ButtonGroup>
            </Col>
            <Col />
            </Row>
              </Card.Body>
              </Card>
              </Container>
              {noReviewsMsg !== '' && 
              <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Card style={{ width: '60rem', margin: '0.8em' }}>
                <Card.Title>
                <Row><Col>{noReviewsMsg}</Col></Row>
                </Card.Title>
              </Card>
              </Container>}
              <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {(rateSortFlag || dateSortFlag || helpfulSortFlag || filterFlag) && noReviewsMsg === '' && sortedReviewsDisplay}
              {(!rateSortFlag && !dateSortFlag && !helpfulSortFlag && !filterFlag) && noReviewsMsg === '' && userReviews }
              {(!rateSortFlag && !dateSortFlag && !helpfulSortFlag && !filterFlag) && noReviewsMsg === '' && OtherReviews }
              </Container>
              <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {!filterFlag && noReviewsMsg === '' && <Pagination postsPerPage={5} totalPosts={totalPosts} paginate={this.paginate}/>}
              {filterFlag &&  noReviewsMsg === '' && <Pagination postsPerPage={5} totalPosts={totalPostsFilter} paginate={this.paginate}/>}
              </Container>
              { openModal
                  ? (
                    <ReviewModal
                      companyId={this.props.company.compid}
                      jobSeekerId={this.props.userInfo.id}
                      token={this.props.userInfo.token}
                      closeModal={this.closeModal}
                      addReview={this.addReview}
                    />
                  )
                  : null}
        </div>
      );
    }
  }
  const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    company: state.company
  })
  
  export default connect(mapStateToProps)(Reviews);