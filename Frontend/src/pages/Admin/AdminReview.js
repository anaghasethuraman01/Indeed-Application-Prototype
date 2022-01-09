import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import Pagination from "./../JobSeeker/Pagination";
import { toast } from "react-toastify";
import AdminNavbar from "./AdminNavbar";
import { useSelector } from "react-redux";
import backendServer from "../../webConfig";
import { withRouter } from 'react-router-dom'

const AdminReview = (props) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)
  const token = useSelector((state) => state.userInfo.token);

  const getAdminReviews = async () => {
    const data1 = {reviewAdminReviewedStatus:"PENDING_APPROVAL",currentPage:currentPage}
    axios.defaults.headers.common['authorization'] = token;
    const pendingReviews = await axios(`${backendServer}/api/getAdminReviews`, {params: {data:data1 }});
    //console.log(pendingPhotos.data.photos)
    setReviews(pendingReviews.data.reviews)
    setTotalPosts(pendingReviews.data.count)
  };

  useEffect(() => {
    getAdminReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleStatus = (e) => {
    e.preventDefault();
    const index = e.target.getAttribute("index")
    const rev = reviews[index]
    rev.adminReviewStatus = e.target.value;
    axios.defaults.headers.common['authorization'] = token;
    axios.post(`${backendServer}/api/setReviewStatus`,rev)
    .then((response)=>{
      if (response.status===200){
        getAdminReviews();
      }
    })
    .catch((err)=>{
      toast.error("Unable to update review status", {position: toast.POSITION.TOP_CENTER});
      console.log(err);
    })
  };

  const paginate = (pageNumber) =>{
    setCurrentPage(pageNumber)
  };

  //add Company Name and Reviewer Name
  return(
    <div>
      <AdminNavbar/>
      <h3>Reviews to be approved</h3>
      {reviews.map((review,index)=>(
        <Card style={{width:"40%", padding:5}}>
          <div>
            <p>Company Name: {review.companyName}</p>
            <p>Review Title: {review.reviewTitle}</p>
            <p>Review Comments: {review.reviewComments}</p>
            <p>Rating: {review.rating}</p>
            <p>Role: {review.reviewerRole}</p>
          </div>
          <div style={{flexDirection:"row",padding:5}}> 
            <Button variant="primary" index={index} value = "APPROVED" onClick={handleStatus}>Approve</Button>
            <Button variant="primary" index={index} value ="REJECTED" onClick={handleStatus}>Reject</Button>
          </div>   

        </Card>
        ))}
      <Pagination postsPerPage={5} totalPosts={totalPosts} paginate={paginate}/>
    </div>
  )
}

export default withRouter(AdminReview);