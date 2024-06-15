import {combineReducers} from '@reduxjs/toolkit';
import UserLoginReducer from './slice/UserLogin';
import UserDetailReducer from './slice/UserDetail';
import ProductsDetailReducer from './slice/Products';
import SaveAddressReducer from './slice/SaveAddress';
import ProductsRegisterReducer from './slice/ProductsRegisterList';

const reducers = combineReducers({
  UserLogin: UserLoginReducer,
  UserDetail: UserDetailReducer,
  ProductsList: ProductsDetailReducer,
  SaveAddressList: SaveAddressReducer,
  ProductsRegisterList: ProductsRegisterReducer,
});

export default reducers;
