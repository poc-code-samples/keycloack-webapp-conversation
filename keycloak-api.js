import fetch from "node-fetch";

export const refreshToken = async (keycloak, refreshToken) => {
    const response = await fetch(
        `${keycloak.authServerUrl}realms/${keycloak.realm}/protocol/openid-connect/token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=refresh_token&client_id=${keycloak.clientId}&refresh_token=${refreshToken}&client_secret=${keycloak.clientSecret}`,
        }
    );
    const json = await response.json();
    return json;
}