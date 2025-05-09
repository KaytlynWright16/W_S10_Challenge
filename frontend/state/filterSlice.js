import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter', 
    initialState: 'All',
    reducers: {
        setFilter: (state, action) => action.payload
    }
});

export const {setFiltr} = filterSlice.selectSlice.actions;
export default filterSlice.reducer;