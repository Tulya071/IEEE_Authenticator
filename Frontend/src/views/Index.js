import {
  Button,
  Card,
  CardBody,
  Col,
} from "reactstrap";


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Index() {
  const [activeNav, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    // navigate(`/submit`);
    if (role === "admin") {
      navigate("/auth/login2");
    } else if (role === "reviewer") {
      navigate("/auth/login1");
    } else if (role === "user") {
      navigate("/auth/register");
    }
  
  };


  return (
    // <div className="role-selection-page">
    //   <h1 className="Topic">Select Your Role</h1>
    //   <ul>
    //     <li>
    //       <button onClick={() => handleRoleClick("user")}>USER</button>
    //     </li>

    //     <li>
    //       <button onClick={() => handleRoleClick("reviewer")}>REVIEWER</button>
    //     </li>

    //     <li>
    //       <button onClick={() => handleRoleClick("admin")}>ADMIN</button>
    //     </li>
    //   </ul>
    // </div>
    <Col lg="5" md="10">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5" style={{backgroundImage:'url("assets\img\theme\team-4-800x800.jpg")'}}>
          <div className="text-center text-muted mb-4">
            <big>Select Your Role</big>
            <div className="text-center">
              <Button className="my-4" color="primary" type="button" onClick={() => handleRoleClick("user")}>
                Applicant
              </Button>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={() => handleRoleClick("reviewer")}>
                  Reviewer
                </Button>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={() => handleRoleClick("admin")}>
                  Admin
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default Index;
