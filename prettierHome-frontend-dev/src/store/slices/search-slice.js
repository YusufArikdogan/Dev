import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchParams: {
        q: "",
        advert_type_id: "",
        category_id: "",
    },
    displayMode: "grid",
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchParams: (state, action) => {
            state.searchParams = action.payload;
        },
        resetSearchParams: (state) => {
            state.searchParams = initialState.searchParams;
        },
        setDisplayMode: (state, action) => {
            state.displayMode = action.payload;
        },
    }
})

export const { setSearchParams, resetSearchParams, setDisplayMode } = searchSlice.actions;
export default searchSlice.reducer;