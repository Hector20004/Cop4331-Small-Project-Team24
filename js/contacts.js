const urlBase = "https://24.projectucf.software";

function getUserId() {
  return localStorage.getItem("userId");
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

window.onload = function () {
  const userId = getUserId();
  if (!userId) {
    //window.location.href = "login.html";
    return;
  }

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  document.getElementById("welcomeText").innerText =
    "Welcome " + firstName + " " + lastName;
};

function searchContacts() {
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
      renderContacts(res.results);
    }
  };

  xhr.send(payload);
}

function renderContacts(contacts) {
  const table = document.getElementById("contactsTable");
  table.innerHTML = "";

  contacts.forEach(c => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${c.firstName}</td>
      <td>${c.lastName}</td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
      <td>
        <button onclick="deleteContact(${c.id})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

function addContact() {
  const payload = JSON.stringify({
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    userId: getUserId()
  });

  const xhr = new XMLHttpRequest();
  xhr.open("POST", urlBase + "/AddContact.php", true);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      searchContacts();
    }
  };

  xhr.send(payload);
}

function deleteContact(id) {
  const payload = JSON.stringify({
    id: id,
    userId: getUserId()
  });

  const xhr = new XMLHttpRequest();
  xhr.open("POST", urlBase + "/DeleteContact.php", true);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      searchContacts();
    }
  };

  xhr.send(payload);
}
