import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import backendServer from "../../webConfig";
import AdminNavbar from "./AdminNavbar";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom'

const AdminAnalytics = () => {
  const token = useSelector((state) => state.userInfo.token);

  const [chartOneData, setChartOneData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const [chartTwoData, setChartTwoData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [chartThreeData, setChartThreeData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [chartFourData, setChartFourData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [chartFiveData, setChartFiveData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [chartSixData, setChartSixData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  // The number of reviews per day.
  const barChartOne = async () => {
    let revCnt = [];
    let datePosted = [];
    axios.defaults.headers.common["authorization"] = token;
    await axios
      .get(`${backendServer}/revPerDay`)
      .then((res) => {
        // console.log(res);
        for (const dataObj of res.data) {
          revCnt.push(parseInt(dataObj.revId));
          datePosted.push(dataObj.postedDate);
        }
        setChartOneData({
          labels: datePosted,
          datasets: [
            {
              label: "Review posted",
              data: revCnt,
              backgroundColor: ["#a3d2fd"],
              borderWidth: 4,
              borderColor: "#0062b1",
              fill: true,
              barThickness: 50,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(jobCnt, empName);
  };

  // Top 5 most reviewed companies.
  const barChartTwo = async () => {
    let revCnt = [];
    let companyName = [];
    axios.defaults.headers.common["authorization"] = token;
    await axios
      .get(`${backendServer}/mostRevComp`)
      .then((res) => {
        // console.log(res);
        for (const dataObj of res.data) {
          revCnt.push(parseInt(dataObj.noOfReviews));
          companyName.push(dataObj.companyName);
        }
        setChartTwoData({
          labels: companyName,
          datasets: [
            {
              label: "Top reviewed Companies",
              data: revCnt,
              backgroundColor: ["#f9ea9f"],
              borderWidth: 4,
              borderColor: "#c45100",
              fill: true,
              barThickness: 50,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(jobCnt, empName);
  };

  //  Top 5 companies based on average rating.
  const barChartThree = async () => {
    let avgRating = [];
    let companyName = [];
    axios.defaults.headers.common["authorization"] = token;
    await axios
      .get(`${backendServer}/topAvgRatingComp`)
      .then((res) => {
        // console.log(res);
        for (const dataObj of res.data) {
          avgRating.push(parseInt(dataObj.companyAvgRating));
          companyName.push(dataObj.companyName);
        }
        setChartThreeData({
          labels: companyName,
          datasets: [
            {
              label: "Top rated Companies",
              data: avgRating,
              backgroundColor: ["#f88db2"],
              borderWidth: 4,
              borderColor: "#ca1299",
              fill: false,
              barThickness: 50,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(jobCnt, empName);
  };

  // Top 5 job seekers based on total accepted reviews made.
  const barChartFour = async () => {
    let revCnt = [];
    let name = [];
    axios.defaults.headers.common['authorization'] = token;
    await axios
      .get(`${backendServer}/acceptedRev`)
      .then((res) => {
        // console.log(res);
        for (const dataObj of res.data) {
          revCnt.push(parseInt(dataObj.revId));
          name.push(dataObj.name);
        }
        setChartFourData({
          labels: name,
          datasets: [
            {
              label: "Top jobseekers",
              data: revCnt,
              backgroundColor: ["#a3d2fd"],
              borderWidth: 4,
              borderColor: "#0062b1",
              fill: true,
              barThickness: 50,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Top 10 CEOs based on rating.
  const barChartFive = async () => {
    let ceoRating = [];
    let name = [];
    axios.defaults.headers.common['authorization'] = token;
    await axios
      .get(`${backendServer}/ceoRating`)
      .then((res) => {
        console.log(res.data);
        for (const dataObj of res.data) {
          ceoRating.push(parseInt(dataObj.rating));
          name.push(dataObj.ceo);
        }
        setChartFiveData({
          labels: name,
          datasets: [
            {
              label: "Top 10 CEO",
              data: ceoRating,
              backgroundColor: ["#f9ea9f"],
              borderWidth: 4,
              borderColor: "#c45100",
              fill: true,
              barThickness: 50,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Top 10 companies based on views per day.
  const barChartSix = async () => {
    let revCnt = [];
    let name = [];
    axios.defaults.headers.common['authorization'] = token;
    await axios
      .get(`${backendServer}/countPerDay`)
      .then((res) => {
        // console.log(res);
        for (const dataObj of res.data) {
          revCnt.push(parseInt(dataObj.viewCount));
          name.push(dataObj.companyName);
        }
        setChartSixData({
          labels: name,
          datasets: [
            {
              label: "Top 10 companies",
              data: revCnt,
              backgroundColor: ["#f88db2"],
              borderWidth: 4,
              borderColor: "#ca1299",
              fill: true,
              barThickness: 50,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    barChartOne();
    barChartTwo();
    barChartThree();
    barChartFour();
    barChartFive();
    barChartSix();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <Container style={{ width: "100%" }}>
        <br />
        <br />
        <Row>
          {/* Chart 1 */}
          <Col style={{ width: "50%" }}>
            <h4>Review Posted Per Day</h4>
            <Bar
              data={chartOneData}
              options={{
                responsive: true,
                title: { text: "POSTED JOBS", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                        beginAtZero: false,
                      },
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                },
              }}
            />
          </Col>
          {/* Chart 2 */}
          <Col style={{ width: "50%" }}>
            <h4>Top 5 companies based on average rating</h4>
            <Bar
              data={chartTwoData}
              options={{
                responsive: true,
                title: { text: "POSTED JOBS", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 500,
                        beginAtZero: true,
                      },
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                },
              }}
            />
          </Col>
        </Row>
        <br />
        <Row>
          {/* Chart 3 */}
          <Col style={{ width: "50%" }}>
            <h4>Top 5 most Reviewed Companies</h4>
            <Bar
              data={chartThreeData}
              options={{
                responsive: true,
                title: { text: "POSTED JOBS", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 500,
                        beginAtZero: true,
                      },
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                },
              }}
            />
          </Col>
          {/* Chart 4 */}
          <Col style={{ width: "50%" }}>
            <h4>Top 5 job seekers based on total accepted reviews</h4>
            <Bar
              data={chartFourData}
              options={{
                responsive: true,
                title: { text: "POSTED JOBS", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 500,
                        beginAtZero: true,
                      },
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                },
              }}
            />
          </Col>
        </Row>
        <br />
        <Row>
          {/* Chart 5 */}
          <Col style={{ width: "50%" }}>
            <h4>Top 10 CEOs based on rating</h4>
            <Bar
              data={chartFiveData}
              options={{
                responsive: true,
                title: { text: "POSTED JOBS", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 500,
                        beginAtZero: true,
                      },
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                },
              }}
            />
          </Col>
          {/* Chart 6 */}
          <Col style={{ width: "50%" }}>
            <h4>Top 10 companies based on views per day</h4>
            <Bar
              data={chartSixData}
              options={{
                responsive: true,
                title: { text: "POSTED JOBS", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 500,
                        beginAtZero: true,
                      },
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                },
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(AdminAnalytics);
