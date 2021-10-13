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
### Keycloack setup for the POC

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

If need to test the users you already created you can do thei following:

- visit: http://localhost:8080/auth/realms/**replace your realm name here**/account
- login using user credentials.
    
    - jonhdoe/ok123
    - janedoe/ok123

Your realm is in the output shown before, ej:

```json
{"enabled":true,"realm":"0978468e-390d-4a11-8963-38d0271cb033","displayName":"TestCompany-0978468e-390d-4a11-8963-38d0271cb033"}
```


**References**: [Keycloack docker documentation](https://www.keycloak.org/getting-started/getting-started-docker)


## Client Authentication
