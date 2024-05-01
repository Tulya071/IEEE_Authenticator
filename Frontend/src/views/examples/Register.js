import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader';

// ... (your existing imports)

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    driveLink: '',
    sector: '', // New state for the sector dropdown
  });
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateAlphanumericCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if all required fields are filled
    if (!formData.name || !formData.email || !formData.driveLink || !formData.sector) {
      console.error('All fields are required.');
      return;
    }
  
    try {
      // Generate a new alphanumeric code
      const newCode = generateAlphanumericCode();
      setCode(newCode);
  
      // Create URLSearchParams with name, email, code, driveLink, and sector
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('driveLink', formData.driveLink);
      params.append('code', newCode);
      params.append('sector', formData.sector);
  
      // Send a POST request to the backend with URLSearchParams
      const response = await axios.post(
        'http://localhost:5208/api/users/register',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      // Handle success if needed
      console.log('Registration successful!', response.data);
      return <UserHeader />;
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error.message);
  
      // Check if the error is due to a duplicate paper
      if (error.response && error.response.status === 400) {
        alert('This paper has already been uploaded.');
      } else {
        alert('Error submitting form. Please try again later.');
      }
    }
  };
  
  const handleLoginButtonClick = () => {
    navigate('auth/login');
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Submit Your Research Paper</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="name"
                    placeholder="Name"
                    type="text"
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-cloud-download-95" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="driveLink"
                    placeholder="Google Drive Link"
                    type="text"
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-settings-gear-65" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="select"
                    name="sector"
                    id="sector"
                    value={formData.sector} // Set the selected value
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select Research Sector</option>
                    <option value="Aerospace">Aerospace</option>
                    <option value="BioEngg">BioEngg</option>
                    <option value="commEngg">commEngg</option>
                    <option value="Photonics">Photonics</option>
                    <option value="Radar">Radar</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Circuits">Circuits</option>
                    <option value="GeoSc">GeoSc</option>
                  </Input>
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>

            {code && (
              <div className="text-center mt-3">
                <strong>Your Application Code:</strong> {code}. Keep your Application Number for future logins.
              </div>
            )}
            <div className="text-center">
              <Button className="mt-4" color="primary" type="button" onClick={() => handleLoginButtonClick()}>
                Log In
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
