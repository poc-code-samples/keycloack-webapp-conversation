import { Buffer } from 'buffer'
import { DEFAULT_OPTIONS, URIS } from "./config.js";
import { ERROR, INFO, log } from './logger.js';
import { METHODS, httpRequest } from "./transport.js";
/**
 * createUser
 * create a user for specific realm
 */
 export const createUser = async (token, realm, userRepresentation) => {
    log(INFO, 'Fn Call: createUser');

    const data = JSON.stringify(userRepresentation);

    const _options = {
        ...DEFAULT_OPTIONS,
        path: URIS.user.replace(/__REALM__/, realm),
        method: METHODS.POST,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    }

    try {
        await httpRequest(_options, data);
    } catch (e) {
        log(ERROR, e.message);
    }
};
