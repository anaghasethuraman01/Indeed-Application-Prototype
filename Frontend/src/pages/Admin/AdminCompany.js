import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import AdminNavbar from "./AdminNavbar";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination from "./../JobSeeker/Pagination";
import CompanyStatistics from "./CompanyStatistics";
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom'
import backendServer from "../../webConfig";

const AdminCompany = (props) => {

  const [search, setSearch] = useState("");
  const [companyId, setCompanyId] = useState(Number);
  const [companyDtls, setCompanyDtls] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentCompanyPage, setCurrentCompanyPage] = useState(1)
  const [currentReviewPage, setCurrentReviewPage] = useState(1)
  const [totalCompanyPosts, setTotalCompanyPosts] = useState(0)
  const [totalReviewPosts, setTotalReviewPosts] = useState(0)
  const token = useSelector((state) => state.userInfo.token);

  useEffect(() => {
    getCompanyDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCompanyPage]);

  useEffect(() => {
    getReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId, currentReviewPage]);

  const getCompanyDetails = async () => {
    const data1 = { currentPage: currentCompanyPage }
    axios.defaults.headers.common['authorization'] = token;
    const companyDetails = await axios(backendServer+ '/getCompanyDetailsPaginated/', { params: { data: data1 } });
    setCompanyDtls(companyDetails.data.companyDtls)
    setTotalCompanyPosts(companyDetails.data.count)
    setCompanyId(companyDetails.data.companyDtls[0].companyId)
    getReviews()

  };

  const searchChangeHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
  }

  const handleSearch = async (searchString) => {
    console.log("searching")
    const searchTerm = searchString.trim().toLowerCase()
    axios.defaults.headers.common['authorization'] = token;
    const searchResult = await axios(backendServer+'/searchAdminCompany', {params: {data:searchTerm}});
    if (searchResult.data.companyDtls.length>0){
      setCompanyDtls(searchResult.data.companyDtls)
      setCompanyId(searchResult.data.companyDtls[0].companyId)
    }
    else{
      setCompanyDtls([])
      setCompanyId(Number)
      setReviews([])
      setTotalReviewPosts(0)
    }
  }

  const searchkeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSearch(e.target.value)
    }
  }

  const cardHandler = async (e) => {
    setCompanyId(e);
  }

  const getReviews = async () => {
    const data1 = { companyId: companyId, currentPage: currentReviewPage }
    axios.defaults.headers.common['authorization'] = token;
    const companyReviews = await axios(backendServer+'/api/getAllReviewsByCompanyId/', { params: { data: data1 } });
    console.log(companyReviews.data.reviews);
    setReviews(companyReviews.data.reviews)
    setTotalReviewPosts(companyReviews.data.count)
  }

  const paginate1 = (pageNumber) => {
    setCurrentCompanyPage(pageNumber)
  };

  const paginate2 = (pageNumber) => {
    setCurrentReviewPage(pageNumber)
  };

  return (
    <div>
      <AdminNavbar />
      <div id="Second" class="row">
        <div 
      >
          <TextField
            id="input-with-icon-textfield"
            placeholder="Company Name?"
            value={search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onKeyDown={searchkeyPress}
            onChange={searchChangeHandler}
            size="small"
            style={{marginLeft:"1%", marginTop:"1%", width:"90%"}}
          />
        </div>
      </div>

      <div
        id="third"
        class="row "
        style={{ backgroundColor: '#f7f7f7', marginTop: '20px' }}
      >
        <div class="row">
          <div class="col-1"></div>
          <div class="col-6" style={{ marginLeft: '0px', marginTop:"5px" }}>

            {companyDtls.map((company) => (
              <div>
                <Card onClick={() => cardHandler(company.companyId)} style={{ width: "60%", padding: 5}}>
                  <div>
                    <p>{company.companyName}</p>
                  </div>
                  <div>
                    <CompanyStatistics companyId = {company.companyId}/>
                  </div>
                </Card>
              </div>
            ))}
            <Pagination postsPerPage={10} totalPosts={totalCompanyPosts} paginate={paginate1} />
          </div>


          <div class="col-5"  style={{ marginLeft: '0px', marginTop:"5px" }}>
            {reviews.map((review) => (
              <div>
                <Card style={{ width: "80%", padding: 5 }}>
                  <div>
                    <p>Review Title: {review.reviewTitle}</p>
                    <p>Review Comments: {review.reviewComments}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Role: {review.reviewerRole}</p>
                    <p>Review Status: {review.adminReviewStatus}</p>
                  </div>
                </Card>
              </div>
            ))}
            <Pagination postsPerPage={5} totalPosts={totalReviewPosts} paginate={paginate2} />
          </div>
        </div>


      </div>
    </div>
  );
}

export default withRouter(AdminCompany);