const urlBase = "https://24.projectucf.software";

function getUserId() {
    return localStorage.getItem("userId");
}

function apiSearchContacts(success_callback) {
    const search = document.getElementById("searchText").value;
    const userId = getUserId();

    const payload = JSON.stringify({
        search: search,
        userId: userId
    });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", urlBase + "/SearchContacts.php", true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const res = JSON.parse(xhr.responseText);
            success_callback(res.results);
        }
    };

    xhr.send(payload);
}

function apiAddContact(contact, success_callback) {
    const payload = JSON.stringify({
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        email: contact.email,
        userId: getUserId()
    });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", urlBase + "/AddContact.php", true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            success_callback();
        }
    };

    xhr.send(payload);
}

function apiEditContact(contact, success_callback) {
    const payload = JSON.stringify({
        ...contact,
        userId: getUserId()
    });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", urlBase + "/EditContact.php", true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            success_callback();
        }
    };

    xhr.send(payload);
}

function apiDeleteContact(id, success_callback) {
    const payload = JSON.stringify({
        id: id,
        userId: getUserId()
    });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", urlBase + "/DeleteContact.php", true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            success_callback();
        }
    };

    xhr.send(payload);
}
