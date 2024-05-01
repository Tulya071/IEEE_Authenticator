
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  const [papersSubmitted, setPapersSubmitted] = useState(0);
  const [papersToBeReviewed, setPapersToBeReviewed] = useState(0);
  const [papersPublished, setPapersPublished] = useState(0);
  const [papersToBePublished, setPapersToBePublished] = useState(0);

  useEffect(() => {
    // Fetch data from MongoDB Atlas
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5200/api/documents/count');
        const data = response.data;

        // Update state with the fetched data
        setPapersSubmitted(data.totalCount || 0);
        setPapersToBeReviewed(data.toBeReviewedCount || 0);
        setPapersPublished(data.publishedCount || 0);
        setPapersToBePublished(data.toBePublishedCount || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures that this effect runs once after the initial render
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Papers Submitted
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        {papersSubmitted}
                        </span>
                      </div>
                      <Col className="col-auto">
                        {/* <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          { <i class="fa-duotone fa-newspaper"></i> }
                        </div> */}
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          PAPERS TO BE REVIEWED
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{papersToBeReviewed}</span>
                      </div>
                      <Col className="col-auto">
                        {/* <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div> */}
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          PAPERS PUBLISHED
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{papersPublished}</span>
                      </div>
                      <Col className="col-auto">
                        {/* <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div> */}
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          PAPERS TO BE PUBLISHED
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{papersToBePublished}</span>
                      </div>
                      <Col className="col-auto">
                        {/* <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div> */}
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
