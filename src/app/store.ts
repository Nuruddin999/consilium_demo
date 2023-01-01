import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import applicationItemSlice from '../reducers/applicationItemSlice';
import applicationSlice from '../reducers/applicationSlice';
import uiSlice  from '../reducers/ui';
import userSlice from '../reducers/userSlice';
import runSagas from '../sagas';

export const rootReducer = combineReducers({
  user: userSlice,
  application:applicationSlice,
  applicationItem:applicationItemSlice,
  ui: uiSlice
})

export type RootState = ReturnType<typeof rootReducer>

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['listitem/getlistitem'],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(runSagas)

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;