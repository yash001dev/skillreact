import BrandActionTypes from "./brand.types";
import firebase from '../../utils/config';
import {storage} from '../../utils/config';

export const fetchBrandStart=()=>({
    type:BrandActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchBrandSuccess=data=>({
    type:BrandActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload:data
});

export const fetchBrandFailure=error=>({
    type:BrandActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload:error
})

export const addItemStart=()=>({
    type:BrandActionTypes.ADD_ITEM_START,
});

export const addItemSuccess=item=>({
    type:BrandActionTypes.ADD_ITEM_SUCCESS,
    payload:item
});

export const addItemFailure=error=>({
    type:BrandActionTypes.ADD_ITEM_SUCCESS,
    payload:error
});

export const deleteItemStart=()=>({
    type:BrandActionTypes.DELETE_ITEM_START,
})
export const deleteItemSuccess=(item)=>({
    type:BrandActionTypes.DELETE_ITEM_SUCCESS,
    payload:item
})
export const deleteItemFailure=(error)=>({
    type:BrandActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload:error
})



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

//Async for UpdateProduct




//Async For AddProduct
export const ProductCollectionsAddStart=(userData,userId,imageInfo,videoInfo)=>{
    return async dispatch=>{
        const mediaData=[];
        const mediaPath=[];
        const newReference=firebase.database().ref('companyData').child(userId+'/products')
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


//Async function for mediaFile
// function uploadImageAsPromise (imageFile) {
//     return new Promise(function (resolve, reject) {
//         var storageRef = firebase.storage().ref(fullDirectory+"/"+imageFile.name);

//         //Upload file
//         var task = storageRef.put(imageFile);

//         //Update progress bar
//         task.on('state_changed',
//             function progress(snapshot){
//                 var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
//                 uploader.value = percentage;
//             },
//             function error(err){

//             },
//             function complete(){
//                 var downloadURL = task.snapshot.downloadURL;
//             }
//         );
//     });
// }


//Async For Delete
export const ProductCollectionDelete=(userId,itemId)=>{
    return dispatch=>{
        dispatch(deleteItemStart());
        console.log("DELETE ITEM START");
        firebase.database().ref('companyData').child(userId+'/products/'+itemId)
        .remove()
        .then((data)=>{
                dispatch(deleteItemSuccess(itemId))
            }
        )
        .catch((error)=>dispatch(deleteItemFailure(error)));
    }
}

