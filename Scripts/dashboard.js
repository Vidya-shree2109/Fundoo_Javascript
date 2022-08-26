window.addEventListener('DOMContentLoaded', () => {

    console.log("=> Connected to Dashboard.js");
    let token = localStorage.getItem('token');
    console.log(token);
    getAllNotes();

    let navbar = document.querySelector(".side-navbar");
    let btn = document.querySelector('#btn');

    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let bgcolor = 'Orange';
    // let IsArchived = 'true';
    let Reminder = '2022-08-24T03:25:40.112Z';
    let Image = 'string';
    // let IsPinned = 'true';
    // let isDeleted = 'true';
    let CreatedAt = '2022-08-24T03:25:40.112Z';
    let editedAt = '2022-08-24T03:25:40.112Z';

    console.log(title.value);

    let createnote = document.querySelector('.create-note');
    let closebtn = document.querySelector('.close-btn');
    let oncreate = document.querySelector('.create1');
    let desc = document.querySelector('.create2');
    let closeIcon = document.querySelector('.close-icon');
    let searchbox = document.querySelector('.search-input');

    let displaytnotes = document.querySelector('.notes');

    var noteArray;

    btn.onclick = function () {
        navbar.classList.toggle("opened");
    }

    searchbox.addEventListener('focus', () => {
        closeIcon.classList.remove('hide')
    })
    searchbox.addEventListener('blur', () => {
        closeIcon.classList.add('hide');
    })

    oncreate.addEventListener('click', () => {
        toggleNoteFields();
    })

    closebtn.addEventListener('click', () => {
        let notedata = {
            title: title.value,
            description: description.value,
            color: bgcolor,
            reminder: Reminder,
            image: Image,
            // isArchived: IsArchived,
            // isPinned: IsPinned,
            // isDeleted: isDeleted,
            createdAt: CreatedAt,
            editedAt: editedAt
        }
        console.log(notedata);
        $.ajax({
            url: 'https://localhost:44383/api/Note/Add',
            type: 'POST',
            data: JSON.stringify(notedata),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {
                console.log(result);
                resetNoteFields();
                toggleNoteFields();
                getAllNotes();
            },
            error: function (error) {
                console.log(error);
                toggleNoteFields();
            }
        })
    })

    function resetNoteFields() {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    }

    function toggleNoteFields() {
        createnote.classList.toggle('expand');
        if (createnote.classList.contains('expand')) {
            document.getElementById('title').placeholder = 'Title';
            document.getElementById('pin').classList.add('show');
        }
        else {
            document.getElementById('title').placeholder = 'Take a note...';
            document.getElementById('pin').classList.remove('show');
            resetNoteFields();
        }
    }

    function getAllNotes() {
        $.ajax({
            url: 'https://localhost:44383/api/Note/AllNotes',
            type: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {
                noteArray = result;
                // noteArray.reverse();
                console.log(result);
                displaytnotes.click();
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    $(function () {
        $("ul li a").click(function () {
            $("ul li a").removeClass("active");
            $("ul li a").removeClass("buttonDisabled");
            $(this).addClass('active');
            $(this).addClass('buttonDisabled');
        });
    });

    displaytnotes.addEventListener('click', () => {
        notes = noteArray.filter((x) => {
            return x.isDeleted === false && x.isArchived === false;
        });
        console.log(notes);
        displayAllNotes(notes);
    })

    function displayAllNotes(Notesdata) {
        console.log(Notesdata);
        document.getElementById('AllNotes').innerHTML = Notesdata.map((note) =>
            `<div class="display-div">
            <div>
            <p class="p1">${note.title}</p>
            <P class="p2">${note.description}</P>
            </div>
            <div class="card-footer">
            <img src="/Assets/Dashboard/add_reminder.png" />
            <img src="/Assets/Dashboard/add_person.png" />
            <img src="/Assets/Dashboard/color.png" />
            <img src="/Assets/Dashboard/add_image.png" />
            <img src="/Assets/Dashboard/archive.png" />
            <img src="/Assets/Dashboard/more.png" />
            </div>
        </div>`
        ).join(' ');
    };
})