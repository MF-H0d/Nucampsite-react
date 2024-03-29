// import { COMMENTS } from "../../app/shared/COMMENTS";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/shared/baseUrl";
import { mapImageURL } from "../../utils/mapImageURL";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetch(baseUrl + "comments");
    if (!response.ok) {
      return Promise.reject(`Unable to fetch, status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
);

const initialState = {
  commentsArray: [],
  isLoading: true,
  errMsg: "",
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      const newComment = {
        id: state.commentsArray.length + 1,
        ...action.payload,
      };
      state.commentsArray.push(newComment);
    },
  },
  extraReducers: {
    [fetchComments.pending]: (state) => {
      fetchComments.isLoading = true;
    },
    [fetchComments.fulfilled]: (state, action) => {
      fetchComments.isLoading = false;
      fetchComments.errMsg = "";
      fetchComments.commentsArray = mapImageURL(action.payload);
    },
    [fetchComments.rejected]: (state, action) => {
      fetchComments.isLoading = false;
      fetchComments.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    },
  },
});

export const commentsReducer = commentsSlice.reducer;

export const { addComment } = commentsSlice.actions;

export const selectCommentsByCampsiteId = (campsiteId) => (state) => {
  return state.comments.commentsArray.filter(
    (comment) => comment.campsiteId === parseInt(campsiteId)
  );
};
