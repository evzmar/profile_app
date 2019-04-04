import {createStore} from "redux";
import rootReducer from "../redux/modules/rootReducer";


const store = createStore(rootReducer);


export default store;
