import React, { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import UploadPhotos from "./UploadPhotos";
import Pagination from "./Pagination";
import axios from "axios";
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from "simple-react-lightbox";
import "./../../CSS/CompanyPhoto.css";
import CompanyTabs from "../Company/CompanyTabs";
import backendServer from "../../webConfig";
import { useSelector } from "react-redux";

const CompanyPhotos = (props) => {
  const [images, setImages] = useState([]);
  const compid = useSelector((state) => state.company.compid);
  const [companyId, setCompanyId] = useState(compid);
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

  const getCompanyPhotos = async () => {
    const data1 = {
      companyId: companyId,
      photoAdminReviewedStatus: "APPROVED",
      currentPage: currentPage,
    };
    axios.defaults.headers.common["authorization"] = token;
    const allPhotos = await axios(backendServer+"/api/getAllPhotos", {
      params: { data: data1 },
    });
    setImages(allPhotos.data.photos);
    setTotalPosts(allPhotos.data.count);
    console.log("allphotos" + allPhotos.data.photos);
  };

  useEffect(() => {
    getCompanyPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    getCompanyPhotos();
  };

  return (
    <div>
      <CompanyTabs />
      <Container>
        <Row>
          <Col xs="6">
            <UploadPhotos />
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <SimpleReactLightbox>
              <SRLWrapper options={options}>
                <div className="container1">
                  {images.map((image) => (
                    <div key={image.id} className="image-card">
                      <a href={image.imageLocation}>
                        <img
                          className="image"
                          src={image.imageLocation}
                          alt=""
                        />
                      </a>
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

export default CompanyPhotos;
