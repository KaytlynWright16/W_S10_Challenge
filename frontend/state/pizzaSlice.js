import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const endpointA = 'http://localhost:9009/api/pizza/history';
const endpointB = '`http://localhost:9009/api/pizza/order'

export const fetchOrders = createAsyncThunk('pizza/fetchOrders', async () => {
    const res = await axios.get(endpointA);
    return res.data;
});

export const submitOrder = createAsyncThunk(
    'pizza/submitOrder',
    async (orderData, {rejectWithValue}) => {
        try {
            const res = await axios.post(endpointB, orderData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

const initialState = {
    orders: [], 
    filter: 'All',
    form: {
        fullName: '',
        size: '', 
        toppings: [], 
    },
    posting: false,
    error: null,
}

const pizzaSlice = createSlice({
    name: 'pizza', 
    initialState,
    reducers: {
        updateForm(state, {payload}) {
            state.form = {...state.form, ...payload};
        },
        toggleTopping(state, {payload}) {
            if (state.form.toppings.includes(payload)) {
                state.form.toppings = state.form.toppings.filter(t => t !== payload);
            } else {
                state.form.toppings.push(payload);
            }
        },
        setFilter(state, {payload}) {
            state.filter = payload;
        },
        resetForm(state) {
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchOrders.fulfilled, (state, {payload}) => {
            state.orders = payload;
        })
        .addCase(submitOrder.pending, state => {
            state.posting = false; 
            state.error = null;
        })
        .addCase(submitOrder.fullfulled, (state, {payload}) {
            state.posting = false;
            state.orders.push(payload)
        })
        .addCase(submitOrder.rejected, (state, {payload}) => {
            state.posting = false;
            state.error = null; 
        });
    },
});

export const {updateForm, toggleTopping, setFilter, resetForm} = pizzaSlice.actions;
export default pizzaSlice.reducer;