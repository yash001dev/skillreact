export default function validateInfo(values){
    let errors={}

    //Company Name
    if(!values.companyName){
        errors.companyName="Company Name required";
    }

    //Brand Name
    if(!values.brandName){
        errors.brandName="Brand Name required";
    }

    //Company Represented Name
    if(!values.crn){
        errors.crn="Company Represented Name is Required"
    }

    //Category Represented Name
    if(!values.categoryName){
        errors.categoryName="One Category Should Be Selected From List"
    }

    //Mobile Number
    if(!values.mobileNumber){
        errors.mobileNumber="Mobile Number Should Be Required";
    }

    if(!/^\d{10}$/i.test(values.mobileNumber)){
        errors.mobileNumber="Phone number is invalid"
    }

    //Email
    if(!values.email){
        errors.email="Email required"
    }else if(!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(values.email)){
        errors.email="Email address is invalid"
    }

    //Address
    if(!values.address){
        errors.address="Address should Required";
    }

    //State
    if(!values.state){
        errors.state="State should Required"
    }

    //City
    if(!values.city){
        errors.city="City should Required"
    }

    
    //Area
    if(!values.area){
        errors.area="area should be required"
    }

    //Postal Code
    if(!values.postalCode){
        errors.postalCode="Postal Code Should be required";
    }

    //Company CIN No
    if(!values.ccno){
        errors.ccno="Company CIN should Required"
    }

    //Password
    if(!values.password){
        errors.password="Password Should Be Required"
    }

    //Confirm Password
    if(!values.cpassword){
        errors.cpassword="Confirm Password Should Be Required"
    }

    //Compare Password
    if(values.password===values.cpassword){
        errors.cpassword="Password Don't Match"
    }

    return errors;
}