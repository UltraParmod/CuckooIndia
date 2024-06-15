import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Config from '../../Constants/Config';
import {postApi} from '../../Utils/commenFunction';

export const fetchListAddress = createAsyncThunk(
  'fetchListAddress',
  async body => {
    try {
      const res = await postApi(Config.UserAddressListApi, {userId: body});
      return res?.data?.addressList;
    } catch (error) {
      console.log('Save Address Api Error', error);
      throw error;
    }
  },
);

const UserListAdderssSlice = createSlice({
  name: 'UserListAdderss',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchListAddress.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchListAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(fetchListAddress.rejected, (state, action) => {
        state.isLoading = false;
        isError = true;
      });
  },
});
export const selectedAdderssList = state => state.UserListAdderss;
export default UserListAdderssSlice.reducer;
