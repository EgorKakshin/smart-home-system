export const ERROR_CODE = {
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    /**
     * ошибка валидации данных, сообщение для
     * таких ошибок генерируется "на ходу"
     */
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    INCORRECT_PASSWORD: 'INCORRECT_PASSWORD',
    USER_IS_EXIST: 'USER_IS_EXIST',
    CREATE_NEW_USER_ERROR: 'CREATE_NEW_USER_ERROR',
};

export const ERROR_MESSAGE = {
    [ERROR_CODE.UNKNOWN_ERROR]: 'Unknown error!',
    [ERROR_CODE.USER_NOT_FOUND]: 'Пользователь с таким именем не найден!',
    [ERROR_CODE.INCORRECT_PASSWORD]: 'Пароль введен не верно!',
    [ERROR_CODE.USER_IS_EXIST]: 'Пользователь с таким именем уже существует!',
    [ERROR_CODE.CREATE_NEW_USER_ERROR]: 'Произошла ошибка, во время регистрации!'
};
