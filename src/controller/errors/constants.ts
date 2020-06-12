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

    // Device Errors start
    ADD_NEW_DEVICE_ERROR: 'ADD_NEW_DEVICE_ERROR',
    // Device Errors end

    // Room Errors start
    ROOM_IS_EXIST: 'ROOM_IS_EXIST',
    ADD_NEW_ROOM_ERROR: 'ADD_NEW_ROOM_ERROR',
    ROOM_NOT_FOUND: 'ROOM_NOT_FOUND',
    // Room Errors end
};

export const ERROR_MESSAGE = {
    [ERROR_CODE.UNKNOWN_ERROR]: 'Unknown error!',

    // Auth errors start
    [ERROR_CODE.USER_NOT_FOUND]: 'Пользователь с таким именем не найден!',
    [ERROR_CODE.INCORRECT_PASSWORD]: 'Пароль введен не верно!',
    [ERROR_CODE.USER_IS_EXIST]: 'Пользователь с таким именем уже существует!',
    [ERROR_CODE.CREATE_NEW_USER_ERROR]: 'Произошла ошибка, во время регистрации!',
    // Auth errors end

    // Device errors start
    [ERROR_CODE.ADD_NEW_DEVICE_ERROR]: 'Произошла ошибка при добавлении устройства',
    // Device errors end

    // Room Errors start
    [ERROR_CODE.ROOM_IS_EXIST]: 'Комната с таким именем уже существует!',
    [ERROR_CODE.ADD_NEW_ROOM_ERROR]: 'Ошибка при добавлении комнаты',
    [ERROR_CODE.ROOM_NOT_FOUND]: 'Комната не найдена',
    // Room Errors end
};
