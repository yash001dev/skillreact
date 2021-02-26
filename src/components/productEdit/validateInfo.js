import { CompanyName, Name, Category, middleCategory, subCategory, price, size, weight, color, mrp, discount } from './../../constants/message';


export default function validateInfo(values){

let errors={}

    //Company Name
    if(!values.companyName){
        errors.companyName=CompanyName
    }

    //Name
    if(!values.name){
        errors.name=Name
    }

    //Category
    if(!values.category){
        errors.category=Category
    }

    //MiddleCategory
    if(!values.middleCategory){
        errors.middleCategory=middleCategory
    }

    //SubCategory
    if(!values.subCategory){
        errors.subCategory=subCategory
    }

    //price
    if(!values.price){
        errors.price=price
    }

    //size
    if(!values.size){
        errors.size=size
    }

    //weight
    if(!values.weight){
        errors.weight=weight
    }

    //color
    if(!values.color){
        errors.color=color
    }

    //mrp
    if(!values.mrp){
        errors.mrp=mrp
    }

    //discount
    if(!values.discount){
        errors.discount=discount
    }

    return errors;
}