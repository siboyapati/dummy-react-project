import {
  GET_GEN_LOADING,
  GET_GEN_SUCCESS,
  GET_GEN_FAIL,
} from '../types';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};
// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_GEN_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_GEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload.messages,
      };
    case GET_GEN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    default:
      return state;
  }
}
