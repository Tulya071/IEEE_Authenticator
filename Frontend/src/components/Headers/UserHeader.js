
import { Button, Container, Row, Col } from "reactstrap";


const UserHeader = ({userName, userEmail}) => {
  const copyCodeToClipboard = () => {
    // Copy code to clipboard
    navigator.clipboard.writeText(code)
      .then(() => {
        // Handle success
        alert('Code copied to clipboard:', code);
        // You can also add a toast or notification to indicate successful copying
      })
      .catch((error) => {
        // Handle error
        console.error('Error copying code to clipboard:', error);
        // You can also add a toast or notification to indicate copying failure
      });
  };
  const code=userName
  return (
    <>
      <div 
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello, Welcome to IEEE Portal!</h1>
              <h1 className="display-2 text-white">App_Code : {code}</h1>
              <button className="btn btn-primary" onClick={copyCodeToClipboard}>
                Copy Code
              </button>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've made
                with your work.
              </p>
              {/* <Button
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Edit profile
              </Button> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
