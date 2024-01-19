/**
 * @typedef {Object} TranslationObject
 * @property {string} - Перевод.
 */

/**
 * @typedef {Object} Translate
 * @property {TranslationObject} ru - Русский язык.
 * @property {TranslationObject} en - Английский язык.
 */

/**
 * Объект с переводами для разных языков.
 * @type {Translate}
 * @example
 * const translate = {
 *   ru: {
 *     'hello': 'привет',
 *   },
 *   en: {
 *     'hello': 'hello',
 *   }
 * };
 */

interface Translates {
    [lang: string]: {
        [key: string]: string;
    };
}

const translates: Translates = {
    ru: {
        hello: 'привет',
        countersScreen: 'Счетчики',
        hotWater: 'Горячая вода',
        coldWater: 'Холодная вода',
        placeHolderInputCouner: 'Введите показания',
        send: 'Отправить',
        save: 'Сохранить',
        validMessageValues: 'Пропущено одно из полей',
        validMessageRegex: 'Пожалуйста, проверьте символы - допустимы цифры и ,.',
        counterData: 'Данные счетчика',
        dateOfCounterVerification: 'Дата поверки',
        dateOfCounterVerificationNext: 'Дата следующей поверки',
        number: 'Номер',
        placeholderDate: 'Дата поверки',
        placeholderDateNext: 'След.дата',
        update: 'Редактировать',
        settingsScreen: 'Настройки',
        activeAddress: 'Активный адрес',
        city: 'Город',
        street: 'Улица',
        building: 'Здание',
        apartment: 'Помещение',
        email: 'Email',
        instructionAddress: 'Кликните на адрес для работы с ним',
        addresses: 'Адреса',
        addAddress: 'Добавить адрес',
        formAddSubmitButton: 'Добавить',
        validMessage: 'Пожалуйста, проверьте поля на заполненность и на допустимые символы',
        emailAddressPlaiceholder: 'Email для квитанций',
        nameAddress: 'Название адреса',
        takeActive: 'Активировать',
        remove: 'Удалить',
        yes: 'Да',
        no: 'Нет',
        errorMessage: 'Произошла ошибка',
        choiseAddress: 'Активный адрес не может быть удален',
        address: 'Адрес',
        addressSetting: 'АДРЕС',
        global: 'Общие',
        globalSetting: 'ОБЩИЕ',
        buttonNameTheme: 'Тема',
        lightThemeButtonName: 'Светлая',
        darkThemeButtonName: 'Темная',
        buttonNameLanguage: 'Язык',
        en: 'En',
        ru: 'Ru',
    },
    en: {
        hello: 'hello',
        nameMainScren: 'Counters',
    }
}

export { translates };
