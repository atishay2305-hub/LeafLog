import React, { ReactNode } from 'react';
import "./Screen.css";

interface MainScreenProps {
  title?: string;
  children: ReactNode;
}

const MainScreen: React.FC<MainScreenProps> = ({ title, children }) => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-md w-full">
            {title && (
              <>
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                <hr className="mb-4" />
              </>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
