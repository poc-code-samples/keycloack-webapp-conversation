(function(){
    
    const redirectToNgApp = (token) => {
        localStorage.setItem('kcToken', token);
        window.location = `${window.origin}/app1`;

    };
    
    const initKeycloak = () => {
        var keycloak = new Keycloak();
            keycloak.init({
                onLoad: 'login-required'
            }).then(authenticated => {
                console.log(`User is authenticated: ${authenticated}`)
                redirectToNgApp(keycloak.token);
            }).catch(e => {
                console.log(e);
            });
    };

    initKeycloak();
})();

