import { fetchRequest } from "../lib/fetchAPI";

const initialState = {
  basketData: [],
  totalAmount: 0,
  amount: 0,
};

export const basketActionTypes = {
  GET_BASKET: "GET_BASKET",
  INCREMENT_BASKET_ITEM: "INCREMENT_BASKET_ITEM",
  DECREMENT_BASKET_ITEM: "DECREMENT_BASKET_ITEM",
  DEELETE_BASKET_ITEM: "DELETE_BASKET_ITEM",
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case basketActionTypes.GET_BASKET:
      return {
        ...state,
        basketData: action.payload,
      };

    case basketActionTypes.INCREMENT_BASKET_ITEM:
      return {
        ...state,
        basketData: action.payload,
      };

    case basketActionTypes.DECREMENT_BASKET_ITEM:
      return {
        ...state,
        basketData: action.payload,
      };

    case basketActionTypes.DEELETE_BASKET_ITEM:
      return {
        ...state,
        basketData: action.payload,
      };
    default:
      return state;
  }
};

export function getBasket() {
  return async (dispatch) => {
    try {
      const responce = await fetchRequest("/basket");
      dispatch({ type: basketActionTypes.GET_BASKET, payload: responce.items });
    } catch (err) {
      console.log(err);
    }
  };
}

export function incrementAmount(id, amount) {
  return async (dispatch) => {
    try {
      const responce = await fetchRequest(`/basketItem/${id}/update`, {
        method: "PUT",
        body: { amount: amount + 1 },
      });
      dispatch({
        type: basketActionTypes.INCREMENT_BASKET_ITEM,
        payload: responce.items,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
}

export function decrementAmount(id, amount) {
  return async (dispatch) => {
    if (amount !== 0) {
      const responce = await fetchRequest(`/basketItem/${id}/update`, {
        method: "PUT",
        body: { amount: amount },
      });
      dispatch({
        type: basketActionTypes.DECREMENT_BASKET_ITEM,
        payload: responce.items,
      });
    } else {
      const responce = await fetchRequest(`/basketItem/${id}/delete`, {
        method: "DELETE",
      });

      dispatch({
        type: basketActionTypes.DEELETE_BASKET_ITEM,
        payload: responce.items,
      });
    }
  };
}
