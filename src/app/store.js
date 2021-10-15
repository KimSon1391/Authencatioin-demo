import userReducer from '../feature/Auth/userSlice';
import cartReducer from '../feature/Cart/cartSlice';
const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
