import {useState,useEffect} from 'react';


const useForm=(validateInfo1,emailSignInStart)=>{
    // const anything=useUser(ruser);
    //Method For Stepper Registration Label
    
    
    const [values,setValue]=useState({
        email:'',
        password:'',
    });

    const [isSubmitting,setIsSubmitting]=useState(false)
    const [errors,setErrors]=useState({
    })

   
    const handleChange=e=>{
        const {name,value}=e.target
        setValue({
            ...values,
            [name]:value
        })
    }

    //Form Submit
    const handleSubmit=e=>{
        console.log("Button is submit...");
        e.preventDefault();
        setErrors(validateInfo1(values));
        setIsSubmitting(true);
    }

    useEffect(()=>{
        if(Object.keys(errors).length===0 && isSubmitting){
            
            emailSignInStart(values.email,values.password);
            
        }
    })
   
    return{handleChange,handleSubmit,errors};
}

export default useForm;