import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
// import { useEffect } from 'react';
import "../styles/style.css";

const LandingPage: React.FC = () => {
    // useEffect(() => {
    //     if (userInfo) {
    //       // Check if history object is available, otherwise fallback to default behavior
    //       if (history) {
    //         history.push("/mynotes");
    //       } else {
    //         window.location.href = "/mynotes"; // Fallback to window location
    //       }
    //     }
    //   }, [history, userInfo]);

  return (
    <div className='main'>
        <Container>
        <Row>
        <div className='intro-text'>
            <div>
                <h1 className='title'>Welcome to Leaflog</h1>
                <p className='subtitle'>One Safe Place for all your notes.</p>
            </div>
            <div className='buttonContainer'>
                <a href="/login">
                    <Button size='lg' className='landingbutton'>
                        Login
                    </Button>
                </a>
                <a href="/register">
                    <Button size='lg' className='landingbutton' variant='outline-primary'>
                        Signup
                    </Button>
                </a>
            </div>
        </div>
        </Row>
        </Container>
    </div>
  );
}

export default LandingPage;
