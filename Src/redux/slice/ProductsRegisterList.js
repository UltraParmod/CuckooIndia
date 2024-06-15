import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Config from '../../Constants/Config';
import {postApi} from '../../Utils/commenFunction';

export const fetchProductsRegisterList = createAsyncThunk(
  'fetchProductsRegisterList',
  async body => {
    try {
      const res = await postApi(Config.RequestServiceListApi, {userId: body});
      return res?.data?.serviceRequest;
    } catch (error) {
      console.error('error of service Products List Api ', error);
      throw error;
    }
  },
);

const ProductsRegisterListSlice = createSlice({
  name: 'ProductsRegisterList',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductsRegisterList.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProductsRegisterList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(fetchProductsRegisterList.rejected, (state, action) => {
        state.isLoading = false;
        isError = true;
      });
  },
});
export const selectedRequestList = state => state.ProductsRegisterList;
export default ProductsRegisterListSlice.reducer;
