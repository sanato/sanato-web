var form = document.getElementById("login-form");
form.addEventListener('submit', login);

function login(event) {
    event.preventDefault();
    var username = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;
    superagent
        .post('/api/login')
        .send({
            username: username,
            password: password
        })
        .end(function(res) {
            if (res.ok) {
                var data = res.body;
                localStorage.setItem("instanto_token", data.token);
                location.reload();
            } else {
                console.info("bad password/username");
            }
        });
}