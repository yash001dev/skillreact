import {useEffect, useState} from 'react';

const useForm=(validateInfo,userData,addProduct)=>{
    const [values,setValue]=useState({
        companyName:'',
        name:'',
        category:'',
        categoryName:'',
        middleCategory:'',
        subCategory:'',
        price:'',
        size:'',
        weight:'',
        color:'',
        mrp:'',
        discount:'',
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
            const id=userData.id;
            addProduct(values,id);
            setIsSubmitting(false)
        }
    })


    return {values,errors,handleChange,handleSubmit};

    
}

export default useForm;