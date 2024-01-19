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

    const [theme, setTheme] = useState<string>('dark');
    const [colorText, setColorText] = useState({ color: 'rgba(255,255,255,1)' });
    const [colorTextModal, setColorTextModal] = useState({ color: 'rgba(0,0,0,1)' });
    const [backgroundColor, setBackgroundColor] = useState({ backgroundColor: 'gray' });

    function changeTheme(theme: 'light' | 'dark') {
        if (theme === 'light' || theme === 'dark') {
            setTheme(theme);
            if (theme === 'light') {
                setBackgroundColor({ backgroundColor: 'gray' })
            } else if (theme === 'dark') {
                setBackgroundColor({ backgroundColor: '#292828' })
            }
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, colorText, colorTextModal, backgroundColor, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}


export const useTheme = () => {
    return useContext(ThemeContext);
};