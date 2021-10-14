import { DEFAULT_OPTIONS, URIS } from './config.js';
import { INFO, ERROR, log } from './logger.js'
import { httpRequest, METHODS } from './transport.js'

export const createClient = async (token, realm, clientRepresentation) => {

    log(INFO, 'Fn Call: createClient')
    const data = JSON.stringify(clientRepresentation);

    const _options = {
        ...DEFAULT_OPTIONS,
        path: URIS.clients.replace(/__REALM__/, realm),
        method: METHODS.POST,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        },

    };

    try {
        await httpRequest(_options, data)
    } catch (e) {
        log(ERROR, e.message);
    }

};
