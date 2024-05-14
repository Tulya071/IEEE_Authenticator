import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  // NavItem,
  // NavLink,
  // Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Admin_Das = (props) => {
  const [chartData, setChartData] = useState({});
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [approveClicked, setApproveClicked] = useState(false);
  //new
  const [liveStatus, setLiveStatus] = useState([]); 

  const fetchRecentUpdates = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5207/api/review-updates"
      );
      setRecentUpdates(response.data);
    } catch (error) {
      console.error("Error fetching recent updates:", error.message);
    }
  };


  //setting chart data for published sectors
  const fetchChartData1 = async () => {
    try {
      const response = await axios.get("http://localhost:5402/api/published-papers"); // Update the URL
      const data = response.data;
  
      // Extract labels and data from the response to update the chart
      const labels = data.map((item) => item._id);
      const counts = data.map((item) => item.count);
  
      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Total Submissions",
            data: counts,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };
  
      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching chart data:", error.message);
    }
  };

  //setting chart data for total sectors
  const fetchChartData = async () => {
    try {
      const response = await axios.get("http://localhost:5201/api/unique-sectors");
      const data = response.data;

      // Include only specific sectors
      const specificSectors = ["Aerospace", "Bio Engineering", "Computer Science", "Photonics", "Radar", "Robotics", "Circuits", "Geo Science"];

      // Filter out null values and include only specific sectors
      const filteredData = data.filter((item) => item._id !== null && specificSectors.includes(item._id));

      // Extract labels and data from the response to update the chart
      const labels = filteredData.map((item) => item._id);
      const counts = filteredData.map((item) => item.count);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Total Submissions",
            data: counts,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching chart data:", error.message);
    }
  };

  useEffect(() => {
    fetchRecentUpdates();
    fetchChartData();
    fetchChartData1();
  }, []);
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const handleApprove = async (code) => {
    try {
      // Make an API call to update the status to "published"
      setApproveClicked(true);
      await axios.put(`http://localhost:5207/api/update-status/${code}`, {
        status: "published",
      });
      alert(code+"'s paper has been published");
  
      // Find the index of the row with the matching code in recentUpdates
      const index = recentUpdates.findIndex((item) => item.code === code);
  
      if (index !== -1) {
        // Remove the clicked row from recentUpdates
        const updatedRow = recentUpdates[index];
        setRecentUpdates((prevRecentUpdates) =>
          prevRecentUpdates.filter((item) => item.code !== code)
        );
  
        // Add the updated row to the liveStatus array
        setLiveStatus((prevLiveStatus) => [...prevLiveStatus, updatedRow]);
  
        // Send the code to wherever you need it
        console.log("Code:", code);
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
    } finally {
      // Reset the approveClicked state after the update
      setApproveClicked(false);
    }
};

  const handleDisapprove = async (code) => {
    try {
      // Make an API call to update the status to "rejected"
      if (!approveClicked) {
        // Make an API call to update the status to "rejected"
        await axios.put(`http://localhost:5207/api/update-status/${code}`, {
          status: "rejected",
      });

      // Refetch recent updates after the status update
      fetchRecentUpdates();
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="7">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Papers Submitted in Various Sectors</h2>
                  </div>
                  <div className="col">
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  {/* Use chartData here instead of chartExample1 */}
                  <Line
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      // Add any other necessary options here
                    }}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="5">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Applications
                    </h6>
                    <h2 className="mb-0">Total Submissions</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                <Bar
                   data={chartData}
                   options={{
                    responsive: true,
                    maintainAspectRatio: false,
            // Add any other necessary options here
          }}
        />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Recent Updates</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Application Code</th>
                    <th scope="col">Sector</th>
                    
                    <th scope="col">Approve/Dis-approve</th>
                    <th scope="col">Current status</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                    {recentUpdates.map((update) => (
                      <tr key={update.code}>
                        <td>{update.code}</td>
                        <td>{update.sector}</td>
                        <td>
                          <Button
                            color="success"
                            className="mr-2"
                            onClick={() => handleApprove(update.code)}
                          >
                            <i className="fas fa-check" />
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => handleDisapprove(update.code)}
                            disabled={approveClicked}
                          >
                            <i className="fas fa-times" />
                          </Button>
                        </td>
                        <td>{update.status}</td>
                        <td>{update.score}</td>
                      </tr>
                    ))}
                  </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Published Papers</h3>
                  </div>
                  <div className="col text-right">
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
  <thead className="thead-light">
    <tr>
      <th scope="col">Application ID</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    {liveStatus.map((item) => (
      <tr key={item.code}>
        <th scope="row">{item.code}</th>
        <td>
          <div className="d-flex align-items-center">
            <span className="mr-2">Published</span>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin_Das;