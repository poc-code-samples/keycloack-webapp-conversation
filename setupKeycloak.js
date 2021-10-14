

import { REALM } from './src/config.js'
import { getAuthenticationToken } from './src/token.js';
import { createRealm } from './src/realms.js'
import { createUser } from './src/user.js';
import { createClient } from './src/clients.js';

const users = [ 
    { 
        firstName: 'John', 
        lastName: 'Doe', 
        enabled: true, 
        username: 'johndoe',
        emailVerified: true,
        email: 'john@doe.com',
        credentials: [{
            userLabel: 'johndoe',
            temporary: false,
            value: 'ok123',
            createdDate: Date.now().valueOf()
        }],

    },
    { 
        firstName: 'Jane', 
        lastName: 'Doe', 
        enabled: true, 
        username: 'janedoe',
        emailVerified: true,
        email: 'jane@doe.com',
        credentials: [{
            userLabel: 'janedoe',
            temporary: false,
            value: 'ok123',
            createdDate: Date.now().valueOf()
        }],

    } 
];


const clients = [
    {
        name: "theClient",
        enabled: true,
        attributes: {},
        redirectUris: [],
        clientId: "theClient",
        rootUrl: "http://localhost:8081",
        protocol: "openid-connect"
    }
];
const run = async () => {
    const token = await getAuthenticationToken();
    await createRealm(REALM, token);
    
    users.forEach(async (u) => {
        await createUser(token, REALM, u);
    });

    clients.forEach(async (c) => {
        await createClient(token, REALM, c);
    });
} 

run();
