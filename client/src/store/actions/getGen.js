import axios from 'axios';
import { attachTokenToHeaders } from './authActions';
import {
  GET_GEN_LOADING,
  GET_GEN_SUCCESS,
  GET_GEN_FAIL
} from '../types';


export const getGen = () => async (dispatch, getState) => {
  dispatch({
    type: GET_GEN_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/gen', options);
    dispatch({
      type: GET_GEN_SUCCESS,
      payload: { messages: response.data },
    });
  } catch (err) {
    dispatch({
      type: GET_GEN_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
