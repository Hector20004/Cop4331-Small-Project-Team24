const loginUrl = "https://24.projectucf.software/Login.php";


function onLogin(){
    let login = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;
    let hash = md5(password);
    let payload = {login:login,password:hash};
    let jsonPayload = JSON.stringify(payload);
    let xhr = new XMLHttpRequest();
    xhr.open("POST",loginUrl);
    xhr.setRequestHeader("Content-type", "application/json;","charset=UTF-8");

    try {
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;
                if(userId < 1){
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                }

                window.location.href = "contact.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){
        document.getElementById("loginResult").innerHTML = err.message;
    }
}