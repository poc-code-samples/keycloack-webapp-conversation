//Turn this flag on for debugging the script
const DEBUGGING = 1;


export const INFO = 'info';
export const WARNING = 'warning';
export const TRACE = 'trace';
export const ERROR = 'error';
export const DEBUG = 'debug';


export const LOG_TYPES = {
    [TRACE]:      '>>> Trace:',
    [ERROR]:      '>>> Error:',
    [WARNING]:    '>>> Warning:',
    [DEBUG]:      '>>> Debug:',
    [INFO]:       '>>> Info:'
};

export const log = (type, msg) => {
    if (DEBUGGING)
        console.log(`${ LOG_TYPES[type] ? LOG_TYPES[type] : '>>> Unknown:' } ${msg}`);
};
