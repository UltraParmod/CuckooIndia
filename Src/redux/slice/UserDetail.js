import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Config from '../../Constants/Config';
import {postApi} from '../../Utils/commenFunction';

export const fetchUserDetail = createAsyncThunk(
  'fetchUserDetail',
  async userId => {
    try {
      const response = await postApi(Config.UserDetailApi, {userId: userId});
      // console.log('Updated Profile=> ', response);
      return response.subject[0];
    } catch (error) {
      console.log('error:', error);
      throw error;
    }
  },
);
const UserDetailSlice = createSlice({
  name: 'UserDetail',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserDetail.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export const selectUserDetail = state => state.UserDetail;
export default UserDetailSlice.reducer;
