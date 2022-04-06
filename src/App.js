import React, {useEffect, useState} from 'react';
import TableComponent from './component/tableComponent'
import SearchComponent from './component/searchComponent'
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserCampaignListCreator, fetchStatusSliceActions} from './store/reducers/appSlice';
import { appSelector } from './store/selectors';
import './App.css';
import LoadingHoc from './component/HOC/LoadingHoc'
import moment from 'moment';
import {mapCampListData} from './common/service'

function App() {
  const [campList, setCampList] = useState([])
  // State use for clone of campList for searching purpose while clearing the search to reset it's original data
  const [cloneCampList, setCloneCampList] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const dispatch = useDispatch();
  const getCampaignList = useSelector(appSelector.getCampaignList())
  const getuserList = useSelector(appSelector.getUserList())

  // useEffect for dispatch a action to get List of Users from API
  useEffect(() => {
    dispatch(
        fetchUserCampaignListCreator(),
      );
}, [dispatch])

// Whenever anything changes in startDate, EndDate and getCampaignList this useEffect call and set Data accroding
useEffect(() => {
  let filteredData = []
  if(!startDate && !endDate) {
    filteredData = getCampaignList
  }
  else if(startDate && !endDate) {
    filteredData = getCampaignList.filter((rowData) => moment(rowData.startDate).isSameOrAfter(startDate));
    setCloneCampList(filteredData)
  } else if(!startDate && endDate) {
    filteredData = getCampaignList.filter((rowData) =>moment(rowData.endDate).isSameOrBefore(endDate));
    setCloneCampList(filteredData)
  } else if(startDate && endDate) {
    filteredData = getCampaignList.filter((rowData) => moment(rowData.startDate).isSameOrAfter(startDate) && moment(rowData.endDate).isSameOrBefore(endDate));
    setCloneCampList(filteredData)
  }
  setCampList(filteredData)
}, [getCampaignList, startDate, endDate])

/**
 * AddCampaigns method to add campaign from global through browser console
 * @param array compaing data
 * @returns dispatch a action that add compaign in store
 */
window.AddCampaigns = (arr) => {
  mapCampListData(getuserList, arr)
  const campListData = mapCampListData(getuserList, arr)
  dispatch(fetchStatusSliceActions.addCampaignList(campListData))
}

 /**
     * onChange method filter data on behalf of character that we enter in search box
     * @param name
     * @returns set CampList
     */

const onChange = (name) => {
  if(!!startDate || !!endDate) {
    if(!!name) {
      const filteredList = cloneCampList.filter((rowData) => {
        const nameLowecase = rowData?.username?.toLowerCase();
        return nameLowecase.indexOf(name.toLowerCase()) !== -1;
      });
      setCampList(filteredList)
    } else {
      setCampList(cloneCampList)
    }
  }
  else if(!!name) {
    const filteredList = getCampaignList.filter((rowData) => {
      const nameLowecase = rowData?.username?.toLowerCase();
      return nameLowecase.indexOf(name.toLowerCase()) !== -1;
    });
    setCampList(filteredList)
  } else {
    setCampList(getCampaignList)
  }
}

/**
  * handleStartDate when we select start date in calendar
  * @param startDate
  * @returns setStartDate 
*/
const handleStartDate = (startDate) => {
  setStartDate(startDate)
}

/**
  * handleEndDate when we select end date in calendar
  * @param endDate
  * @returns setEndDate 
*/
const handleEndDate = (endDate) => {
  setEndDate(endDate)
}
  return (
    <div className="App">
      <LoadingHoc>
        <SearchComponent 
          onChange={(name) => onChange(name)}
          onStartDateChange={handleStartDate}
          onEndDateChange={handleEndDate}
        />
        <TableComponent list={campList}/>
      </LoadingHoc>
    </div>
  );
}

export default App;
