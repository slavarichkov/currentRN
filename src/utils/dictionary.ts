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
        [key: string]: any;
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
        costOfaUnitOfMeasurement: 'Стоимость',
        currency: 'руб',
        arrayUnitsOfMeasurement: [{ name: 'Горячая вода', value: 'м3', nameCounter: 'Горячая вода' }, { name: 'Холодная вода', value: 'м3', nameCounter: 'Холодная вода' }, { name: 'Электричество', value: 'кВт/ч', nameCounter: 'Электричество' }, { name: 'Отопление', value: 'кКал', nameCounter: 'Отопление' }, { name: 'Газ', value: 'м3', nameCounter: 'Газ' }],
        cost: 'Стоимость',
        additionalСost: 'Доп стоимость',
        totalCost: 'Итого',
        moreInfo: 'Подробнее',
        volume: 'Количество',
        statistics: 'Статистика',
        subjectReadingsEmail: 'Показания счетчиков',
        messageErrorSendReadings: 'Не удалось открыть почтовый клиент, пожалуйста, сделайте скриншон показаний датчиков этого экрана и отправьте его на почту',
        months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ],
    },
    en: {
        hello: 'hello',
        countersScreen: 'Counters',
        hotWater: 'Hot Water',
        coldWater: 'Cold Water',
        placeHolderInputCouner: 'Enter readings',
        send: 'Send',
        save: 'Save',
        validMessageValues: 'One of the fields is missing',
        validMessageRegex: 'Please check characters - only digits and , are allowed.',
        counterData: 'Counter Data',
        dateOfCounterVerification: 'Verification Date',
        dateOfCounterVerificationNext: 'Next Verification Date',
        number: 'Number',
        placeholderDate: 'Verification Date',
        placeholderDateNext: 'Next Date',
        update: 'Edit',
        settingsScreen: 'Settings',
        activeAddress: 'Active Address',
        city: 'City',
        street: 'Street',
        building: 'Building',
        apartment: 'Apartment',
        email: 'Email',
        instructionAddress: 'Click on the address to work with it',
        addresses: 'Addresses',
        addAddress: 'Add Address',
        formAddSubmitButton: 'Add',
        validMessage: 'Please check the fields for completeness and valid characters',
        emailAddressPlaiceholder: 'Email for receipts',
        nameAddress: 'Address Name',
        takeActive: 'Activate',
        remove: 'Remove',
        yes: 'Yes',
        no: 'No',
        errorMessage: 'An error occurred',
        choiseAddress: 'The active address cannot be removed',
        address: 'Address',
        addressSetting: 'ADDRESS',
        global: 'General',
        globalSetting: 'GENERAL',
        buttonNameTheme: 'Theme',
        lightThemeButtonName: 'Light',
        darkThemeButtonName: 'Dark',
        buttonNameLanguage: 'Language',
        en: 'En',
        ru: 'Ru',
        costOfaUnitOfMeasurement: 'Cost',
        currency: '$',
        arrayUnitsOfMeasurement: [
            { name: 'Горячая вода', value: 'm3', nameCounter: 'Hot Water' },
            { name: 'Холодная вода', value: 'm3', nameCounter: 'Cold Water' },
            { name: 'Электричество', value: 'kW/h', nameCounter: 'Electricity' },
            { name: 'Отопление', value: 'kCal', nameCounter: 'Heating' },
            { name: 'Газ', value: 'm3', nameCounter: 'Gas' }
        ],
        cost: 'Cost',
        additionalСost: 'Additional cost',
        totalCost: 'Total',
        moreInfo: 'More Info',
        volume: 'Volume',
        statistics: 'Statistics',
        subjectReadingsEmail: 'Counter Readings',
        messageErrorSendReadings: 'Failed to open the mail client, please take a screenshot of the sensor readings screen and send it by email',
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
    }
}

export { translates };
