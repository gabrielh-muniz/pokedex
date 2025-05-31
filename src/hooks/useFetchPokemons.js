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
      return {
        ...state,
        loading: false,
        pokemons: action.payload.pokemons,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
      };
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

export default function useFetchPokemons({ limit = 20, offset = 0 } = {}) {
  const [state, dispatch] = useReducer(reducer, {
    pokemons: [],
    loading: true,
    error: null,
    count: 0,
    next: null,
    previous: null,
  });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST }); //update the state to laoding
    axios
      .get("https://pokeapi.co/api/v2/pokemon", {
        cancelToken: cancelToken.token,
        params: { limit, offset },
      })
      .then((res) =>
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: {
            pokemons: res.data.results,
            count: res.data.count,
            next: res.data.next,
            previous: res.data.previous,
          },
        }),
      )
      .catch((err) => {
        if (axios.isCancel(err)) return; //ignore the cancel error
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      });

    return () => {
      cancelToken.cancel(); //cancel the request if the component unmounts or params change
    };
  }, [limit, offset]);

  return state;
}
