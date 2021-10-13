import { Buffer } from 'buffer';
import { URLSearchParams } from 'url';
import { INFO, ERROR, log } from './logger.js';
import { httpRequest, METHODS } from './transport.js';
import { DEFAULT_OPTIONS, URIS, keycloakAdmin, keycloakPassword } from './config.js';
/**
 * getAuthenticationToken
 * Retrieve the keycloak administrator authenticacion token for subsequent api calls
 */
 export const getAuthenticationToken = async () => {
    
    log(INFO, `Fn Call getAuthentictionToken`);
    const data = new URLSearchParams({
        client_id: 'admin-cli',
        username: keycloakAdmin,
        password: keycloakPassword,
        grant_type: 'password'
    }).toString();

    log(INFO, data);
    const _options = { 
        ...DEFAULT_OPTIONS, 
        method: METHODS.POST,
        path: URIS.token,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    try {
        const response = await httpRequest(_options, data);
        return (JSON.parse(response)).access_token;
    } catch (e) {
        log(ERROR, e.message);
    }

}
