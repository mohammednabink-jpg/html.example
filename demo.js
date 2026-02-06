// Load saved notes when page opens
window.onload = function () {
    showNotes();
};

function addNote() {
    let input = document.getElementById("noteInput");
    let noteText = input.value;

    if (noteText === "") {
        alert("Please write something!");
        return;
    }

    // Get old notes from storage
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesArray = [];
    } else {
        notesArray = JSON.parse(notes);
    }

    // Add new note
    notesArray.push(noteText);

    // Save back to storage
    localStorage.setItem("notes", JSON.stringify(notesArray));

    input.value = ""; // clear box
    showNotes(); // refresh list
}

function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesArray = [];
    } else {
        notesArray = JSON.parse(notes);
    }

    let html = "";

    notesArray.forEach(function (note, index) {
        html += `
            <div class="note">
                ${note}
                <button class="deleteBtn" onclick="deleteNote(${index})">X</button>
            </div>
        `;
    });

    document.getElementById("notesList").innerHTML = html;
}

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    let notesArray = JSON.parse(notes);

    notesArray.splice(index, 1); // remove note
    localStorage.setItem("notes", JSON.stringify(notesArray));

    showNotes(); // refresh list
}
