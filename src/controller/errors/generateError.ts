/**
 * На самом деле в идельном мире, code и message должны быть
 * константами и их тип брать как typeof codeConstant и так далее
 * @param code - код ошибки в формате строки: 'UNKNOWN_ERROR'
 * @param message - сообщение ошибки, для фронта: 'Something wrong'
 */
const generateError = (code: String, message: String) => {
    return {
        error: {
            code,
            message,
        },
    };
};

export default generateError;
