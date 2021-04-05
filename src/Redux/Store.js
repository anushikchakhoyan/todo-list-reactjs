import { createStore } from 'redux';

const initialState = {
    helloText: "Hello Redux !",
    counter: 0,
    inputValue: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "changeGreetingText":
            return {
                ...state,
                helloText: action.text
            }
        case "plusCount":
            return {
                ...state,
                counter: state.counter + 1
            }
        case "minusCount":
            return {
                ...state,
                counter: state.counter - 1
            }
        case "setInputValue":
            return {
                ...state,
                inputValue: action.inputValue
            }
        default: return state;
    }
}

const store = createStore(reducer);
window.store = store;

export default store;
