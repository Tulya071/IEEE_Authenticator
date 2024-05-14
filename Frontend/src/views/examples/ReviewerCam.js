import React, { useState, useEffect } from 'react';
import {
  
  Card,
  CardHeader,
  
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  Container,
  Row,
  Input,
} from 'reactstrap';

import Header from 'components/Headers/Header.js';
import axios from 'axios';

const ReviewerCam = () => {
  const [comments, setComments] = useState({});
  const [scores, setScores] = useState({});
  const [papersData, setPapersData] = useState([]);

  useEffect(() => {
    const fetchPaperData = async () => {
      try {
        // Fetch paper data from the backend
        const response = await axios.get('http://localhost:5209/api/review');
        setPapersData(response.data);
      } catch (error) {
        console.error('Error fetching paper data:', error.message);
      }
    };

    fetchPaperData();
  }, []);

  const handleCommentChange = (code, newComment) => {
    setComments((prevComments) => {
      const updatedComments = { ...prevComments };
      updatedComments[code] = newComment;
      return updatedComments;
    });
  };
  
  const handleScoreChange = (code, newScore) => {
    setScores((prevScores) => {
      const updatedScores = { ...prevScores };
      updatedScores[code] = newScore;
      return updatedScores;
    });
  };
  
  
  // ...
const submitReview = async (code) => {
    try {
      console.log('Submitting review for code:', code);
      console.log('Comments:', comments[code] || '');
      console.log('Score:', scores[code] || 0);

      const response = await axios.post('http://localhost:5209/api/review', {
        code: code,
        comments: comments[code] || '',
        score: scores[code] || 0,
        status: '1st Round Over',
      });

     

      // Handle success or show error messages
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
  };



  
  

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Pending Papers To Be Reviewed</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Paper</th>
                    <th scope="col">Application Number</th>
                    <th scope="col">Comments</th>
                    <th scope="col">Percentage</th>
                    <th scope="col">Score</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {papersData.map((paper, index) => (
    <tr key={paper._id}>
      <th scope="row">
        <Media className="align-items-center">
          <a
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          />
          <Media>
            <span className="mb-0 text-sm">{index + 1}</span>
          </Media>
        </Media>
      </th>
      
                      <td>{paper.code}</td>
                      <td>
                        <Input
                          type="text"
                          placeholder="Enter comments"
                          value={comments[paper.code] || ''}
                          onChange={(e) => handleCommentChange(paper.code, e.target.value)}
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{(scores[paper.code] || 0) * 10}%</span>
                          <div>
                            <Progress max="10" value={scores[paper.code] || 0} barClassName="bg-danger" />
                          </div>
                        </div>
                      </td>
                      <td>
                        <Input
                          type="number"
                          value={scores[paper.code] || 0}
                          onChange={(e) => handleScoreChange(paper.code, e.target.value)}
                        />
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
  onClick={(e) => {
    e.preventDefault();
    window.location.href = paper.driveLink; // Assuming 'paper' has the 'driveLink' property
  }}
>
  View
</DropdownItem>

<DropdownItem
  onClick={(e) => {
    e.preventDefault();
    submitReview(paper.code); // Call submitReview with the paper's _id
  }}
>
  Submit
</DropdownItem>

                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ReviewerCam;