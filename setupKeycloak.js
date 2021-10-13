

import { REALM } from './src/config.js'
import { getAuthenticationToken } from './src/token.js';
import { createRealm } from './src/realms.js'
import { createUser } from './src/user.js';

const userNames = [ 
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

    } 
];

const run = async () => {
    const token = await getAuthenticationToken();
    await createRealm(REALM, token);
    
    userNames.forEach(async (u) => {
        await createUser(token, REALM, u);
    });
} 

run();
