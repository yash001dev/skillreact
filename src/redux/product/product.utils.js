export const returnProduct=(collection,incomingData)=>{
    const objectArray=Object.entries(incomingData);
    objectArray.forEach(([key,value])=>{
        value.id=key
        console.log("VALUE:",value);
        collection.push(value);
    })
    return collection;
}

