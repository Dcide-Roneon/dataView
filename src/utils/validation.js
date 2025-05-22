export function isValidLatitude(value){
    const num = Number(value);
    return !isNaN(num)&& num>= -90&& num <= 90;
}

export function isValidLongitude(value){
    const num = Number(value);
    return !isNaN(num) && num>= -180 &&num <= 180;
}
export function isValidCapacity(value){
    const num = Number(value);
    return !isNaN(num) && num>0;
}

