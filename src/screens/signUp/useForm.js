import {useEffect, useState} from 'react';

const useForm=(validateInfo,signUpStart)=>{
    const [values,setValue]=useState({
        companyName:'',
        brandName:'',
        crn:'',
        categoryName:'',
        mobileNumber:'',
        email:'',
        address:'',
        state:'',
        city:'',
        area:'',
        ccno:'',
        password:'',
        cpassword:'',
    })

    const [errors,setErrors]=useState({
    })
    const [isSubmitting,setIsSubmitting]=useState(false)


    const handleChange=e=>{
        const {name,value}=e.target
        setValue({
            ...values,
            [name]:value
        })
    }

    const handleSubmit=e=>{
        e.preventDefault();
        setErrors(validateInfo(values));
        setIsSubmitting(true);
    };

    useEffect(()=>{
        if(Object.keys(errors).length===0 && isSubmitting){
            signUpStart(values);
        }
    })


    return {values,errors,handleChange,handleSubmit};

    
}

export default useForm;