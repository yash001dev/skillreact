import { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';

const useForm = (validateInfo, userData, addProduct,) => {

  //Image Code 
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles:1,
  });

  const acceptedFilesItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}-{file.size} bytes
    </li>
  ));
  //End Image Code

  const [readyForUploadFile,setReadyForUploadFile]=useState(null);
  

  const [values, setValue] = useState({
    companyName: "",
    name: "",
    category: "",
    categoryName: "",
    middleCategory: "",
    subCategory: "",
    price: "",
    size: "",
    weight: "",
    color: "",
    mrp: "",
    discount: "",
    description:"",
    imageInfo:null,
    videoInfo:null,
    
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [videoFile, setVideoFile] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const onLoadVideoMetaData=(e)=>{
    setMetadata({
      videoHeight: e.target.videoHeight,
      videoWidth: e.target.videoWidth,
      duration: e.target.duration
    });
  }

  const storeVideoMetaData=(e)=>{
    const file=e.target.files[0];
    const size=e.target.files[0].size
    console.log("SIZE:",size);
    setVideoFile(file);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("VIDEO DURATION:",metadata);
    if(!metadata){
      alert("Please Select Video");
      if(metadata && metadata.duration>30){
        alert("Please Select up to 30 sec video");
        return;
      }
      return;
    }
    setReadyForUploadFile(acceptedFiles)
    setErrors(validateInfo(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const id = userData.id;
      addProduct(values, id,readyForUploadFile,readyForUploadFile);
      // const objectArray=Object.entries(values);
      // objectArray.forEach(([key,values])=>{
      //     setValue({...values,[key]:''})
      // });
      setValue({
        companyName: "",
        name: "",
        category: "",
        categoryName: "",
        middleCategory: "",
        subCategory: "",
        price: "",
        size: "",
        weight: "",
        color: "",
        mrp: "",
        discount: "",
        description:"",
      });
      setIsSubmitting(false);
    }
  });

  return { values, errors,acceptedFiles,acceptedFilesItems,getRootProps,getInputProps, handleChange, handleSubmit,onLoadVideoMetaData,videoFile,metadata,storeVideoMetaData};
};

export default useForm;
