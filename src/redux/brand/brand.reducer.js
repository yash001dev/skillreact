import { act } from "react-dom/test-utils";
import ProductActionTypes from "./product.types";
import { returnProduct,deleteProduct } from './product.utils';

const INITIAL_STATE={
    collections:[],
    isFetching:false,
    errorMessage:'',
};

const productReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case ProductActionTypes.ADD_ITEM_START:
        case ProductActionTypes.FETCH_COLLECTIONS_START:
        case ProductActionTypes.DELETE_ITEM_START:
            return{
                ...state,
                isFetching:true
            }
        case ProductActionTypes.ADD_ITEM_SUCCESS:
            return{
                ...state,
                isFetching:false,
                collections:[...state.collections,action.payload]
            }
        
        case ProductActionTypes.FETCH_COLLECTIONS_SUCCESS:
            console.log("PAYLOAD DATA:",action.payload)
            return{
                ...state,
                isFetching:false,
                collections:returnProduct(state.collections,action.payload)
            }
        
        case ProductActionTypes.DELETE_ITEM_SUCCESS:
            console.log("DELETE ITEM WAS CALLED...");
            return{
                ...state,
                isFetching:false,
                collections:deleteProduct(state.collections,action.payload)
            }
            
        case ProductActionTypes.ADD_ITEM_FAILURE:
        case ProductActionTypes.FETCH_COLLECTIONS_FAILURE:
        case ProductActionTypes.DELETE_ITEM_FAILURE:
            return{
                ...state,
                errorMessage:action.payload
            }
        
        default:
            return state;
    }
}

export default productReducer