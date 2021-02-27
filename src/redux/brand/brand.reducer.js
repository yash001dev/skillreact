import { act } from "react-dom/test-utils";
// import BrandActionTypes from "./product.types";
import { returnProduct, deleteProduct, editProduct } from './product.utils';
import { BrandActionTypes } from './brand.types';

const INITIAL_STATE={
    collections:[],
    isFetching:false,
    errorMessage:'',
};

const productReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case BrandActionTypes.ADD_BRAND_START:
        case ProductActionTypes.FETCH_COLLECTIONS_START:
        case ProductActionTypes.DELETE_ITEM_START:
        case ProductActionTypes.EDIT_COLLECTIONS_START:
            return{
                ...state,
                isFetching:true
            }
        case ProductActionTypes.ADD_BRAND_SUCCESS:
            return{
                ...state,
                isFetching:false,
                collections:[...state.collections,action.payload]
            }
        
        case ProductActionTypes.FETCH_BRAND_SUCCESS:
            console.log("PAYLOAD DATA:",action.payload)
            return{
                ...state,
                isFetching:false,
                collections:returnProduct(state.collections,action.payload)
            }

        case ProductActionTypes.EDIT_BRAND_SUCCESS:
            return{
                ...state,
                isFetching:false,
                collections:editProduct(state.collections,action.payload,action.payload.dataId)
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
        case ProductActionTypes.EDIT_COLLECTIONS_FAILURE:
            return{
                ...state,
                errorMessage:action.payload
            }
        default:
            return state;
    }
}

export default productReducer