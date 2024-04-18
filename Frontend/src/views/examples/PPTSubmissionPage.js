import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  //InputGroupText,
  InputGroup,
  Col,
} from 'reactstrap';

const PPTSubmissionPage = () => {
  const [pptFile, setPPTFile] = useState(null);
  const [presentationVideo, setPresentationVideo] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handlePPTFileChange = (e) => {
    const file = e.target.files[0];
    setPPTFile(file);
  };

  const handlePresentationVideoChange = (e) => {
    const file = e.target.files[0];
    setPresentationVideo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both PPT file and presentation video are provided
    if (!pptFile || !presentationVideo) {
      setSubmissionStatus('Error: Please provide both PPT file and presentation video');
      return;
    }

    // Perform submission logic (mock example)
    try {
      // Mock API call
      const response = await mockSubmitPPT({
        pptFile,
        presentationVideo,
      });

      // Display submission status
      setSubmissionStatus(response.success ? 'Submission successful!' : 'Submission failed');
    } catch (error) {
      console.error('Error during submission:', error);
      setSubmissionStatus('Submission failed');
    }
  };

  // Mock API function
  const mockSubmitPPT = (data) => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // Mock response
        resolve({ success: true, data });
      }, 1000);
    });
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>PPT Presentation Round Submission</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              {/* PPT File Input */}
              <FormGroup className="mb-3">
                <label htmlFor="pptFile" className="form-control-label d-block">
                  <i className="ni ni-folder-17 mr-2" /> PPT File
                </label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    {/* <InputGroupText>
                      <i className="ni ni-folder-17" />
                    </InputGroupText> */}
                  </InputGroupAddon>
                  <Input
                    type="file"
                    accept=".ppt, .pptx"
                    id="pptFile"
                    onChange={handlePPTFileChange}
                  />
                </InputGroup>
              </FormGroup>

              {/* Presentation Video Input */}
              <FormGroup className="mb-3">
                <label htmlFor="presentationVideo" className="form-control-label d-block">
                  <i className="ni ni-collection mr-2" /> Presentation Video
                </label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    {/* <InputGroupText>
                      <i className="ni ni-collection" />
                    </InputGroupText> */}
                  </InputGroupAddon>
                  <Input
                    type="file"
                    accept=".mp4, .avi, .mov"
                    id="presentationVideo"
                    onChange={handlePresentationVideoChange}
                  />
                </InputGroup>
              </FormGroup>

              {/* Submit Button */}
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Submit
                </Button>
              </div>

              {/* Submission Status */}
              {submissionStatus && (
                <div className="text-center mt-3 text-success">
                  {submissionStatus}
                </div>
              )}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default PPTSubmissionPage;
