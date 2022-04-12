import React from "react";
import "./styles.css";
import { convertToCurrencySystem } from "../../utils/helper";
import { INACTIVE, ACTIVE, NO_RECORDS } from "../../common/constant";
const ReportPage = ({ list }) => {
  /**
   * Get current date
   * @returns {string}
   */
  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };
  /**
   * active in-active label showing logic
   * @param startDate
   * @param endDate
   * @returns {boolean}
   */
  const checkActiveness = (startDate, endDate) => {
    let activeStatus = null;
    const compareWithStartDate =
      Date.parse(startDate) < Date.parse(getCurrentDate());
    const compareWithEndDate =
      Date.parse(getCurrentDate()) < Date.parse(endDate);
    compareWithStartDate && compareWithEndDate
      ? (activeStatus = true)
      : (activeStatus = false);
    return activeStatus;
  };

  /**
   * Budget value processing
   * @param budget
   * @returns {string}
   */
  const processBudgetInUSD = (budget) => {
    let budgeResult = budget ? convertToCurrencySystem(budget) : "";
    return budgeResult;
  };
  /**
   * Render table data
   * @param list
   * @returns {*}
   */
  const processTableData = (list) => {
    const processedList = list.map((rowData, index) => {
      const activeStatus = checkActiveness(rowData.startDate, rowData.endDate);
      return (
        <tr key={rowData.id}>
          <td>{rowData.name}</td>
          <td>{rowData.username}</td>
          <td>{rowData.startDate}</td>
          <td>{rowData.endDate}</td>
          <td>
            <span className={activeStatus ? "active" : "inActive"}></span>
            <span>{activeStatus ? ACTIVE : INACTIVE}</span>
          </td>
          <td>{processBudgetInUSD(rowData.budget)}</td>
        </tr>
      );
    });
    return processedList;
  };
  /**
   * Render table structure
   * @returns {*}
   */
  const renderTable = () => {
    return (
      <div className="table-container">
        <table className="table table-striped">
          <thead className="table-header">
            <tr>
              <th>Name</th>
              <th>User Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Active</th>
              <th>Budget (USD)</th>
            </tr>
          </thead>
          <tbody>{processTableData(list)}</tbody>
        </table>
      </div>
    );
  };

  const renderBlankRecord = () => <div className="noRecords">{NO_RECORDS}</div>;
  return <div>{list?.length > 0 ? renderTable() : renderBlankRecord()}</div>;
};

export default ReportPage;
