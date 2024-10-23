import { createStore } from "redux";
let INTITal={
    counter:0
}
const storeReducer=(curstore=INTITal,action)=>{
    if(action.type==="INC"){
        return {counter:curstore.counter+1}
    }
    else if(action.type==="DEL"){
        return {counter:curstore.counter-1}
    }
return curstore;
}
const UseStore=createStore(storeReducer);
export default UseStore;