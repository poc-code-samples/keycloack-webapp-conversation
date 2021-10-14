import { request } from 'http';
import { INFO, log } from './logger.js';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const GET = 'GET'

export const METHODS = {
    GET,
    POST,
    PUT,
    DELETE
};

export const httpRequest = (options, payload) => {

    return new Promise((resolve, reject) => {
        let result = '';

        const req = request(options, response => {

            response.setEncoding('utf8');
            response.on('data', chunk => {
                result += chunk;
            });

            response.on('end', () => {
                log(INFO, result);
                resolve(result);
            });
        });

        req.on('error', (e) => {
            log(ERROR, e.message);
            reject(e);
        });

        if (payload)
            req.write(payload);
            
        req.end();
    });
}
