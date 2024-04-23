import React, { createContext, useContext, useState } from "react";

const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
  const [submittedDataList, setSubmittedDataList] = useState([]);

  return (
    <PlantContext.Provider value={{ submittedDataList, setSubmittedDataList }}>
      {children}
    </PlantContext.Provider>
  );
};

export const usePlants = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error("usePlants must be used within a PlantProvider");
  }
  return context;
};
