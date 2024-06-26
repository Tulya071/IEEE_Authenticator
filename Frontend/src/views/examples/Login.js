import React, {useState} from "react";
import { useNavigate } from "react-router-dom";




// reactstrap components
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




const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setcode] = useState("");


    const handleLoginButtonClick =async () => {
      try {
        // Make a request to the authentication endpoint
        const response = await fetch('http://localhost:5203/api/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, code}),
          //navigate("admin/user-profile", { state: { code } });
        });
  
        const data = await response.json();
        if (data.success) {
          // Authentication successful, navigate to the desired page
          navigate("/admin/user-profile",{ state: { userCode: code, useremail: email} });
        } else {
          // Authentication failed, handle accordingly
          alert("Wrong Credentials!");
          console.error('Authentication failed:', data.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
        // Handle any unexpected errors
      }
      //old
      //navigate("/admin/user-profile");
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
              <big>Hello author!</big>
              <br></br>
              <big>Sign in with credentials</big>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                       <i className="ni ni-email-83" /> 
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Application No."
                    type="Application No."
                    autoComplete="new-Application No."
                    value={code}
                    onChange={(e) => setcode(e.target.value)}
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
              <small>Forgot password?</small>
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


export default Login;
