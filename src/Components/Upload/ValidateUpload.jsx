
/**
 * Represents ValideUpload
 * @param {array} values 
 * @returns array
 * Function takes in an array of values set within useUplaod and checks them to see if they hold a value or not. 
 * If they do not hold a value then the array errors is given a variable of datasetName which is set equal to a stirng message.
 */
export default function ValidateUpload(values) {

    let errors = {};

    if (!values.datasetName.trim()){
        errors.datasetName = "Dataset name required.";
    }

    return errors;
}