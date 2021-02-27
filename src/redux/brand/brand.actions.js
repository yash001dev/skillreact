import BrandActionTypes from "./brand.types";
import firebase from '../../utils/config';
import {storage} from '../../utils/config';

export const fetchBrandStart=()=>({
    type:BrandActionTypes.FETCH_BRAND_START,
});

export const fetchBrandSuccess=data=>({
    type:BrandActionTypes.FETCH_BRAND_SUCCESS,
    payload:data
});

export const fetchBrandFailure=error=>({
    type:BrandActionTypes.FETCH_BRAND_FAILURE,
    payload:error
})

export const addBrandStart=()=>({
    type:BrandActionTypes.ADD_BRAND_START,
});

export const addBrandSuccess=item=>({
    type:BrandActionTypes.ADD_BRAND_SUCCESS,
    payload:item
});

export const addBrandFailure=error=>({
    type:BrandActionTypes.ADD_BRAND_SUCCESS,
    payload:error
});

export const deleteBrandStart=()=>({
    type:BrandActionTypes.DELETE_BRAND_START,
})
export const deleteBrandSuccess=(item)=>({
    type:BrandActionTypes.DELETE_BRAND_SUCCESS,
    payload:item
})
export const deleteBrandFailure=(error)=>({
    type:BrandActionTypes.DELETE_BRAND_FAILURE,
    payload:error
})

export const editCollectionStart = () => ({
    type: ProductActionTypes.EDIT_COLLECTIONS_START,
  });
  
export const editCollectionSuccess = (data) => ({
    type: ProductActionTypes.EDIT_COLLECTIONS_SUCCESS,
    payload: data,
});
  
export const editCollectionFailure = (error) => ({
    type: ProductActionTypes.EDIT_COLLECTIONS_FAILURE,
    payload: error,
});



//Async For FetchProduct
export const BrandCollectionsList=(userId)=>{
    return dispatch=>{
        const newReference=firebase.database().ref('companyData').child(userId+'/brands')
        dispatch(fetchBrandStart());
        newReference.once('value').then(snapshot=>{
            let tempData=snapshot.val()
            console.log("TEMPDATA:",tempData)
            dispatch(fetchBrandSuccess(tempData));
        })
        .catch((error)=>{
            dispatch(fetchBrandFailure(error))
        })
    }
}

//Async for UpdateProduct




//Async For AddProduct
export const ProductCollectionsAddStart=(userData,userId,imageInfo,videoInfo)=>{
    return async dispatch=>{
        const mediaData=[];
        const mediaPath=[];
        const newReference=firebase.database().ref('companyData').child(userId+'/brands')
        dispatch(addItemStart());
        console.log("ADD ITEM START:",userId);
        const uploadImage=storage.ref(`images/${imageInfo.map(image=>image.name)}`).put(imageInfo);
        mediaData.push(imageInfo);
        mediaData.push(videoInfo);
        let imageLink=[];
        for(let i=0;i<mediaData.length;i++){
            uploadImage.on(
                "state_changed",
                snapshot=>{},
                error=>{
                    dispatch(addItemFailure(error))
                },
                ()=>{
                    storage.ref("images")
                    .child(`${mediaData[i].map(image=>image.name)}`)
                    .getDownloadURL()
                    .then(url=>{
                        imageLink=url
                        console.log("IMAGE LINK:",url);
                        mediaPath.push(imageLink);
                    })
                }
            )
        }
        setTimeout(() => {
            userData.image=mediaPath[0];
            userData.video=mediaPath[1];
            newReference.push(userData)
            .then((data)=>{
                console.log("Before Add Item Success")
            })
            .catch((error)=>{
                dispatch(addItemFailure(error))
            })
        }, 3000);
    }
}



export const BrandCollectionDelete=(userId,itemId)=>{
    return dispatch=>{
        dispatch(deleteBrandStart());
        console.log("DELETE ITEM START");
        firebase.database().ref('companyData').child(userId+'/brands/'+itemId)
        .remove()
        .then((data)=>{
                dispatch(deleteItemSuccess(itemId))
            }
        )
        .catch((error)=>dispatch(deleteItemFailure(error)));
    }

}


export const ProductCollectionsEditStart = (userId, modifiedData, itemId) => {
    return (dispatch) => {
      console.log("USERID:", modifiedData);
      const newReference = firebase
        .database()
        .ref("companyData")
        .child(userId + "/products" + itemId);
      dispatch(editCollectionStart());
      console.log("ADD ITEM START:", userId);
      newReference
        .update(modifiedData)
        .then((data) => {
          console.log("Item Edit SuccessFull");
          dispatch(editCollectionSuccess({ modifiedData, itemId }));
        })
        .catch((error) => {
          dispatch(editCollectionFailure(error));
        });
    };
  };
