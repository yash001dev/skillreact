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
    const afterDeletionData=collection.forEach((data)=>{
        return data.id!==collection.id
    })
    return afterDeletionData;
}
