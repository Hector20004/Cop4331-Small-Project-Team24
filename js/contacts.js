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
    document.getElementById("creationTime").value = contact.dateCreated ? "Date Created: " + contact.dateCreated : "";
    current_id = contact.id;
    if (contact.id == null) {
        document.getElementById("editHeader").innerText = "NEW CONTACT";
    } else {
        document.getElementById("editHeader").innerText = "EDIT CONTACT";
    }
    updateIcon()
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

// Format phone number
function formatPhoneDisplay(phone) {
  if (!phone) return "";
  // format as (123) 456-7890
  if (phone.length === 10) {
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  }
  return phone;
}

// Format date for display
function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'America/New_York' 
  });
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

        let cells = [c.firstName, c.lastName];

        for(const c of cells) {
            const cell = document.createElement("td");
            cell.innerText = c;
            row.appendChild(cell);
        }

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

    if (contact.phone.length > 0) {
      if (contact.phone.match(/^[0-9+\-()]$/)) {
        document.getElementById("contactResult").innerHTML = "* Please enter phone number as 10 digits: 1234567890";
        save_lock = false;
        return;
      }
    }
    // clear previous error messages
    document.getElementById("contactResult").innerHTML = "";

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

function updateIcon() {
    let contact = readEditor();
    let container = document.getElementById("editor-icon")
    container.innerText =
        (contact.firstName ? contact.firstName[0] : "") +
        (contact.lastName ? contact.lastName[0] : "");

    if(container.innerText.length === 0) {
        container.classList.remove("populated");
    } else {
        container.classList.add("populated");
    }
}

window.onload = function () {
    const userId = getUserId();
    if (!userId) {
        //window.location.href = "login.html";
        //return;
    }

    searchContacts()
    clearEditor()
    setEditorDisabled(false);
};
