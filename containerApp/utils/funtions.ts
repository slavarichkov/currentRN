import { Linking } from "react-native";

/**
 * Форматирует дату в строке в локализованный русский формат.
 *
 * @param {string} inputDate - Строка с датой в формате 'год-месяц-день'.
 * @returns {string} - Локализованная строка с датой в формате 'день месяц год' на русском языке.
 *                      Возвращает 'Неверная дата', если входная строка не является корректной датой.
 */
function formatDate(inputDate: string) {
    const dateObject = new Date(inputDate);

    if (isNaN(dateObject.getTime())) {
        return 'Неверная дата';
    }

    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(dateObject);

    return formattedDate;
}

/**
 * Отправляет электронное письмо через почтовый клиент устройства.
 *
 * @param {string} recipient - Адрес получателя.
 * @param {string} subject - Тема письма.
 * @param {string} body - Текст письма.
 * @param {() => void} errCallback - Callback, вызываемый в случае ошибки.
 * @returns {Promise<void>} Промис, который разрешается после выполнения операции.
 *
 * @example
 * sendEmail('recipient@example.com', 'Subject', 'Hello, Body!', () => {
 *   console.log('Error callback');
 * });
 */
const sendEmail = async (
    recipient: string,
    subject: string,
    body: string,
    errCallback: () => void) => {

    let mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    try {
        await Linking.openURL(mailtoUrl);
    } catch (error) {
        console.error('Произошла ошибка при открытии почтового клиента:', error);
        errCallback();
    }
};

export { formatDate, sendEmail }