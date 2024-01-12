const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(ru|рф|ру)$/;
const regexEmailEn = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z0-9-_.]+|\.[а-яА-ЯёЁ0-9-_.]+)$/;
const regexPassword = /^[a-zA-Z0-9]+$/;
const regexVerificationCode = /^[a-zA-Z0-9]+$/;
const regexLogin = /^[a-zA-Zа-яА-Я0-9_\-.,]+$/u;
const regexStrokeInput = /^[a-zA-ZÀ-öø-ÿА-Яа-яÄäÖöÜüßß0-9\s.,()-]*$/;
const regexNumericInput = /^[0-9.,]+$/;

/**
 * Проверяет, соответствует ли заданная строка предопределенному регулярному выражению.
 *
 * @param {string} stroke - Строка, которую необходимо проверить на соответствие регулярному выражению.
 * @returns {boolean} - True, если строка соответствует регулярному выражению, в противном случае false.
 */
function checkRegexStroke(stroke: string): boolean {
    if (regexStrokeInput.test(stroke)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Проверяет, соответствует ли значение счетчика предопределенному регулярному выражению.
 *
 * @param {string} counter - Строка, которую необходимо проверить на соответствие регулярному выражению.
 * @returns {boolean} - True, если строка соответствует регулярному выражению, в противном случае false.
 */
function chekRegexCounters(counter: string): boolean {
    if (regexNumericInput.test(counter)) {
        return true;
    } else {
        return false;
    }

}

export {
    regexEmail, regexPassword, regexVerificationCode, regexLogin, regexStrokeInput, regexNumericInput, regexEmailEn,
    checkRegexStroke, chekRegexCounters,
}