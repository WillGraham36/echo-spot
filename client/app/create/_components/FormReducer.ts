

export const INITAL_STATE = {
    error: "",
    loading: false,
};

interface Actions {
    type: "CREATE_START" | "CREATE_SUCCESS" | "CREATE_ERROR";
    payload?: any;
}
interface State {
    error: string;
    loading: boolean;
}


export const FormReducer = (state: State, action: Actions) => {
    switch (action.type) {
        case "CREATE_START":
            return {
                ...state,
                loading: true,
            };
        case "CREATE_SUCCESS":
            return {
                error: "",
                loading: false,
            };
        case "CREATE_ERROR":
            return {
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

