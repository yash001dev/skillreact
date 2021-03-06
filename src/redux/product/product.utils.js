export const returnProduct=(collection,incomingData)=>{
    collection.length=0;
    const objectArray=Object.entries(incomingData);
    objectArray.forEach(([key,value])=>{
        value.id=key
        console.log("VALUE:",value);
        collection.push(value);
    })
    return collection;
}

export const deleteProduct=(collection,dataId)=>{
    console.log("DATAID:",dataId);
    const afterDeletionData=collection.filter((data)=>{
        return data.id!==dataId
    })
    return afterDeletionData;
}

export const editProduct=(collection,modiData,dataId)=>{
    console.log("EditId:",dataId);
    const modifiedData=collection.map((data)=>{
        return data.id===dataId?{...modiData}:data
    });
    return modifiedData;
}