#!/bin/bash

# Run a keycloack server in the 8080 port

docker run -d --rm --name keycloak-server -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:15.0.2


# Use the keycloak api to create 2 users.

# Create realm & user for the first application
# Create realm & user for the second application


# register application 1 with the keycloack 
# register application 2 with the keycloack
