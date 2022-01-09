//sample employer component
import { React, Component} from 'react';
import axios from 'axios';
import { Button, Row, Col, Card, Container, Form, ListGroup,
  } from 'react-bootstrap';
  import ReactStars from "react-rating-stars-component";
import backendServer from '../../webConfig';
import '../../style/button-group.css';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import JobSeekerLoggedInNavbar from './JobSeekerLoggedInNavbar';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import JobSeekerNavbar from './JobSeekerNavbar'


class Reviews extends Component {
    constructor(props) {
      super(props);
      this.state = {
        reviewDetails: [],
        successMsg: '',
        errorMsg: '',
        companyName: '',
        location: '',
        searchFlag: false,
        reviewSearchDetails: [],
        isLoggedIn: false,
      };
    }
    
    checkLoggedInStatus() {
      const userInfo = this.props.userInfo
      console.log(userInfo)
      if (userInfo.email !== '' && userInfo.accountType === 'JobSeeker') {
        console.log('JobSeeker is signed in')
        this.setState({
          isLoggedIn: true,
        })
      }
    }

    componentDidMount() {
      this.checkLoggedInStatus();
        let { reviewDetails } = this.state;
        // axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
        axios.get(`${backendServer}/allReviews`)
          .then((response) => {
            this.setState({
                reviewDetails: reviewDetails.concat(response.data),
              });
          });
      }

      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
          errorMsg: ''
        });
      }

      handleFilter = (e) => {
        e.preventDefault();
        this.setState({
          companyName: '', location: '', searchFlag: false, errorMsg:''
        });
        //document.getElementById('search_form').reset();
      }

      handleCompanyLink = (e, companyId, companyName)  => {
        const payload1 = companyName;
        this.props.companyName(payload1);
        const payload2 = companyId;
        this.props.companyId(payload2);
      }

      handleSubmit = () => {
        
        let { reviewSearchDetails, companyName, location } = this.state;
        if(companyName === '' && location === ''){
            this.setState({errorMsg: 'Please enter search criteria'});
        }else{
          reviewSearchDetails = [];
          const inputData = {
            companyName,
            location
          }
          console.log(inputData);
          //axios.defaults.headers.common['authorization'] = this.props.userInfo.token;
          axios
            .post(`${backendServer}/searchReview`, inputData)
            .then((response) => {
              if (response.status === 200) {
                this.setState({ 
                  reviewSearchDetails: reviewSearchDetails.concat(response.data),
                  searchFlag: true,
                });
              } else {
                console.log('inside else');
                this.setState({ 
                  reviewSearchDetails: [],
                  errorMsg: 'No search results' });
              }
            })
            .catch((err) => {
              console.error(err);
              this.setState({
                searchFlag: false,
                errorMsg: 'No search results' });
            });
          }
      }

    render() {
      // To-DO Fetch logged in userid from store
        const { reviewDetails, companyName, location, searchFlag, reviewSearchDetails, errorMsg } = this.state;
        console.log(reviewSearchDetails.length);
        let searchReviewsDisplay = '';
        if(searchFlag){
          if(reviewSearchDetails !== '' && reviewSearchDetails[0].companyName !== '' && reviewSearchDetails[0].companyName !== undefined ){
                searchReviewsDisplay = reviewSearchDetails.map((review) => (
                <div>
                  <ListGroup style={{ width: '50rem', margin: '0.1em', border: 'none' }}>
                    <ListGroup.Item>
                    <Row>
                      <Col><img src={review.logo} alt="" style={{ maxHeight: '80px', maxWidth: '80px' }} /></Col>
                      <Col><Link style={{color:'#2457a7', textDecoration: 'none'}} to="/snapshot" onClick={(e) => { this.handleCompanyLink(e, review.companyId, review.companyName) }}><h5>{review.companyName}</h5></Link>
                      <Link style={{color:'black', textDecoration: 'none'}} to="/reviews">{review.companyAvgRating}</Link><AiFillStar /></Col>
                      <Col><Link style={{color:'#2457a7', textDecoration: 'none'}} to="/reviews" onClick={(e) => { this.handleCompanyLink(e, review.companyId, review.companyName) }}>Reviews</Link></Col>
                      <Col>
                            <Link style={{color:'#2457a7', textDecoration: 'none'}} to="/addSalaryReview" onClick={(e) => { this.handleCompanyLink(e, review.companyId, review.companyName) }}>Salaries</Link>
                            </Col>
                            <Col>
                            <Link style={{color:'#2457a7', textDecoration: 'none'}} to="/jobs" onClick={(e) => { this.handleCompanyLink(e, review.companyId, review.companyName) }}>Open Jobs</Link>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              ));
            }else{
              searchReviewsDisplay = <h4>No reviews available for the search!!</h4>
            }
        }
       
        const reviewsDisplay = reviewDetails.map((review) => (
          <div>
            <Card style={{ width: '20rem', margin: '0.1em', border: 'none' }}>
                <Card.Body>
                    <Row>
                <Col xs={2}><img src={review.logo} alt="" style={{ maxHeight: '60px', maxWidth: '80px' }} /></Col>
                <Col sx={4}/>
                <Col xs={8}>
                <Link style={{color:'black', textDecoration: 'none'}} to="/snapshot" onClick={(e) => { this.handleCompanyLink(e, review.companyId, review.companyName) }}><h5>{review.companyName}</h5></Link>
                  </Col>
                  </Row>
                    <Row>  
                    <Col xs={5}>
                <ReactStars
                    count={5}
                    size={20}
                    value={review.companyAvgRating}
                    isHalf={true}
                    activeColor="#9d2b6b"
                    edit={false}
                  />
                  </Col>
                  <Col xs={4}>
                  <Link style={{textDecoration: 'none'}} to="/reviews" onClick={(e) => { this.handleCompanyLink(e, review.companyId, review.companyName) }}><small>{review.noOfReviews}{' '}reviews</small></Link>
                  </Col>
                  </Row>
                  <Row>
                      <Col xs={5}>
                      <Link style={{color:'#7d7d7d', textDecoration: 'none'}} to="/addSalaryReview" onClick={(e) => { this.handleCompanyLink(e, review.companyId, review.companyName) }}>Salaries</Link>
                      </Col>
                      <Col xs={4}>
                      <Link style={{color:'#7d7d7d', textDecoration: 'none'}} to="/jobs" onClick={(e) => { this.handleCompanyLink(e, review.companyId, review.companyName) }}>Open Jobs</Link>
                      </Col>
                  </Row>
              </Card.Body>
            </Card>
          </div>
        ));
      return (
        <div>
          {/* <JobSeekerLoggedInNavbar /> */}
          {this.state.isLoggedIn ? (
          <JobSeekerLoggedInNavbar />
        ) : (
          <JobSeekerNavbar />
        )}
            <br></br>
            <Container style={{ width: '70rem', display:'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>
            
            <Card style={{ width: '50rem', margin: '0.8em', border: 'none' }}>
            <Card.Title>
            
                 <h1>Find great places to work</h1><br />
                
                  <h4 style={{color:'#7d7d7d'}}>Get access to millions of company reviews</h4><br />
                  <span style={{color:'red'}}>{errorMsg}</span>
            
                  <Row>
                      <Col>Company Name
                      </Col>
                      <Col>Location
                      </Col>
                      <Col />
                  </Row>
                  <Row>
                  <Col>
                <Form.Group className="mb-3">
                  <Form.Control name="companyName" type="text"
                  className="mr-sm-2" onChange={this.handleChange} value={companyName}/>
                </Form.Group>
              </Col>
                      <Col><Form.Group className="mb-3">
                  <Form.Control name="location" type="text"
                  className="mr-sm-2" onChange={this.handleChange} value={location} />
                </Form.Group>
                      </Col>
                      <Col>
                <Button style={{backgroundColor:'#2457a7'}} type="submit" onClick={this.handleSubmit}>
                  <b>Find Companies</b>
                </Button>{' '}
                <Button style={{backgroundColor:'#2457a7'}} onClick={this.handleFilter}>
                  <b>Clear</b>
                </Button>
              </Col>
                  </Row>
             
                  <br /> 
              <h3>Popular companies</h3>
            </Card.Title>
              </Card>  
              <br /> 
            
              {!searchFlag &&reviewsDisplay}
              {searchFlag && searchReviewsDisplay}
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
  )(withRouter(Reviews))