export const returnBrand=(collection,incomingData)=>{
    collection.length=0;
    const objectArray=Object.entries(incomingData);
    objectArray.forEach(([key,value])=>{
        value.id=key
        console.log("VALUE:",value);
        collection.push(value);
    })
    return collection;
}

export const deleteBrand=(collection,dataId)=>{
    console.log("DATAID:",dataId);
    const afterDeletionData=collection.filter((data)=>{
        return data.id!==dataId
    })
    return afterDeletionData;
}
