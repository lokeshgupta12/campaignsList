import React from "react";
import { useSelector } from "react-redux";
import { appSelector } from "../../../store/selectors";
import { FetchEnumStatus } from "../../../store/reducers";
import "./styles.css";

const LoadingHoc = ({ children }) => {
  const getAPIStatus = useSelector(appSelector?.getAPIStatus());
  return (
    <>
      {getAPIStatus === FetchEnumStatus?.FETCHING && (
        <div className="coverSpin"></div>
      )}
      {children}
    </>
  );
};

export default LoadingHoc;
