import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Bar} from "react-chartjs-2";
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom'
import backendServer from "../../webConfig";

const CompanyStatistics = (props) => {
  const [show, setShow] = useState(false);
  const [companyId, setCompanyId] = useState(props.companyId);
  const [rejectYearArray, setRejectYearArray] = useState([]);
  const [hiredYearArray, setHiredYearArray] = useState([]);
  const [hiredArray, setHiredArray] = useState([]);
  const [rejectArray, setRejectArray] = useState([]);
  const token = useSelector((state) => state.userInfo.token);

  useEffect(() => {
    getStatistics();
  }, [show]);
  
  const getStatistics = async () =>{
    axios.defaults.headers.common['authorization'] = token;
    const statDtls = await axios(backendServer+'/companyJobStatistics', {params:{data:companyId}});
    setHiredArray(statDtls.data.hired.map(function (el) { return el.count; }));
    setRejectArray(statDtls.data.rejected.map(function (el) { return parseInt(el.count); }));
    setHiredYearArray(statDtls.data.hired.map(function (el) { return el.year; }))
    setRejectYearArray(statDtls.data.rejected.map(function (el) { return el.year; }))
  };

  const handleShow = () => {
    setShow(true)
  };

  const handleClose = () => setShow(false);

  const options1={
    responsive: true,
    legend: {
        display: false,
    },
    type:'bar',
    plugins: {
      title: {
        display: true,
        text: 'Number of Applicants Hired'
      }
    }
  }

  const options2={
    responsive: true,
    legend: {
        display: false,
    },
    type:'bar',
    plugins: {
      title: {
        display: true,
        text: 'Number of Applicants Rejected'
      }
    },
    // scales: {
    //   yAxes: [{
    //     ticks: {
    //       callback: function(value) {if (value % 1 === 0) {return value;}}
    //     }
    //   }]
    // }
  }

  const data1 = {
    labels: hiredYearArray,
    datasets: [
      {
        label: 'Hired',
        backgroundColor: 'rgba(0,255,0)',
        borderWidth: 1,
        data: hiredArray
      }
    ]
}

  const data2 = {
    labels: rejectYearArray,
    datasets: [
      {
        label: 'Rejected',
        backgroundColor: 'rgba(255,0,0)',
        borderWidth: 1,
        data: rejectArray
      }
    ]
  }

  return (
    <div class="modal-header border-0">
      <Button
        variant="primary"
        size="sm"
        onClick={handleShow}
        style={{ borderRadius: "6.25rem"}}
      >
        Job Related Statistics
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
          <Modal.Title>Statistics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(hiredArray.length > 0) && <Bar
          data={data1}
          width={null}
          height={null}
          options={options1}
        />}
          {(rejectArray.length > 0) && <Bar
          data={data2}
          width={null}
          height={null}
          options={options2}
        />}
        {(hiredArray.length <= 0 && rejectArray.length <= 0) && <p>No data found</p>}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withRouter(CompanyStatistics);
