import {createSlice, createAction} from '@reduxjs/toolkit';

export const FetchEnumStatus = {
  FETCHING: 'FETCHING',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
};

export const fetchStatusActionType = FetchEnumStatus;

const initialState = {
  campaignList: [],
  userData: [],
  apiStatus: null,
};

/**
 *  Action creator and type to fetch Campaign list
 */
export const fetchUserCampaignListCreator = createAction(
  'FETCH_CAMPAIGN_LIST',
);
export const fetchUserCampaignTypeName = fetchUserCampaignListCreator().type;


export const fetchStatusSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    /**
     *
     *  a property name gonna be the name of action
     *  its value is the reduce
     *
     *  If you need to define the param of the action, use PayloadAction<X> to define its type.
     *  In this use case, I need to an string param, so I define 'payloadAction<string' like below
     *
     **/
     update: (state, action) => {
      return {
        ...state,
        apiStatus: action.payload,
      };
    },
    setCampaignList: (state, action) => {
      return {...state, ...action.payload};
    },
    addCampaignList: (state, action) => {
      const campList = [...state.campaignList, ...action.payload]
      return {...state, campaignList: campList}
    }
  },
});

export const fetchStatusSliceReducer = fetchStatusSlice.reducer;
export const fetchStatusSliceActions = fetchStatusSlice.actions;
