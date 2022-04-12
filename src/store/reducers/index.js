import { combineReducers } from "redux";
import { fetchStatusSliceReducer } from "./appSlice";

export const rootReducer = combineReducers({
  appState: fetchStatusSliceReducer,
});

export { fetchUserCampaignTypeName } from "../actions";
export { FetchEnumStatus, fetchStatusSliceActions } from "./appSlice";
