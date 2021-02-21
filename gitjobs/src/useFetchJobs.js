import {useReducer, useEffect} from "react";
import axios from "axios";

const ACTIONS = {
    MAKE_REQUEST: 'make_request',
    GET_DATA: 'get_data',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: 'update_has_next_page',
}

const BASE_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json"

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {loading: true, jobs: []}
        case ACTIONS.GET_DATA:
            return {
                ...state,
                loading: false,
                jobs: action.payload.jobs
            }
        case ACTIONS.ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                jobs: []
            }
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return {
                ...state, hasNextPage: action.payload.hasNextPage,
            }
        default:
            return state
    }
}

export default function useFetchJobs(params, page) {
    const initialState = {
        jobs: [],
        loading: true,
        error: false,
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        const cancelToken2 = axios.CancelToken.source()
        dispatch({type: ACTIONS.MAKE_REQUEST})
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: {
                markdown: true,
                page: page,
                ...params
            }
        }).then(response =>
            dispatch({
                type: ACTIONS.GET_DATA,
                payload: {
                    jobs: response.data
                },
            }))
            .catch(err => {
                    if (axios.isCancel(err)) return
                    dispatch({
                        type: ACTIONS.ERROR,
                        payload: {
                            error: err.message
                        }
                    })
                }
            )

        axios.get(BASE_URL, {
            cancelToken: cancelToken2.token,
            params: {
                markdown: true,
                page: page + 1,
                ...params
            }
        }).then(response =>
            dispatch({
                type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
                payload: {
                    hasNextPage: response.data.length !== 0,
                },
            }))
            .catch(err => {
                    if (axios.isCancel(err)) return
                    dispatch({
                        type: ACTIONS.ERROR,
                        payload: {
                            error: err.message
                        }
                    })
                }
            )

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
        }
    }, [params, page])

    return state
}