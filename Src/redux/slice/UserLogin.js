import {createSlice, createAsyncThunk, combineSlices} from '@reduxjs/toolkit';
import Config from '../../Constants/Config';
import {postApi} from '../../Utils/commenFunction';

export const fetchUserLogin = createAsyncThunk(
  'fetchUserLogin',
  async props => {
    try {
      const response = await postApi(Config.UserLoginApi, {userName: props});
      // console.log('if User Login', response?.data);
      return response?.data;
    } catch (error) {
      console.log('error:', error);
      throw error;
    }
  },
);
const UserLoginSlice = createSlice({
  name: 'UserLogin',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    emptyLogin: state => {
      (state.data = null), state.isError, (state.isLoading = false);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserLogin.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const selectUserData = state => state.UserLogin.data;

export const {emptyLogin} = UserLoginSlice.actions;

export default UserLoginSlice.reducer;
