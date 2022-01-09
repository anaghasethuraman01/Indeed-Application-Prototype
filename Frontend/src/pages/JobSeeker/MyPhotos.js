import React, { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Pagination from "./Pagination";
import axios from "axios";
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from "simple-react-lightbox";
import "./../../CSS/CompanyPhoto.css";
import { useSelector } from "react-redux";
import JobSeekerLoggedInNavbar from "../JobSeeker/JobSeekerLoggedInNavbar";

const MyPhotos = (props) => {
  const [images, setImages] = useState([]);
  const id = useSelector((state) => state.userInfo.id);
  const [jobSeekerId, setJobSeekerId] = useState(id);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const token = useSelector((state) => state.userInfo.token);
  
  const options = {
    buttons: {
      showAutoplayButton: false,
      showDownloadButton: false,
      showFullscreenButton: false,
      showThumbnailsButton: false,
    },
  };

  const getJobSeekerPhotos = async () => {
    const data1 = {
      jobSeekerId: jobSeekerId,
      currentPage: currentPage,
    };
    axios.defaults.headers.common['authorization'] = token;
    const jobSeekerPhotos = await axios("/api/getJobSeekerPhotos", {
      params: { data: data1 },
    });
    setImages(jobSeekerPhotos.data.photos);
    setTotalPosts(jobSeekerPhotos.data.count);
    console.log("allphotos" + JSON.stringify(jobSeekerPhotos.data.photos));
  };

  useEffect(() => {
    getJobSeekerPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    getJobSeekerPhotos();
  };

  return (
    <div>
      <JobSeekerLoggedInNavbar />
      <Container>
        <Row>
          <Col xs="6">
            <SimpleReactLightbox>
              <SRLWrapper options={options}>
                <div className="container2">
                  {images.map((image) => (
                    <div key={image.id} className="image-card1">
                      <a href={image.imageLocation}>
                        <img
                          className="image"
                          src={image.imageLocation}
                          alt=""
                        />
                      </a>
                      <div>{image.companyName}</div>
                      {image.photoAdminReviewedStatus === "APPROVED" && (
                        <span style={{ color: "green" }}>
                          {" "}
                          {image.photoAdminReviewedStatus}
                        </span>
                      )}
                      {image.photoAdminReviewedStatus ===
                        "PENDING_APPROVAL" && (
                        <span style={{ color: "orange" }}>
                          {" "}
                          {image.photoAdminReviewedStatus}
                        </span>
                      )}
                      {image.photoAdminReviewedStatus === "REJECTED" && (
                        <span style={{ color: "red" }}>
                          {" "}
                          {image.photoAdminReviewedStatus}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </SRLWrapper>
            </SimpleReactLightbox>
          </Col>
          <Pagination
            postsPerPage={16}
            totalPosts={totalPosts}
            paginate={paginate}
          />
        </Row>
      </Container>
    </div>
  );
};

export default MyPhotos;
