import React, { createContext, useContext, useEffect, useState, } from 'react';

import { getLocaleUser, getTranslation, changeLocaleUser as changeLocale } from './utils/functions';

/**
 * Контекст для работы с переводами и локализацией.
 * @typedef {Object} TranslateContextType
 * @property {Object} selectedTranslations - Объект с переводами.
 * @property {Function} changeLocaleUser - Функция для изменения локали.
 * @property {string} locale - Текущая локаль.
 */
const TranslateContext = createContext();

/**
 * Поставщик контекста для работы с переводами и локализацией.
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние компоненты.
 * @returns {React.ReactNode} Компонент поставщика контекста.
 */
export const TranslateContextProvider = ({ children }) => {

    const [selectedTranslations, setTranslate] = useState({});
    const [locale, setLocale] = useState('en');

    /** *Получить объект с переводами и локаль и сохранить */
    async function getTranslationObjAndLocale() {
        const translateObj = await getTranslation();
        const localeUser = await getLocaleUser();
        setTranslate(translateObj);
        setLocale(localeUser);
    }
    /** Изменить локаль и сохранить */
    async function changeLocaleUser(updateLocale) {
        await changeLocale(updateLocale);
        setLocale(updateLocale);
        return updateLocale;
    }

    useEffect(() => {
        getTranslationObjAndLocale();
    }, [locale])

    return (
        <TranslateContext.Provider value={{ selectedTranslations, changeLocaleUser, locale }}>
            {children}
        </TranslateContext.Provider>
    )

}


export const useTranslate = () => {
    return useContext(TranslateContext);
};