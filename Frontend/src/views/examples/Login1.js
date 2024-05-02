// reactstrap components
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    //CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
  } from "reactstrap";
  

  
  const Login1 = () => {
    const [emailRev, setemailRev] = useState("");
    const [passwordRev, setpasswordRev] = useState("");
    const navigate = useNavigate();

    const handleemailRevChange = (e) => {
      setemailRev(e.target.value);
    };
  
    const handlepasswordRevChange = (e) => {
      setpasswordRev(e.target.value);
    };
  
    const handleLoginButtonClick =async () => {
      try {
        const response = await fetch("http://localhost:5204/api/authenticate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailRev, passwordRev }),
        });
  
        if (response.ok) {
          // Authentication successful, redirect or perform other actions
          navigate("/admin/reviewer");
        } else {
          // Authentication failed, handle accordingly
          alert("Wrong Credentials!");
          console.error("Authentication failed");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
      }
      //navigate("/admin/reviewer");
    };



    return (
      <>
         <Col lg="5" md="10">
          <Card className="bg-secondary shadow border-0"> 
            {/* <CardHeader className="bg-transparent pb-5">  */}
              {/* <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>  */}
              {/* <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/icons/common/github.svg")
                          .default
                      }
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/icons/common/google.svg")
                          .default
                      }
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div> */}
            {/* </CardHeader> */}
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <big>Sign in with credentials</big>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                         <i className="ni ni-emailRev-83" /> 
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-emailRev"
                      value={emailRev}
                      onChange={handleemailRevChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-passwordRev"
                      value={passwordRev}
                      onChange={handlepasswordRevChange}
                    />
                  </InputGroup>
                </FormGroup>
                {/* <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div> */}
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={() => handleLoginButtonClick()}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            {/* <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot passwordRev?</small>
              </a>
            </Col> */}
            {/* <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>*/}
          </Row>
        </Col>
      </>
    );
  };
  
  export default Login1;
  