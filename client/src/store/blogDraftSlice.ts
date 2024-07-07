import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BlogDraft {
    BlogDraftcount: number;
  BlogDraftdata: any[]; 
  BlogDraftloading: boolean;
  BlogDrafterror: string | null;
}

const initialState: BlogDraft = {
    BlogDraftcount: 0,
  BlogDraftdata: [],
  BlogDraftloading: false,
  BlogDrafterror: null,
}

const blogDraftSlice = createSlice({
    name: 'blogDraft',
    initialState,
    reducers: {
        fetchBlogsDraftStart(state) {
            state.BlogDraftloading = true;
            state.BlogDrafterror = null;
        },
        fetchBlogDraftSuccess(state, action: PayloadAction<{count: number; data: any[]}>) {
            state.BlogDraftloading = false;
      state.BlogDraftcount = action.payload.count;
      state.BlogDraftdata = action.payload.data;
        },
        fetchBlogsDraftFailure(state, action: PayloadAction<string>) {
            state.BlogDraftloading = false;
      state.BlogDrafterror = action.payload;
        }
    }
})

export const {fetchBlogDraftSuccess, fetchBlogsDraftFailure, fetchBlogsDraftStart} = blogDraftSlice.actions

export default blogDraftSlice.reducer