import ProductActionTypes from "./product.types";
import firebase from './../../utils/config';

export const fetchCollectionStart=()=>({
    type:ProductActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionSuccess=data=>({
    type:ProductActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload:data
});

export const fetchCollectionFailure=error=>({
    type:ProductActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload:error
})

export const addItemStart=()=>({
    type:ProductActionTypes.ADD_ITEM_START,
});

export const addItemSuccess=item=>({
    type:ProductActionTypes.ADD_ITEM_SUCCESS,
    payload:item
});

export const addItemFailure=error=>({
    type:ProductActionTypes.ADD_ITEM_SUCCESS,
    payload:error
});



//Async For FetchProduct
export const ProductCollectionsList=(userId)=>{
    return dispatch=>{
        const newReference=firebase.database().ref('companyData').child(userId+'/products')
        dispatch(fetchCollectionStart());
        newReference.once('value').then(snapshot=>{
            let tempData=snapshot.val()
            console.log("TEMPDATA:",tempData)
            dispatch(fetchCollectionSuccess(tempData));
        })
        .catch((error)=>{
            dispatch(fetchCollectionFailure(error))
        })
    }
}


//Async For AddProduct
export const ProductCollectionsAddStart=(userData,userId)=>{
    return dispatch=>{
        const newReference=firebase.database().ref('companyData').child(userId+'/products')
        dispatch(addItemStart());
        console.log("ADD ITEM START:",userId);
        newReference.push(userData)
        .then((data)=>{
            console.log("Before Add Item Success")
            dispatch(addItemSuccess(userData))
        })
        .catch((error)=>{
            dispatch(addItemFailure(error))
        })
    }
}
