import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


// reactstrap components
import {
  Button,

  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Table,
  Progress,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";



const Profile = ({ name, email }) => {
  const location = useLocation();
  const { state } = location;
  //new
  const [documents, setDocuments] = useState([]);

  // State for storing the form data
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    country: '',
    postalCode: '',
    code: '',
    email: '',
    status: '',
    score: '',
    comments: '',
  });
  //new
  useEffect(() => {
    // Check if state contains the code and name
    if (state && state.userCode && state.useremail) {
      // Use the code and name as needed, e.g., set them in the form data
      setFormData({
        ...formData,
        code: state.userCode,
        email: state.useremail
      });
      fetchStatusAndScore(state.userCode);
    }
  }, [state]);
  //new
  const fetchStatusAndScore = async (userCode) => {
    try {
      const response = await axios.get(`http://192.168.1.211:5100/api/documents/${userCode}`);
      const data = response.data;

      // Assuming the API response contains a single document for the user
      if (data.length > 0) {
        const { status, score, code, comments } = data[0];
        setFormData({
          ...formData,
          status,
          score,
          code,
          comments,
        });
      }
    } catch (error) {
      console.error('Error fetching status and score:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const document = [
    { id: '5679ERTP6789', progress: 60 },
    { id: '4534ERTP7809', progress: 40 },
    { id: '4533ERTP6789', progress: 20 },
  ];


  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                {/* <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div> */}
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      {/* <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div> */}
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {name}
                    <span className="font-weight-light"></span>
                  </h3>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {formData.address}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {formData.city}- {formData.postalCode}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {formData.country}
                  </div>
                  <hr className="my-4" />
                  <p>
                    "An insightful exploration of Machine Learning Algorithms that offers a fresh perspective, comprehensive analysis, and valuable contributions to the existing body of knowledge in the field."
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show Reviews
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              {/* <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader> */}
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <div>Application ID:  {formData.code} </div>
                    <div>Score:  {formData.score}</div>
                    <div>Status:  {formData.status}</div>
                    <div>Comments:  {formData.comments}</div>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="Postal code"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">Your Papers</h6>
                  <div className="pl-lg-4">
                    {/* <FormGroup>
                      <label>Your Papers</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        //defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        //Open Source."
                        type="textarea"
                      />
                    </FormGroup> */}

                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Document ID</th>

                          <th scope="col">Status</th>
                          <th scope="col"> Actions </th>
                        </tr>
                      </thead>
                      {document.map((doc) => (
                        <tbody>

                          <tr>
                            <th scope="row">{doc.id}</th>

                            <td>
                              <div className="d-flex align-items-center">
                                <span className="mr-2">{doc.progress}</span>
                                <div>
                                  <Progress
                                    max="100"
                                    value={doc.progress}
                                    barClassName={`bg-gradient-${doc.progress > 40 ? 'success' : 'danger'}`}
                                  />
                                </div>
                              </div>
                            </td>

                            <td>
                              {/* {doc.progress < 40 && (
                <Button color='link'><Link to={`/auth/camera`}>Create Camera-Ready Submission</Link></Button>
              )} */}


                              {doc.progress < 40 ? (
                                <Button color="primary" onClick={() => window.location.href = "/auth/camera"}>
                                  Camera Ready Submission
                                </Button>
                              ) : doc.progress < 60 ? (
                                <Button color="primary" onClick={() => window.location.href = "/auth/ppt"}>
                                  PPT and Presentation Submission
                                </Button>
                              ) : (
                                /* For progress >= 60%, no action needed */
                                null
                              )}
                            </td>

                          </tr>
                          {/* <tr>
                    <th scope="row">{doc.id}</th>
                    
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{doc.progress}</span>
                        <div>
                          <Progress
                            max="100"
                            value={doc.progress}
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">4534ERTP7809</th>
                    
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">20%</span>
                        <div>
                          <Progress
                            max="100"
                            value="20"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>

                    <td>Camera Ready Submission</td>
                  </tr> */}

                        </tbody>
                      ))}
                    </Table>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;

//20%-peertopeer review,40%-camera ready,60%-ppt submssion, 80%final verdict, 100%- published