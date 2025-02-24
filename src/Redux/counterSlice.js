import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../AxiosConfig/config';

// Lấy thông tin user bằng email
export const fetchUserById = createAsyncThunk(
  'fetchUserById',
  async (email) => {
    const response = await axios.get(`/user/user/${email}`);
    return response.data;
  }
);

// Thêm sản phẩm vào giỏ hàng
export const addProductToCart = createAsyncThunk(
  'addProductToCart',
  async (product) => {
    const response = await axios.post('/cart/cart', product);
    return response.data;
  }
);

// Lấy danh sách giỏ hàng của user
export const fetchCart = createAsyncThunk(
  'fetchCart',
  async (id) => {
    const response = await axios.get(`/cart/cart/${id}`);
    return response.data;
  }
);

// Xóa sản phẩm khỏi giỏ hàng
export const deleteItemCart = createAsyncThunk(
  'deleteItemCart',
  async ({ id_Cart, id_Product }) => {
    const response = await axios.delete(`/cart/cart`, {
      data: { id_Cart, id_Color_Memory: id_Product }
    });
    return response.data;
  }
);

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateQuantityCart = createAsyncThunk(
  'updateQuantityCart',
  async ({ id, id_Product, number }) => {
    const response = await axios.put("/cart/cart", {
      id_user: id,
      id_color_memory: id_Product,
      number
    });
    return response.data;
  }
);

// Khởi tạo state ban đầu
const initialState = {
  cart: { details: [] },  // Đảm bảo `details` luôn là một mảng để tránh lỗi khi truy cập
  stageProfile: null,
  stageLoad: "idle",
  stageLoadDelQuantity:"idle",
};

const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Lấy thông tin user
      .addCase(fetchUserById.pending, (state) => {
        state.stageLoad = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.stageProfile = action.payload;
        state.stageLoad = "success";
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.stageLoad = "failed";
      })

      // Thêm sản phẩm vào giỏ hàng
      .addCase(addProductToCart.pending, (state) => {
        state.stageLoad = "loading";
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        if (state.cart && state.cart.details) {
          state.cart.details.push(action.payload); // Thêm sản phẩm mới vào giỏ hàng
        } else {
          state.cart = { details: [action.payload] };
        }
        state.stageLoad = "success";
      })
      .addCase(addProductToCart.rejected, (state) => {
        state.stageLoad = "failed";
      })

      // Lấy danh sách giỏ hàng
      .addCase(fetchCart.pending, (state) => {
        state.stageLoad = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload || { details: [] };
        state.stageLoad = "success";
      })
      .addCase(fetchCart.rejected, (state) => {
        state.stageLoad = "failed";
      })

      // Xóa sản phẩm khỏi giỏ hàng
      .addCase(deleteItemCart.pending, (state) => {
        state.stageLoadDelQuantity = "loading";
      })
      .addCase(deleteItemCart.fulfilled, (state, action) => {
        if (state.cart && state.cart.details) {
          state.cart.details = state.cart.details.filter(
            (item) => item._id !== action.meta.arg.id_Product
          );
        }
        state.stageLoadDelQuantity = "success";

      })
      .addCase(deleteItemCart.rejected, (state) => {
        state.stageLoadDelQuantity = "failed";
      })

      // Cập nhật số lượng sản phẩm trong giỏ hàng
      .addCase(updateQuantityCart.pending, (state) => {
        state.stageLoadDelQuantity = "loading";

      })
      .addCase(updateQuantityCart.fulfilled, (state, action) => {
        if (state.cart && state.cart.details) {
          state.cart.details = state.cart.details.map((item) =>
            item._id === action.meta.arg.id_Product
              ? { ...item, number: action.meta.arg.number }
              : item
          );
        }
        state.stageLoadDelQuantity = "success";
      })
      .addCase(updateQuantityCart.rejected, (state) => {
        state.stageLoadDelQuantity = "failed";
      });
  },
});

export default counterSlice.reducer;
