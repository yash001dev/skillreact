import ProductActionTypes from "./product.types";
import firebase from "./../../utils/config";
import { storage } from "../../utils/config";

export const fetchCollectionStart = () => ({
  type: ProductActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionSuccess = (data) => ({
  type: ProductActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: data,
});

export const fetchCollectionFailure = (error) => ({
  type: ProductActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: error,
});

export const addItemStart = () => ({
  type: ProductActionTypes.ADD_ITEM_START,
});

export const addItemSuccess = (item) => ({
  type: ProductActionTypes.ADD_ITEM_SUCCESS,
  payload: item,
});

export const addItemFailure = (error) => ({
  type: ProductActionTypes.ADD_ITEM_SUCCESS,
  payload: error,
});

export const deleteItemStart = () => ({
  type: ProductActionTypes.DELETE_ITEM_START,
});
export const deleteItemSuccess = (item) => ({
  type: ProductActionTypes.DELETE_ITEM_SUCCESS,
  payload: item,
});
export const deleteItemFailure = (error) => ({
  type: ProductActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: error,
});

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
export const ProductCollectionsList = (userId) => {
  return (dispatch) => {
    const newReference = firebase
      .database()
      .ref("companyData")
      .child(userId + "/products");
    dispatch(fetchCollectionStart());
    newReference
      .once("value")
      .then((snapshot) => {
        let tempData = snapshot.val();
        console.log("TEMPDATA:", tempData);
        dispatch(fetchCollectionSuccess(tempData));
      })
      .catch((error) => {
        dispatch(fetchCollectionFailure(error));
      });
  };
};

//Async for UpdateProduct

//Async For AddProduct
export const ProductCollectionsAddStart = (
  userData,
  userId,
  imageInfo,
  videoInfo
) => {
  return async (dispatch) => {
    const mediaData = [];
    const mediaPath = [];
    let videoArray=[];
    videoArray.push(videoInfo);
    const newReference = firebase
      .database()
      .ref("companyData")
      .child(userId + "/products");
    dispatch(addItemStart());
    console.log("ADD ITEM START:", userId);
    
    mediaData.push(imageInfo);
    mediaData.push(videoArray);
    let imageLink = [];
    for (let i = 0; i < mediaData.length; i++) {
      console.log("MEDIA LENGTH:",mediaData[i]);
      const uploadImage = storage
      .ref(`images/${mediaData[i].map((image) => image.name)}`)
      .put(mediaData[i]);

      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          dispatch(addItemFailure(error));
        },
        () => {
          storage
            .ref("images")
            .child(`${mediaData[i].map((image) => image.name)}`)
            .getDownloadURL()
            .then((url) => {
              imageLink = url;
              console.log("IMAGE LINK:", url);
              mediaPath.push(imageLink);
            });
        }
      );
    }
    setTimeout(() => {
      userData.image = mediaPath[1];
      userData.video = mediaPath[0];
      newReference
        .push(userData)
        .then((data) => {
          console.log("Before Add Item Success");
        })
        .catch((error) => {
          dispatch(addItemFailure(error));
        });
    }, 3000);
  };
};

//Edit Products
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
export const ProductCollectionDelete = (userId, itemId) => {
  return (dispatch) => {
    dispatch(deleteItemStart());
    console.log("DELETE ITEM START");
    firebase
      .database()
      .ref("companyData")
      .child(userId + "/products/" + itemId)
      .remove()
      .then((data) => {
        dispatch(deleteItemSuccess(itemId));
      })
      .catch((error) => dispatch(deleteItemFailure(error)));
  };
};
