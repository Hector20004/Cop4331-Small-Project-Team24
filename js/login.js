const loginUrl = window.location.origin + "/Login.php";
const signupUrl = window.location.origin + "/Register.php";


function onLogin(){
    let login = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;
    let hash = md5(password);
    let payload = {login:login,password:hash};
    let jsonPayload = JSON.stringify(payload);
    let xhr = new XMLHttpRequest();
    xhr.open("POST",loginUrl,true);
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

    try {
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;
                if(userId < 1){
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                }
                else{
                    window.location.href = "contact.html";
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){
        console.log(err.message);
        document.getElementById("loginResult").innerHTML = err.message;
    }
}
function onSignup(){
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let username = document.getElementById("signupName").value;
    let password = document.getElementById("signupPassword").value;
    let hash = md5(password);

    let json = {firstName:firstName,lastName:lastName,username:username,password:hash};
    let jsonPayload = JSON.stringify(json);

    let xhr = new XMLHttpRequest();
    xhr.open("POST",signupUrl);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let jsonObject = JSON.parse(xhr.responseText);
                let isSuccess = jsonObject.isSuccess;
                if(!isSuccess){
                    document.getElementById("signupResult").innerHTML = "Failed to signup";
                }
                else{
                    window.location.href = "contact.html";
                }
            }
        }
        xhr.send(jsonPayload);
    }
    catch(err){
        document.getElementById("signupResult").innerHTML = err.message;
    }

}