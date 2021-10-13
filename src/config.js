import { v4 } from 'uuid';
export const REALM = v4();

export const keycloakAdmin = process.env.KEYCLOACK_ADMIN_USER || 'admin';
export const keycloakPassword = process.env.KEYCLOAK_ADMIN_PASSWORD || null;

export const DEFAULT_OPTIONS = {
    host: 'localhost',
    port: '8080',
    path: '/auth/',
    headers: {
        'Content-Type': 'application/json'
    }
};

export const URIS = {
    token: '/auth/realms/master/protocol/openid-connect/token',
    realm: '/auth/admin/realms',
    user:   '/auth/admin/realms/__REALM__/users'
};

export const DEFAULT_REALM_OPTIONS = {
    enabled: true
};
