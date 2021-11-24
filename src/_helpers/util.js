const lodash = require('lodash');
let fs = require('fs');
let {Readable} = require('stream');
let uuid = require('uuid');

// Functions for Example Tests =========================

function countOccurencesfromArray(arr){
    return lodash.countBy(arr);
}

function checkNumberIsAnEvenNumber(number) {
    return number % 2 === 0;
}

function checkIfObjectHasAttribute(obj, fieldName){
    return fieldName in obj;
}

function calcExponent(value, exponent){
    return Math.pow(value, exponent);
}

function truncateString(value, lengthToTruncate){
    if(value.length > lengthToTruncate){
        return value.substring(0, lengthToTruncate);
    } else {
        return value;
    }
}

function capitalizeString(value){
    let result = value.charAt(0).toUpperCase();
    let temp = value.substring(1, value.length);
    result += temp.toLowerCase();
    return result;
}

// =====================================================

function convertBufferToReadableStream(buffer){
    let stream = new Readable();
    stream._read = () => {};
    stream.push(buffer);
    stream.push(null);
    return stream;
}

function checkUndefinedOrNull(obj){
    return (obj === undefined || obj === null);
}

// checks if an Object with length is undefined, null or empty
function checkEmptinessOfObjectWithLength(value){
    if(checkUndefinedOrNull(value)){
        return true;
    } else if(value.length === 0){
        return true;
    } else {
        return false;
    }
}

function generateResultObject(success, resultData, reason){
    let resultObject = {
        success : success
    };
    if(success){
        resultObject.data = resultData;
    } else {
        resultObject.reason = reason;
    }

    return resultObject;
}

function checkObjectHasProperties(obj){
    return Object.keys(obj).length !== 0;
}

function sendServerError(res, msg){
    res.status(500).send(msg);
}

function sendSuccessWithJson(res, json){
    res.status(200).json(json);
}

function sendNotFound(res){
    res.status(404).send();
}

function prepareMetaObjectForImageStreamInFormData(filename, contentType, knownLength){
    return {
        filename: filename,
        contentType: contentType,
        knownLength: knownLength
    };
}

function isError(err){
    return err.constructor === Error;
}

function secondsToMilliseconds(sec){
    return sec * 1000;
}

async function waitTimePromise(time){
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
} 

function generateUniqueFilename(filename){
    let parts = filename.split('.');
    let joinString = '-' + uuid.v4() + '.';
    if(parts.length === 2){
        return parts.join(joinString);
    } else {
        let lastElement = parts.pop();
        let prevLastElement = parts.pop();
        let ending = prevLastElement + joinString + lastElement;
        let frontPart = parts.join('.');
        return frontPart + '.' + ending;
    }
}

function getNumberFromValue(val) {
    if(checkUndefinedOrNull(val)){
        return NaN;
    } else {
        return Number(val);
    }
}

function parseStringToBool(val) {
    let result = false;
    if(!checkUndefinedOrNull(val)){
        let valString = val.toString();
        if(val === true || valString.toLowerCase() === 'true' || valString === '1'){
            result = true;
        }
    }
    return result;
}

function isDateValid(date) {
    if(checkUndefinedOrNull(date)){
        return false;
    }

    return date.getTime() === date.getTime();
}

const notFoundStatusCode = 404;
const nonIndexInArrayCode = -1;

exports.countOccurencesfromArray = countOccurencesfromArray;
exports.checkNumberIsAnEvenNumber = checkNumberIsAnEvenNumber;
exports.checkIfObjectHasAttribute = checkIfObjectHasAttribute;
exports.calcExponent = calcExponent;
exports.truncateString = truncateString;
exports.capitalizeString = capitalizeString;

exports.convertBufferToReadableStream = convertBufferToReadableStream;
exports.checkEmptinessOfObjectWithLength = checkEmptinessOfObjectWithLength;
exports.generateResultObject = generateResultObject;
exports.checkUndefinedOrNull = checkUndefinedOrNull;
exports.checkObjectHasProperties = checkObjectHasProperties;
exports.sendServerError = sendServerError;
exports.sendSuccessWithJson = sendSuccessWithJson;
exports.sendNotFound = sendNotFound;
exports.prepareMetaObjectForImageStreamInFormData = prepareMetaObjectForImageStreamInFormData;
exports.notFoundStatusCode = notFoundStatusCode;
exports.nonIndexInArrayCode = nonIndexInArrayCode;
exports.isError = isError;
exports.waitTimePromise = waitTimePromise;
exports.secondsToMilliseconds = secondsToMilliseconds;
exports.generateUniqueFilename = generateUniqueFilename;
exports.getNumberFromValue = getNumberFromValue;
exports.parseStringToBool = parseStringToBool;
exports.isDateValid = isDateValid;