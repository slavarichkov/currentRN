import * as Keychain from 'react-native-keychain';

// Сохранение idUser
async function saveUserId(userId) {
    try {

        let newData = {};

        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.username === 'user') {
            newData = JSON.parse(credentials.password);
            newData.idUser = userId;
            await Keychain.resetGenericPassword();
        } else {
            newData.idUser = userId;
        }

        const stringData = JSON.stringify(newData);

        await Keychain.setGenericPassword('user', stringData);
        console.log('ID пользователя успешно сохранен.');
    } catch (error) {
        console.error('Ошибка при сохранении ID пользователя:', error);
    }
}

// Получение idUser
const getUserId = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.username === 'user') {
            const data = JSON.parse(credentials.password);
            if (data.idUser) {
                console.log('ID пользователя найден');
                const idUser = data.idUser;
                return idUser;
            } else {
                console.log('ID пользователя не найден.');
                return null;
            }
        } else {
            console.log('ID пользователя не найден.');
            return null;
        }
    } catch (error) {
        console.error('Ошибка при получении ID пользователя:', error);
        return null;
    }
};

// Сохранение токена
const saveToken = async (token) => {
    try {
        let newData = {};
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.username === 'user') {
            newData = JSON.parse(credentials.password);
            newData.token = token;
            await Keychain.resetGenericPassword();
        } else {
            newData.token = token;
        }

        const stringData = JSON.stringify(newData);
        await Keychain.setGenericPassword('user', stringData);
        console.log('Токен успешно сохранен.');

    } catch (error) {
        console.error('Ошибка при сохранении токена:', error);
    }
};

// Удалить токен
const deleteToken = async () => {
    try {
        await Keychain.resetGenericPassword();
        console.log('Токен успешно удален.');
    } catch (error) {
        console.error('Ошибка при удалении токена:', error);
    }
};

// Получение токена
const getToken = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.username === 'user') {
            const data = JSON.parse(credentials.password);
            if(data.token){
                console.log('Токен найден');
                const token = data.token;
                return token;
            }else{
                console.log('Токен не найден.');
                return null;
            }
        } else {
            console.log('Токен не найден.');
            return null;
        }
    } catch (error) {
        console.error('Ошибка при получении токена:', error);
        return null;
    }
};

export {
    saveUserId, // Сохранение idUser
    getUserId, // Получение idUser
    saveToken, // Сохранение токена
    getToken, // Получение токена
    deleteToken, // Удаление токена
};
