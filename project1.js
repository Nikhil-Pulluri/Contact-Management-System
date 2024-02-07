var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
function updateLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function toggleForm(operation) {
    var addContactForm = document.getElementById('addContactForm');
    var deleteContactForm = document.getElementById('deleteContactForm');
    var displayContactDropdown = document.getElementById('displayContactDropdown');
    var modifyContactForm = document.getElementById('modifyContactForm');
    
    addContactForm.style.display = 'none';
    deleteContactForm.style.display = 'none';
    displayContactDropdown.style.display = 'none';
    modifyContactForm.style.display = 'none';
    contactDetails.style.display = 'none';
    
    switch (operation) {
        case 'add':
            addContactForm.style.display = 'block';
            break;
        case 'delete':
            deleteContactForm.style.display = 'block';
            populateDeleteForm();
            break;
        case 'display':
            populateButtons();
            displayContactDropdown.style.display = 'block';
            break;
        case 'modify':
            modifyContactForm.style.display = 'block';
            break;
        default:
            alert('Invalid operation');
    }
}

function addContact() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var contact = {
        name: name,
        email: email,
        phone: phone
    };
    contacts.push(contact);
    
    alert('Contact added successfully.');
    updateLocalStorage();
}

function deleteSelectedContacts() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var deletedContacts = [];
    checkboxes.forEach(function(checkbox) {
        var name = checkbox.value;
        for (var i = 0; i < contacts.length; i++) {
            if (contacts[i].name === name) {
                deletedContacts.push(contacts.splice(i, 1)[0]);
                break;
            }
        }
    });
    if (deletedContacts.length > 0) {
        alert('Selected contacts deleted successfully.');
    } else {
        alert('No contacts selected for deletion.');
    }
    populateDeleteForm();
    updateLocalStorage();
}

function modifyContact() {
    var nameToModify = document.getElementById('modifyName').value;
    var found = false;
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].name === nameToModify) {
            var newEmail = document.getElementById('modifyEmail').value;
            var newPhone = document.getElementById('modifyPhone').value;
            contacts[i].email = newEmail;
            contacts[i].phone = newPhone;
            found = true;
            updateLocalStorage();
            alert('Contact modified successfully.');
            break;
        }
    }
    if (!found) {
        alert('Contact not found.');
    }
}

function populateDeleteForm() {
    var deleteContactForm = document.getElementById('deleteContactForm');
    deleteContactForm.innerHTML = '<label>Select contacts to delete:</label><br>';
    contacts.forEach(function(contact) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = contact.name;
        deleteContactForm.appendChild(checkbox);
        var label = document.createElement('label');
        label.textContent = contact.name + ', Email: ' + contact.email + ', Phone: ' + contact.phone;
        deleteContactForm.appendChild(label);
        deleteContactForm.appendChild(document.createElement('br'));
    });
    if (contacts.length > 0) {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Selected Contacts';
        deleteButton.onclick = deleteSelectedContacts;
        deleteContactForm.appendChild(deleteButton);
    }
}

function populateButtons() {
    var displayContactDropdown = document.getElementById('displayContactDropdown');
    displayContactDropdown.innerHTML = ''; 
    if (contacts.length === 0) {
        displayContactDropdown.innerHTML = '<p>No contacts found</p>';
        return;
    }
    
    contacts.forEach(function(contact) {
        var button = document.createElement('button');
        button.textContent = contact.name;
        button.className = 'contactButton';
        button.onclick = function() {
            displaySelectedContact(contact);
        };
        displayContactDropdown.appendChild(button);
    });
}

function displaySelectedContact(contact) {
    var contactDetails = document.getElementById('contactDetails');
    contactDetails.innerHTML = '';
    var namePara = document.createElement('p');
    namePara.textContent = 'Name: ' + contact.name;
    contactDetails.appendChild(namePara);
    
    var emailPara = document.createElement('p');
    emailPara.textContent = 'Email: ' + contact.email;
    contactDetails.appendChild(emailPara);
    
    var phonePara = document.createElement('p');
    phonePara.textContent = 'Phone: ' + contact.phone;
    contactDetails.appendChild(phonePara);
    contactDetails.style.display = 'block';
}
