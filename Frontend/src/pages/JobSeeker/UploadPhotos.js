import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useSelector} from 'react-redux';
import backendServer from "../../webConfig";

const UploadPhotos = (props) => {
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [photoName, setPhotoName] = useState([]);
  const id = useSelector((state)=>state.userInfo.id);
  const compid = useSelector((state)=>state.company.compid);
  const compName = useSelector((state)=>state.company.compName);
  const [jobSeekerId, setJobSeekerId] = useState(id);
  const [companyId, setCompanyId] = useState(compid);
  const [companyName, setCompanyName] = useState(compName);
  const [inputFields, setInputFields] = useState([{ photo: "" }]);
  const [fieldCount, setFieldCount] = useState(1);
  const token = useSelector((state) => state.userInfo.token);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ photo: "" });
    setInputFields(values);
  };

  const photoUploadHandler = (e) => {
    e.preventDefault();
    setPhoto([...photo, e.target.files[0]]);
    setPhotoName([...photoName, URL.createObjectURL(e.target.files[0])]);
    //console.log(photoName);
    if (fieldCount !== 5) {
      handleAddFields();
      setFieldCount(fieldCount + 1);
    }
  };

  const uploadPhoto = (e) => {
    for (let i = 0; i < photo.length; i++) {
      var data = new FormData();
      data.append("file", photo[i]);
      axios
        .post(backendServer+"/api/upload", data)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            //make another call to append to db
            console.log("returned");
            console.log(response.data.imageLocation);
            var data1 = {
              jobSeekerId: jobSeekerId,
              companyId: companyId,
              companyName: companyName,
              imageLocation: response.data.imageLocation,
              photoAdminReviewedStatus: "PENDING_APPROVAL",
            };
            axios.defaults.headers.common["authorization"] = token;
            axios.post(backendServer+"/api/uploadCompanyPhotos", data1)
              .then((response1) => {
                if (response1.status === 200) {
                  toast.success("Successfully uploaded picture", {position: toast.POSITION.TOP_CENTER});
                }
              })
              .catch((err) => {
                toast.error("Unable to upload picture", {position: toast.POSITION.TOP_CENTER});
                console.log(err);
              });
          }
        })
        .catch((err) => {
          toast.error("Unable to upload picture", {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log(err);
        });
    }
    setPhoto([]);
    setPhotoName([]);
    setFieldCount(1);
    setInputFields([{ photo: "" }])
    handleClose()
  };

  return (
    <div class="modal-header border-0">
      <Button
        variant="primary"
        size="lg"
        onClick={handleShow}
        style={{ borderRadius: "6.25rem", marginLeft: "71%" }}
      >
        Upload a photo
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload your company photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> Select 5 or less photos of your workplace or company events. </p>
          <p> Workplace or company events </p>
          <p> No selfies </p>
          <Form>
          {/* <Form onSubmit={uploadPhoto}> */}
            {inputFields.map((inputField, index) => (
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control onChange={photoUploadHandler} type="file" />
                {photoName[index] && (
                  <img src={photoName[index]} alt="" height="136" width="136" />
                )}
              </Form.Group>
            ))}
               <Button variant="primary" size="sm" onClick={uploadPhoto}>
            {/* <Button variant="primary" size="sm" type="submit"> */}
              Upload
            </Button>
            <a href="#root" onClick={handleClose}>
              Cancel
            </a>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p>
            {" "}
            By uploading this photograph, you represent that you are the owner
            of this photograph and verify that you have the right and required
            permissions to post it to Indeed.{" "}
          </p>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadPhotos;