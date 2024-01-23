import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { getLocaleUser, getTranslation, changeLocaleUser as changeLocale } from './utils/functions';

/**
 * Тип объекта с переводами.
 */
type TranslationsObject = {
    [key: string]: string;
};

/**
 * Тип контекста для работы с переводами и локализацией.
 */
type TranslateContextType = {
    selectedTranslations: TranslationsObject;
    changeLocaleUser: (updateLocale: string) => Promise<string>;
    locale: string;
};

type TranslateContextProviderProps = {
    children: ReactNode;
};

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
export const TranslateContextProvider: React.FC<TranslateContextProviderProps> = ({ children }) => {

    const [selectedTranslations, setTranslate] = useState<TranslationsObject>({});
    const [locale, setLocale] = useState<string>('en');

    /** *Получить объект с переводами и локаль и сохранить */
    async function getTranslationObjAndLocale() {
        const localeUser = await getLocaleUser();
        const translateObj = await getTranslation(localeUser);
        setTranslate(translateObj);
        setLocale(localeUser);
    }
    /** Изменить локаль и сохранить */
    async function changeLocaleUser(updateLocale: 'ru' | 'en') {
        if (updateLocale === 'ru' || updateLocale === 'en') {
            await changeLocale(updateLocale);
            setLocale(updateLocale);
            const translateObj = await getTranslation(updateLocale);
            setTranslate(translateObj);
        }
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