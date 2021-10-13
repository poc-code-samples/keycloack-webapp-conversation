import { Buffer } from 'buffer';
import { 
    DEFAULT_REALM_OPTIONS,
    URIS,
    DEFAULT_OPTIONS
} from "./config.js";
import { ERROR, INFO, log } from './logger.js';
import { METHODS, httpRequest } from "./transport.js";

/**
 * createRealm
 * Create a realm in the keycloack server
 */
 export const createRealm = async (realm, token) => {

    log(INFO, `Fn Call createRealm`);
     
    const data = JSON.stringify({ 
        ...DEFAULT_REALM_OPTIONS, 
        realm,
        displayName: `TestCompany-${realm}`
     });

    const _options = {
        ...DEFAULT_OPTIONS,
        method: METHODS.POST,
        path: URIS.realm,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    log(INFO, data);
    try {
        await httpRequest(_options, data);
    } catch (e) {
        log(ERROR, e.message);
    }
};
