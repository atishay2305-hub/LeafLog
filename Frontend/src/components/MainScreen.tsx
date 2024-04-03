import React, { ReactNode } from 'react';
import { Container, Row } from 'react-bootstrap';
import "./Screen.css";

interface MainScreenProps {
  title?: string;
  children: ReactNode;
}

const MainScreen: React.FC<MainScreenProps> = ({ title, children }) => {
  return (
    <div className='mainback'>
      <Container>
        <Row>
          <div className='page'>
            {title && (
              <>
                <h1 className='heading'>{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default MainScreen;
