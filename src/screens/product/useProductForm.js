import { useState } from 'react';

const useProductForm=(userData,deleteData)=>{
    const [deleteId,setDeleteId]=useState('');
    const [deleteOpen,setDeleteOpen]=useState(false);

    const deleteHandleClickClose=(data)=>{
        setDeleteOpen(false);
    }

    const deleteHandleClickOpen=(data)=>{
        console.log("DELETE ID:",data);
        setDeleteId(data);
        setDeleteOpen(true);
    }

    const handleDelete=()=>{
        console.log("Delete Button is Called...");
        deleteData(userData.id,deleteId);
        setDeleteOpen(false);
    }

    return {deleteId,deleteOpen,deleteHandleClickOpen,deleteHandleClickClose,handleDelete}
}

export default useProductForm;