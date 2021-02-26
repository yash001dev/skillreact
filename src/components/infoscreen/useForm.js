import { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';

const useForm = (validateInfo, userData, addProduct) => {

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
    imageInfo:null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReadyForUploadFile(acceptedFiles)
    setErrors(validateInfo(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const id = userData.id;
      addProduct(values, id,readyForUploadFile);
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
        imageInfo:null,
      });
      setIsSubmitting(false);
    }
  });

  return { values, errors,acceptedFiles,acceptedFilesItems,getRootProps,getInputProps, handleChange, handleSubmit };
};

export default useForm;
