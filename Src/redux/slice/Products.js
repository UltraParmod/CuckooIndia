import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {postNewApi} from '../../Utils/commenFunction';

export const fetchProducts = createAsyncThunk('Products', async props => {
  try {
    const response = await postNewApi({
      body: {
        operation: 'getProduct',
        data: [],
      },
    });
    let allProducts = response?.data;
    allProducts?.map(ele => {
      return (ele.id = ele.product_id), (ele.value = ele.product_name);
    });
    return allProducts;
  } catch (error) {
    console.log('error:', error);
    throw error;
  }
});

const ProductsSlice = createSlice({
  name: 'ProductsList',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const ProductsData = state => state.ProductsList.data;

export default ProductsSlice.reducer;
