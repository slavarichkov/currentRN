import { regexPassword } from "../../../../../../utils/regex"; 

function validationPassword(password, setIsValidationPassword, setValidationPasswordText, messageErrorPasswordValue, messageErrorPasswordLenght, messageErrorPasswordRegex, lenghtPassword) {

    if (password === '') {
        setIsValidationPassword(false);
        setValidationPasswordText(messageErrorPasswordValue);
    } else {

        if (password.length < lenghtPassword) {
            setIsValidationPassword(false);
            setValidationPasswordText(messageErrorPasswordLenght);
        } else {

            if (!regexPassword.test(password)) {
                setIsValidationPassword(false);
                setValidationPasswordText(messageErrorPasswordRegex);
            } else {
                setIsValidationPassword(true);
                setValidationPasswordText('');
            }
        }
    }
}

export {
    validationPassword
}