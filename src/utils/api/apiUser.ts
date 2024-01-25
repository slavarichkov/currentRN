import { host } from "./constApi";

class ApiUser {
    constructor(data: any) {
        this.host = data.host;
    }

    // проверка статуса запроса
    _getResponse(res: any) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(
                `ошибка: ${res.status} - ${res.statusText}`
            );
        }
    }

    // _getResponse(res) {
    //     if (res.ok) {
    //         return res.json();
    //     } else {
    //         return res.json().then((errorJson) => {
    //             const error = new Error(errorJson.message);
    //             error.json = errorJson;
    //             error.status = res.status;
    //             return Promise.reject(error);
    //         });
    //     }
    // }

    // Регистрация
    signUp(email: string, password: string, idDevice: string) {

        return fetch(`${this.host}/signup/${idDevice}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: password,
                    email: email.toLowerCase(),
                }),
            },
        ).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((errorJson) => {
                    const error = new Error(errorJson.message);
                    error.json = errorJson;
                    error.status = res.status;
                    return Promise.reject(error);
                });
            }
        })
    }

    // Авторизация 
    signIn(email: string, password: string, idDevice: string) {

        return fetch(`${this.host}/signin/${idDevice}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: password,
                    email: email.toLowerCase(),
                }),
            },
        ).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((errorJson) => {
                    const error = new Error(errorJson.message);
                    error.json = errorJson;
                    error.status = res.status;
                    return Promise.reject(error);
                });
            }
        })
    }

    // Обновить пользователя
    updateUser(token: string, dataUser: any, idDevice: string) {
        let update = { idUser: dataUser.idUser };

        if (dataUser.login) {
            update.login = dataUser.login.toLowerCase();
        }
        if (dataUser.updatePassword) {
            update.updatePassword = dataUser.updatePassword;
        }
        if (dataUser.currentPassword) {
            update.currentPassword = dataUser.currentPassword;
        }

        return fetch(`${this.host}/update-user/${idDevice}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // добавляем заголовок Authorization с токеном
                },
                body: JSON.stringify(update),
            },
        ).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((errorJson) => {
                    const error = new Error(errorJson.message);
                    error.json = errorJson;
                    error.status = res.status;
                    return Promise.reject(error);
                });
            }
        })

    }

    logOut(idUser: string, idDevice: string, token: string) {
        return fetch(`${this.host}/logout-user/${idDevice}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // добавляем заголовок Authorization с токеном
                },
                body: JSON.stringify({ idUser: idUser }),
            },
        ).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((errorJson) => {
                    const error = new Error(errorJson.message);
                    error.json = errorJson;
                    error.status = res.status;
                    return Promise.reject(error);
                });
            }
        })

    }

    removeProfile(token: string, idUser: string, password: string, idDevice: string) {
        return fetch(`${this.host}/remove-user/${idDevice}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // добавляем заголовок Authorization с токеном
                },
                body: JSON.stringify({
                    password: password,
                    idUser: idUser,
                }),
            },
        ).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(
                    `ошибка: ${res.status} - ${res.statusText}`
                );
            }
        })
    }

    recoveryPassword(password: string, email: string, idDevice: string) {
        return fetch(`${this.host}/recovery-password/${idDevice}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: password,
                    email: email.toLowerCase(),
                }),
            },
        ).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((errorJson) => {
                    const error = new Error(errorJson.message);
                    error.json = errorJson;
                    error.status = res.status;
                    return Promise.reject(error);
                });
            }
        })
    }

    //Получить инфо о клиенте(автоматом вкладывает _id в req.user, если авторизован)
    getSelfUser(token: string, idUser: string, idDevice: string) {
        return fetch(`${this.host}/get-self-user/${idUser}/${idDevice}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // добавляем заголовок Authorization с токеном
                },
            },
        )
            //.then((res) => this._getResponse(res))
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(
                        `ошибка: ${res.status} - ${res.statusText}`
                    );
                }
            })
    }

    // Проверить свободна ли почта
    checkEmailVaction(email: string, idDevice: string) {
        return fetch(`${this.host}/check-email/${email.toLowerCase()}/${idDevice}`,
            {
                method: 'GET',
            },
        ).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((errorJson) => {
                    const error = new Error(errorJson.message);
                    error.json = errorJson;
                    error.status = res.status;
                    return Promise.reject(error);
                });
            }
        })
    }

    // Проверить свободен ли логин
    checkLoginVacation(token: string, login: string, idDevice: string) {
        return fetch(`${this.host}/check-vacation-login/${login.toLowerCase()}/${idDevice}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // добавляем заголовок Authorization с токеном
                },
            },
        ).then((res) => this._getResponse(res))
    }

    // Отправить код проверки почты
    sendVerificationEmail(email: string, idDevice: string) {
        return fetch(`${this.host}/verification-code-email/${email.toLowerCase()}/${idDevice}`,
            {
                method: 'GET',
            },
        ).then((res) => this._getResponse(res))
    }

    // Проверить код проверки для почты
    verificationEmail(email: string, verificationCode: string, idDevice: string) {
        return fetch(`${this.host}/verification-email/${email.toLowerCase()}/${verificationCode}/${idDevice}`,
            {
                method: 'GET',
            },
        ).then((res) => this._getResponse(res))
    }

    controlNotifications(token: string, idUser: string, data: any, idDevice: string) {

        return fetch(`${this.host}/control-notifications/${idDevice}`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`, // добавляем заголовок Authorization с токеном
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idUser: idUser,
                    stateNotifications: data.stateNotifications,
                    pushToken: data.pushToken
                }),
            },
        ).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(
                    `ошибка: ${res.status} - ${res.statusText}`
                );
            }
        })

    }


    getLocaleAndPlatformUserApp(token: string, idUser: string, locale: string, platform: string, idDevice: string) {
        return fetch(`${this.host}/locale-platform-user/${idDevice}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, // добавляем заголовок Authorization с токеном
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idUser: idUser,
                    locale: locale,
                    platform: platform
                }),
            },
        ).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(
                    `ошибка: ${res.status} - ${res.statusText}`
                );
            }
        })
    }

    getInfoUpdateAppVersion(idDevice: string) {
        return fetch(`${this.host}/get-info-update-app-version/${idDevice}`,
            {
                method: 'GET',
            },
        ).then((res) => this._getResponse(res))
    }

}

const apiUser = new ApiUser({
    host: host,
});

export default apiUser;