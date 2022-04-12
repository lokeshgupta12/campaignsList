import { createStore, applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas";
import { rootReducer } from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMiddleware);
const store = createStore(rootReducer || (() => {}), enhancer);

export const getStore = () => store;

sagaMiddleware.run(rootSaga);
