# App Sample serving ng apps w/ user verification via static webpage

Example to demostrate how to serve and angular application with authentication controlled by an external static page instead of integrate authentication in the angular app.

Same schema applies for several users in this case the description is for single user

![Diagram](docs/diagrams/out/auth/diagram.png)


## Keycloack server run

Prerequisites: Make sure you have docker installed as for simplicity we will be using the keycloack docker image _quay.io/keycloak/keycloak:15.0.2_

In a Shell execute 

```bash
$: ./startKeycloak.sh
```

this will create the container. Then visit http://localhost:8080 server will be running.

Admin credentials:

- username: *admin*
- password: *admin*

Make sure you set *admin/admin* as credentials th username and password are wired in the package.json for the keycloak:setup npm script to configure the keycloak server (se below)
### Realm, User and client creation

To prepare the keycloack server for this POC we nee to do the following:

- create a realm
- create the users in the realm
- create the applications in the realm

To accomplish these tasks you should run a script provided in the source code

```bash
$ npm run keycloack:setup
```

The output for this command will show you the realm that has been created for running the examples. 

![output](./docs/output-keycloak-setup.png)

Notice the ouput show the realm that was created for you.

```json
{"enabled":true,"realm":"0978468e-390d-4a11-8963-38d0271cb033","displayName":"TestCompany-0978468e-390d-4a11-8963-38d0271cb033"}
```

Every time you run the script the realm will be created again with unique id.
It's also important to make you notice when you remove the container it will be deleted so all **information will be erased**.

If need to test the users you already created you can do thei following:

- visit: http://localhost:8080/auth/realms/**replace your realm name here**/account
- login using user credentials.
    
    - jonhdoe/ok123
    - janedoe/ok123

Your realm is in the output shown before, ej:

**References**: [Keycloack docker documentation](https://www.keycloak.org/getting-started/getting-started-docker)


## Client Authentication frontend

After keycloak setup completed do the followind steps:

- login into keycloak admin console
- locate the realm created using the id displayed in the console
- go to the clients section
- locate client with name "theClient"
- go to the installation tab in client details and select JSON from the dropdown, then download the keycloak.json file
- copy the downloaded file in the "landing" directory on this app

Next step is run the webapp

```bash
$ npm run start
```

Navigate with your browser to http://localhost:8081

You will be redirected automatically to keycloak login page. There you need to enter your credentials

username: johndoe
password: ok123

Now you will be redirected back to your landing page and you will see you are authenticated

What's next:

- Find how to retrieve the token information from th webapp. JWT token live in a cookie under http://localhost:8080 domain. Notice we are serving our application in http://localhost:8081.

- Figure out how to pass application information deom keycloak to the webapp, as needed to decide where to redirect to.

To invalidate your credentials need to delete these cookies living under http://localhost:8080

- KEYCLOAK_IDENTITY_LEGACY
- KEYCLOAK_IDENTITY

## Client authentication Backend

Keycloak setup for backend integration need to be tweaked as this:

- access type: change from *public* to *confidential*
- enable authorization: *true*
- credentials must be in keycloak configuration
- bearerOnly: *false* in keycloack configuration

```javascript
const config = {
    "realm": "7078c9ad-4d44-4c58-bda1-c1ec6cace22b",
    "auth-server-url": "http://localhost:8080/auth/",
    "ssl-required": "external",
    "resource": "theClient",
    "​bearerOnly": false,
    "credentials": {
        "secret": "86f92594-6242-4cd2-b976-69daf9968b85"
    },
    "confidential-port": 0,
    "policy-enforcer": {}
};
```

Here is a screenshot for client configuration in keycloak admin.

![enable authorization](docs/shot-keycloack-client-config.png)

### Pros:

- All authentication is handled by the Webapp (serverside).
- Server side (ng Apps) are protected out of the box using `keycloak.protect()`
- No need to a landing page and client redirections.

### Cons

- Token refreshing need to be done by the Webapp (this may be complex because ng apps will have to talk to webapp to refresh tokens when these ones expire)
- Webapp may be considered part of backend (not necesarily the bakend services the ng apps talk to perform business operations)
- Webapp may be behing proxy that already validate tokens


### Questions

- Can envoy proxy validate the access token ?
