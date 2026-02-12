let current_id = null;
let save_lock = false;

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

function setEditorDisabled(state) {
    document.getElementById("firstName").disabled = state;
    document.getElementById("lastName").disabled = state;
    document.getElementById("phone").disabled = state;
    document.getElementById("email").disabled = state;
}

function populateEditor(contact) {
    document.getElementById("firstName").value = contact.firstName;
    document.getElementById("lastName").value = contact.lastName;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email;
    current_id = contact.id;
}

function clearEditor() {
    populateEditor({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        current_id: null
    })
}

function readEditor() {
    return {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        id: current_id
    }
}

function renderContacts(contacts) {
    const table = document.getElementById("contactsTable");
    table.innerHTML = "";

    contacts.forEach(c => {
        const row = document.createElement("tr");

        row.onclick = () => {
            populateEditor(c);
            setEditorDisabled(false)
        }

        row.innerHTML = `
      <td>${c.firstName}</td>
      <td>${c.lastName}</td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
    `;

        table.appendChild(row);
    });
}

function searchContacts() {
    apiSearchContacts(renderContacts);
}

function addContact() {
    clearEditor();
    setEditorDisabled(false);
}

function saveContact() {
    if (save_lock) {
        return
    }
    save_lock = true;
    let contact = readEditor();
    if(firstName.length === 0 && lastName.length === 0) {
        save_lock = false;
        return;
    }

    if(contact.id == null) { // create
        apiAddContact(contact, searchContacts);
        clearEditor();
        setEditorDisabled(true);
    } else {
        apiEditContact(contact, searchContacts);
    }
    save_lock = false;
}

function deleteContact() {
    let contact = readEditor();
    apiDeleteContact(contact.id, searchContacts);
    clearEditor();
    setEditorDisabled(true);
}

window.onload = function () {
    const userId = getUserId();
    if (!userId) {
        window.location.href = "login.html";
        return;
    }

    searchContacts()
};