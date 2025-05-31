import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, pokemons: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, pokemons: action.payload.pokemons };
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

// params: object of all the api params for the search bar
// page: number of the page to fetch
// To minimize the number of requests of the params, we will use the cancel token
// e.g. bulbasaur: would have b, bu, bul, ... we can cancel the previous request
export default function useFetchPokemons(params, page) {
  const [state, dispatch] = useReducer(reducer, {
    pokemons: [],
    loading: true,
  });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST }); //update the state to laoding
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=150", {
        cancelToken: cancelToken.token,
        params: { page: page, ...params },
      })
      .then((res) =>
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: { pokemons: res.data.results },
        }),
      )
      .catch((err) => {
        if (axios.isCancel(err)) return; //ignore the cancel error
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      });

    return () => {
      cancelToken.cancel(); //cancel the request if the component unmounts or params change
    };
  }, [params, page]);

  return state;
}
