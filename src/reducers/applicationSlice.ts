import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { applicationForAdd } from '../actions/application';


export interface ApplicationState {
    applications: Array<applicationForAdd>,
    count:number,
}

const initialState: ApplicationState = {
    applications: [],
    count: 0,
};


export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        saveApplicationsList: (state, action: PayloadAction<ApplicationState>) => {
            state.applications = action.payload.applications
            state.count = action.payload.count
        },
    },
});

export const { saveApplicationsList } = applicationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default applicationSlice.reducer;
