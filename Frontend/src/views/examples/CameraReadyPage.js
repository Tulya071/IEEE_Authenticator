import React, { useState } from 'react';
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

const CameraReadyPage = () => {
  const [paperTitle, setPaperTitle] = useState('');
  const [authors, setAuthors] = useState(['']);
  const [abstract, setAbstract] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleAuthorChange = (index, value) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
  };

  const handleAddAuthor = () => {
    // Allow adding up to 3 authors
    if (authors.length < 4) {
      setAuthors([...authors, '']);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are at least 1 and at most 4 authors
    const filteredAuthors = authors.filter((author) => author.trim() !== '');
    if (filteredAuthors.length === 0 || filteredAuthors.length > 4) {
      setSubmissionStatus('Error: Number of authors should be between 1 and 4');
      return;
    }

    // Perform submission logic (mock example)
    try {
      // Mock API call
      const response = await mockSubmitPaper({
        paperTitle,
        authors: filteredAuthors.join(', '),
        abstract,
        driveLink,
      });

      // Display submission status
      setSubmissionStatus(response.success ? 'Submission successful!' : 'Submission failed');
    } catch (error) {
      console.error('Error during submission:', error);
      setSubmissionStatus('Submission failed');
    }
  };

  // Mock API function
  const mockSubmitPaper = (data) => {
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
              <small>Camera Ready Submission</small>
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
                    name="paper title"
                    placeholder="Paper Title"
                    type="text"
                    onChange={(e) => setPaperTitle(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  {authors.map((author, index) => (
                    <div>
                    <Input
                      key={index}
                      type="text"
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      placeholder={`Author ${index + 1}`}
                    />
                    </div>
                  ))}
                  {authors.length < 5 && (
                    <Button onClick={handleAddAuthor} color="primary" className="ml-2">
                      +
                    </Button>
                  )}
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="abstract"
                    placeholder="Abstract"
                    type="text"
                    onChange={(e) => setAbstract(e.target.value)}
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
                    onChange={(e) => setDriveLink(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>

              {/* Submit Button */}
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default CameraReadyPage;
