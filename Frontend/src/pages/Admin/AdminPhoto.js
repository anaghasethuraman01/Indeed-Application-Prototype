import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import Pagination from "./../JobSeeker/Pagination";
import { toast } from "react-toastify";
import AdminNavbar from "./AdminNavbar";
import { useSelector } from "react-redux";
import backendServer from "../../webConfig";
import { withRouter } from "react-router-dom";

const AdminPhoto = (props) => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const token = useSelector((state) => state.userInfo.token);
  
  const getAdminPhotos = async () => {
    const data1 = {
      photoAdminReviewedStatus: "PENDING_APPROVAL",
      currentPage: currentPage,
    };
    console.log(token);
    axios.defaults.headers.common['authorization'] = token;
    const pendingPhotos = await axios(backendServer+'/api/getAdminPhotos/', {
      params: { data: data1 },
    });
    console.log(pendingPhotos.data.photos);
    setImages(pendingPhotos.data.photos);
    setTotalPosts(pendingPhotos.data.count);
  };

  useEffect(() => {
    getAdminPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleStatus = (e) => {
    e.preventDefault();
    const index = e.target.getAttribute("index");
    const img = images[index];
    img.photoAdminReviewedStatus = e.target.value;
    console.log(img);
    axios.defaults.headers.common['authorization'] = token;
    axios
      .post(backendServer+'/api/setPhotoStatus', img)
      .then((response) => {
        if (response.status === 200) {
          getAdminPhotos();
        }
      })
      .catch((err) => {
        toast.error("Unable to upload picture", {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(err);
      });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //need to display companyName and JobSeeker Name
  return (
    <div>
      <AdminNavbar />
      <h3>Photos to be approved</h3>
      {images.map((img, index) => (
        <Card
          style={{
            width: "40%",
            height: 200,
            flexDirection: "row",
            gap: 10,
            padding: 5,
          }}
        >
          <img src={img.imageLocation} alt="" height="100%" width="50%" />
          <div>
            <div>Company Name: {img.companyName}</div>
            <div>
              <Button
                variant="primary"
                index={index}
                value="APPROVED"
                onClick={handleStatus}
              >
                Approve
              </Button>
              <br />
            </div>

            <Button
              style={{ padding: 5 }}
              variant="primary"
              index={index}
              value="REJECTED"
              onClick={handleStatus}
            >
              Reject
            </Button>
          </div>
        </Card>
      ))}
      <Pagination
        postsPerPage={5}
        totalPosts={totalPosts}
        paginate={paginate}
      />
    </div>
  );
};

export default withRouter(AdminPhoto);