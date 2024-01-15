import React, { createContext, useContext, useState, } from 'react';

/**
 * Контекст для работы с темой.
 *
 */
const ThemeContext = createContext();

/**
 * Поставщик контекста для управления темой приложения и цветом текста.
 *
 * @component
 * @example
 * // Пример использования в приложении:
 * <ThemeContextProvider>
 *   <App />
 * </ThemeContextProvider>
 *
 * @param {object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние компоненты, обертываемые ThemeContextProvider.
 * @returns {React.ReactNode} Компонент ThemeContextProvider.
 */
export const ThemeContextProvider = ({ children }) => {

    const [theme, setTheme] = useState('dark');
    const [colorText, setColorText] = useState({ color: 'rgba(0,0,0,1)' });
    const [backgroundColor, setBackgroundColor] = useState({ backgroundColor: 'gray' });

    return (
        <ThemeContext.Provider value={{ theme, colorText, backgroundColor }}>
            {children}
        </ThemeContext.Provider>
    )

}


export const useTheme = () => {
    return useContext(ThemeContext);
};