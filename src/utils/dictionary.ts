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
        remindNotifications: 'Напоминать о внесении показаний',
        //
        removeAccauntUserButtonName: 'Удалить',
        buttonNameProfile: 'Профиль',
        signOutButtonName: 'Выйти',
        needAuth: 'Пожалуйста, авторизуйтесь',
        placeHolderLogin: 'Логин',
        placeHolderLoginUpdateUser: 'логин',
        placeHolderPasswordUpdateUser: 'изменить пароль',
        placeHolderPasswordUpdate: 'Установить пароль',
        placeHolderCurrentPasswordUpdateUser: 'Текущий пароль',
        placeHolderEmail: 'Введите email',
        placeHolderEmailVerificationCode: 'Введите код подтверждения email',
        placeHolderPassword: 'Пароль',
        updateButtonName: 'Редактировать',
        signUpButtonName: 'Регистрация',
        signInButtonName: 'Войти',
        sendVerificationCodebuttonName: 'Отправить проверочный код',
        verificateEmailCodeButtonName: 'Подтвердить почту',
        repeatSendVerificationCodeEmailButtonName: 'Отправить код повторно',
        privacyPolicyButtonName: 'Открыть Политику конфиденциальности',
        updatePasswordButtonName: 'Сменить пароль',
        logOutFormName: 'Выйти из аккаунта?',
        formRemoveProfileName: 'Удалить профиль?',
        privacyPolicy: 'Пожалуйста, ознакомьтесь с нашей политикой конфиденциальности, прежде чем продолжить. Нажимая кнопку и продолжая использование приложения, вы подтверждаете свое согласие с нашей политикой конфиденциальности.',
        privacyPolicyLink: 'https://auto-dnevnik.ru/privacy',
        disclaimerEmail: 'Обратите внимание, что регистрация возможна только на домены РФ(.ru, .рф, .ру) согласно Федеральному закону от 31.07.2023 N 406-ФЗ "О внесении изменений в Федеральный закон "Об информации, информационных технологиях и о защите информации" и Федеральный закон "О связи"',
        recoverPasswordButtonName: 'Восстановить пароль',
        buttonSignIn: 'Авторизоваться',
        buttonAdd: 'Добавить +',
        // Ошибки
        messageError: 'Произошла ошибка',
        messageErrorEmailValue: 'Не заполнен Email',
        messageErrorEmailRegex: 'Email - почта должна содержать @ и оканчиваться на .ru, .рф, .ру',
        messageErrorEmailSameUser: 'Пользователь с такой почтой существует',
        messageErrorEmailNotFound: 'Убедитесь, что это ваша почта',
        messageErrorPasswordValue: 'Не заполнен Пароль',
        messageErrorPasswordLenght: 'Необходимо увеличить длину пароля',
        messageErrorPasswordRegex: 'Не допустимые символы в Пароле',
        messageErrorPrivacyPolicy: 'Не принята политика конфиденциальности',
        messageErrorVerificationCodeValue: 'Не заполнен код',
        messageErrorVerificationCodeRegex: 'Не допустимые символы в коде',
        messageErrorVerificationSend: 'Ошибка при отправке проверочного кода',
        messageErrorVerificationSendRepeatTimer: 'Повторная отправка кода возможна через(секунд):',
        messageErrorAuth: 'Проверьте данные для авторизации',
        messageErrorCurrentPasswordRegex: 'не  допустимые символы в текущем пароле',
        messageErrorCurrentPasswordValue: 'не заполнен текущий пароль',
        messageErrorLoginValue: 'Не заполнен логин',
        messageErrorLoginRegex: 'Не допустимые символы в логине',
        messageErrorLoginBusy: 'Логин занят',
        messageErrorLogin: 'Произошла ошибка при проверке логина',
        messageErrorNoChanges: 'Нет изменений',
        messageErrorRecoveryPassword: 'Ошибка при восстановлении пароля',
        settingClientInfoEmail: 'email',
        settingClientInfoLogin: 'login',
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
        ],
        remindNotifications: 'remind you to take readings',
        removeAccauntUserButtonName: 'Remove account',
        buttonNameProfile: 'Profile',
        signOutButtonName: 'Sign out',
        needAuth: 'Please authenticate',
        placeHolderLogin: 'Login',
        placeHolderLoginUpdateUser: 'login',
        placeHolderPasswordUpdateUser: 'change password',
        placeHolderPasswordUpdate: 'Set password',
        placeHolderCurrentPasswordUpdateUser: 'Current password',
        placeHolderEmail: 'Enter email',
        placeHolderEmailVerificationCode: 'Enter email verification code',
        placeHolderPassword: 'Password',
        updateButtonName: 'Edit',
        signUpButtonName: 'Sign up',
        signInButtonName: 'Sign in',
        sendVerificationCodebuttonName: 'Send verification code',
        verificateEmailCodeButtonName: 'Verify email',
        repeatSendVerificationCodeEmailButtonName: 'Resend code',
        privacyPolicyButtonName: 'Open Privacy Policy',
        updatePasswordButtonName: 'Change password',
        logOutFormName: 'Log out of account?',
        formRemoveProfileName: 'Remove profile?',
        privacyPolicy: 'Please review our privacy policy before continuing. By clicking the button and continuing to use the app, you confirm your agreement with our privacy policy.',
        privacyPolicyLink: 'https://auto-dnevnik.ru/privacy',
        disclaimerEmail: 'Please note that registration is only possible on Russian domains (.ru, .рф, .ру) in accordance with Federal Law of 31.07.2023 N 406-FZ "On Amending the Federal Law "On Information, Information Technologies and Protection of Information" and the Federal Law "On Communications"',
        recoverPasswordButtonName: 'Recover password',
        buttonSignIn: 'Sign In',
        buttonAdd: 'Add +',
        // Errors
        messageError: 'An error occurred',
        messageErrorEmailValue: 'Email not provided',
        messageErrorEmailRegex: 'Email - should contain @ and end with .ru, .рф, .ру',
        messageErrorEmailSameUser: 'A user with this email already exists',
        messageErrorEmailNotFound: 'Make sure this is your email',
        messageErrorPasswordValue: 'Password not provided',
        messageErrorPasswordLenght: 'Password length needs to be increased',
        messageErrorPasswordRegex: 'Invalid characters in Password',
        messageErrorPrivacyPolicy: 'Privacy policy not accepted',
        messageErrorVerificationCodeValue: 'Verification code not provided',
        messageErrorVerificationCodeRegex: 'Invalid characters in code',
        messageErrorVerificationSend: 'Error sending verification code',
        messageErrorVerificationSendRepeatTimer: 'Resend code possible in (seconds):',
        messageErrorAuth: 'Check authentication data',
        messageErrorCurrentPasswordRegex: 'Invalid characters in current password',
        messageErrorCurrentPasswordValue: 'Current password not provided',
        messageErrorLoginValue: 'Login not provided',
        messageErrorLoginRegex: 'Invalid characters in login',
        messageErrorLoginBusy: 'Login is busy',
        messageErrorLogin: 'Error checking login',
        messageErrorNoChanges: 'No changes',
        messageErrorRecoveryPassword: 'Error recovering password',
        settingClientInfoEmail: 'email',
        settingClientInfoLogin: 'login'
    }
}

export { translates };
