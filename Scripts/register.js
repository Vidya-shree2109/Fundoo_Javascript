window.addEventListener('DOMContentLoaded', () => {

    console.log("=> Connected to Registration.js");

    let regexName = RegExp('^[A-Z]{1}[a-z]{2,}$');
    let regexEmail = RegExp('^([A-Za-z0-9]{3,20})([.][A-Za-z0-9]{1,10})*([@][A-Za-z]{2,5})+[.][A-Za-z]{2,3}([.][A-Za-z]{2,3})?$');
    let regexPass = RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$_])[a-zA-Z0-9@#$_]{8,}$');

    let firstName = document.getElementById('Fname');
    let lastName = document.getElementById('Lname');
    let userName = document.getElementById('Uname');
    let password = document.getElementById('pass');
    let Cpassword = document.getElementById('Cpass');

    let cls = document.getElementById('btnj');

    let fn = 0, ln = 0, un = 0, psw = 0, cnfpw = 0;

    const showError = (inputId, spanId, errMsg, beforeinput, afterinput) => {
        console.log(errMsg);
        document.getElementById(inputId).classList.remove(beforeinput);
        document.getElementById(inputId).classList.add(afterinput);
        document.getElementById(spanId).classList.add('Errormessage');
        document.getElementById(spanId).classList.remove('form-hint');
        document.getElementById(spanId).innerHTML = errMsg;
        return false;
    };

    const showSuccess = (inputId, spanId, sucessMsg, beforeinput, afterinput) => {
        document.getElementById(inputId).classList.add(beforeinput);
        document.getElementById(inputId).classList.remove(afterinput);
        document.getElementById(spanId).classList.remove('Errormessage');
        document.getElementById(spanId).classList.add('form-hint');
        document.getElementById(spanId).textContent = sucessMsg;
        return true;
    };

    firstName.addEventListener('keyup', () => {
        console.log(firstName.id);
        fn = check(firstName, 'beforeinput', 'afterinput', 'nameHint1', "Enter Valid First name", "", regexName)
    });

    lastName.addEventListener('keyup', () => {
        console.log(lastName.id);
        ln = check(lastName, 'beforeinput', 'afterinput', 'nameHint2', "Enter Valid Last name", "", regexName)
    });

    userName.addEventListener('keyup', () => {
        console.log(userName.id);
        ln = check(userName, 'beforeinput', 'afterinput', 'UsernameHint', "Enter Valid User name", "You can use letters, numbers & periods", regexEmail)
    });

    password.addEventListener('keyup', () => {
        console.log(password.id);
        ln = check(password, 'beforeinput', 'afterinput', 'passHint', "Enter Valid Password", "Use 8 or more characters with a mix of letters, numbers & symbols", regexPass)
    });

    Cpassword.addEventListener('keyup', () => {
        console.log(Cpassword.id);
        ln = check(Cpassword, 'beforeinput', 'afterinput', 'passHint', "Enter Valid Confirm password", "Use 8 or more characters with a mix of letters, numbers & symbols", regexPass)
    });

    function check(input, beforeinput, afterinput, spanId, errMsg, sucessMsg, regex) {
        if (!regex.test(input.value)) {
            a = showError(input.id, spanId, errMsg, beforeinput, afterinput);
            return 0;
        } else {
            a = showSuccess(input.id, spanId, sucessMsg, beforeinput, afterinput);
            return 1;
        }
    };

    cls.addEventListener('click', () => {
        console.log("Welcome", firstName.value, lastName.value, userName.value, password.value);
        if ((fn == 1) && (ln == 1) && (un == 1) && (psw == 1) && (cpsw == 1)) {
            let data = {
                FirstName: firstName.value,
                LastName: lastName.value,
                Email: userName.value,
                Password: password.value
            }
            console.log(data);
            $.ajax({
                url: "https://localhost:44383/api/User/Register",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
                success: function (result) {
                    console.log(result);
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }
    })

})


function show() {

    var password = document.getElementById('pass');
    var confirm = document.getElementById('Cpass');

    if (password.type === "password", confirm.type === "password") {
        password.type = "text";
        confirm.type = "text";
    }
    else if (password.type === "text", confirm.type === "text") {
        password.type = "password";
        confirm.type = "password";
    }
}