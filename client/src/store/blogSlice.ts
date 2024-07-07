import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BlogState {
  Blogcount: number;
  Blogdata: any[]; 
  Blogloading: boolean;
  Blogerror: string | null;
}

const initialState: BlogState = {
  Blogcount: 0,
  Blogdata: [],
  Blogloading: false,
  Blogerror: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    fetchBlogsStart(state) {
      state.Blogloading = true;
      state.Blogerror = null;
    },
    fetchBlogsSuccess(state, action: PayloadAction<{ count: number; data: any[] }>) {
      state.Blogloading = false;
      state.Blogcount = action.payload.count;
      state.Blogdata = action.payload.data;
    },
    fetchBlogsFailure(state, action: PayloadAction<string>) {
      state.Blogloading = false;
      state.Blogerror = action.payload;
    },
  },
});

export const { fetchBlogsStart, fetchBlogsSuccess, fetchBlogsFailure } = blogSlice.actions;

export default blogSlice.reducer;
