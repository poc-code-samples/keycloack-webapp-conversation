(function(){
    
    const forwardToken = (token) => {
        const f = document.createElement('form');
        f.setAttribute('method', 'POST');
        f.setAttribute('action', '/token');

        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', 'token');
        input.value = token;

        f.appendChild(input);
        document.getElementsByTagName('body')[0].appendChild(f);
        f.submit();

    };
    
    const initKeycloak = () => {
        var keycloak = new Keycloak();
            keycloak.init({
                onLoad: 'login-required'
            }).then(authenticated => {
                if (authenticated)
                    forwardToken(keycloak.token);
                else
                    console.log(`Authentication failure`);
            }).catch(e => {
                console.log(e);
            });
    };

    initKeycloak();
})();
