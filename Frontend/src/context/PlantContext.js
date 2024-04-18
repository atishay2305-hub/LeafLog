import React, { createContext, useState, useContext } from "react";

const PlantContext = createContext();

export const usePlants = () => useContext(PlantContext);

export const PlantProvider = ({ children }) => {
  const [submittedDataList, setSubmittedDataList] = useState([]);

  const value = {
    submittedDataList,
    setSubmittedDataList,
  };

  return (
    <PlantContext.Provider value={value}> {children} </PlantContext.Provider>
  );
};
