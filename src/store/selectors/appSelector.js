import { createSelector } from "@reduxjs/toolkit";

const getAppData = (state) => state.appState;
const fetchCampaignList = createSelector(
  [getAppData],
  (data) => data?.cloneFilterList
);

const fetchApiStatus = createSelector([getAppData], (data) => data?.apiStatus);

const fetchUserList = createSelector([getAppData], (data) => data?.userData);

export const appSelector = {
  getCampaignList: () => fetchCampaignList,
  getAPIStatus: () => fetchApiStatus,
  getUserList: () => fetchUserList,
};
