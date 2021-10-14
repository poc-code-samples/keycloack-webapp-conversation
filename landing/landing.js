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
                const msgElem = document.getElementById('message');
                const tokenElem = document.getElementById('token');
                msgElem.innerHTML = authenticated ? 'authenticated' : 'not authenticated';
                msgElem.style.color = 'blue';
                tokenElem.innerHTML = keycloak.token;
                console.log(keycloak.token);
                forwardToken(keycloak.token);
            }).catch(e => {
                console.log(e);
            });
    };

    initKeycloak();
})();

