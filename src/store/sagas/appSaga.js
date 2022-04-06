import {takeEvery, call, put} from 'redux-saga/effects';
import {
  fetchStatusSliceActions,
  FetchEnumStatus,
  fetchUserCampaignTypeName,
} from '../reducers';
import data from './mockList'
import {mapCampListData} from '../../common/service'
/**
 * saga watcher to fetch the Camp List
 */
export function* fetchUserCampaignListWatcher() {
  yield takeEvery(fetchUserCampaignTypeName, fetchCampaignListWorker);
}
/**
 * worker function to send the api call to get all Campaign LIst
 */
export function* fetchCampaignListWorker() {
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    const response = yield call(
      fetch,
      apiUrl,
    );

    const responseData = yield response.json();
    const campList = mapCampListData(responseData, data.data);
    yield put(fetchStatusSliceActions.setCampaignList({campaignList:campList, userData: responseData}));
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
