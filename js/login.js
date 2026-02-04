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

    let json = {firstName:firstName,lastName:lastName,login:username,password:hash};
    let jsonPayload = JSON.stringify(json);

    let xhr = new XMLHttpRequest();
    xhr.open("POST",signupUrl);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let jsonObject = JSON.parse(xhr.responseText);
                console.log(jsonObject);
                let isSuccess = (jsonObject.error === "");
                if(!isSuccess){
                    document.getElementById("signupResult").innerHTML = jsonObject.error;
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
function saveCookie()
{
        let minutes = 20;
        let date = new Date();
        date.setTime(date.getTime()+(minutes*60*1000));
        document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
        userId = -1;
        let data = document.cookie;
        let splits = data.split(",");
        for(var i = 0; i < splits.length; i++)
        {
                let thisOne = splits[i].trim();
                let tokens = thisOne.split("=");
                if( tokens[0] == "firstName" )
                {
                        firstName = tokens[1];
                }
                else if( tokens[0] == "lastName" )
                {
                        lastName = tokens[1];
                }
                else if( tokens[0] == "userId" )
                {
                        userId = parseInt( tokens[1].trim() );
                }
        }

        if( userId < 0 )
        {
                window.location.href = "index.html";
        }
        else
        {
//          document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
        }
}