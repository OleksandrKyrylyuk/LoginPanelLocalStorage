
const signIn = (event) => {
    let login = document.querySelector("#inputLogin").value;
    let password = document.querySelector("#inputPassword").value;
    if (!checkUser(login, password)) { 
        displayMessaga("danger", "Inccorect Login Or Password.");
        event.preventDefault(); 
    } 
}


const checkUser = (login, password) => {
    let data = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < data.length; i++) {
        if (data[i].Login == login && data[i].Password == password){
            const user = {
                name: data[i].Name,
                email: data[i].Email,
                login: data[i].Login,
                password: data[i].Password,
            };
            console.log(user);
            localStorage.setItem('user', JSON.stringify(user))
            return true
        }        
    }
    return false;
}

document.querySelector("#signIn").addEventListener('click', (event) => {signIn(event)});

let users = [];

document.querySelector("#signUp").addEventListener('click', () => ( signUp() ));
document.querySelector("#register").addEventListener('click', () => ( reg() ));

const signUp = () => {
    document.querySelector("h1").textContent = "REGISTRATION FORM";
    changeForm(true)
}

const reg = () => {
    
    const data = document.querySelectorAll(".form-group input");
    const user = new Object();

    for (let i = 0; i < data.length; i++) {
        user[data[i].placeholder]= data[i].value;
    }

    if (!checkFields(user)){
        displayMessaga("danger", "Please, fill all fields.");
    }

    else if ( !checkEmail(user.Email) ) {
        displayMessaga("danger", "Please input correct email");
        document.querySelector("#inputEmail").classList.add("is-invalid");
    }

    else if (checkLogin(user.Login)) {
        displayMessaga("danger", "This login is use");
        document.querySelector("#inputLogin").classList.add("is-invalid");
    }
    
    else {
        document.querySelector("#inputLogin").classList.remove("is-invalid");
        document.querySelector("h1").textContent = "LOGIN FORM";
        users = JSON.parse(localStorage.getItem('users'));
        if (users == null) users = [];
        users.push(user); 

        localStorage.setItem('users', JSON.stringify(users));

        data.forEach(el => el.value = '');
        displayMessaga("success", "User added successfully.");
        changeForm(false);
    }
}

const changeForm = (bool) => {
    let form = document.querySelector(".form-group");
    let btns = document.querySelectorAll(".d-flex button");
    btns.forEach(el => el.classList.toggle("d-none"));

    if (bool == true){
        const formNode = `<label for="inputName" class="form-label mt-4">Name</label>
        <input type="text" class="form-control" id="inputName" placeholder="Name">
        <label for="inputEmail" class="form-label mt-4">Email</label>
        <input type="email" class="form-control" id="inputEmail" placeholder="Email">`;
        form.insertAdjacentHTML('afterbegin', formNode);
    }

    if (bool == false) {
        while (form.firstChild.textContent != "Login") {
            form.firstChild.remove();
        }
    }
}

const displayMessaga = (state, text) => {
    let nodeMessage = `<div class="alert alert-dismissible alert-${state}">
                            <strong>${text}</strong>
                        </div>`;
    document.querySelector('.cont').insertAdjacentHTML('afterend',nodeMessage);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 2000);
}

const checkLogin = (login) => {
    users = JSON.parse(localStorage.getItem('users'));
    if (users == null) return false;
    else {
        let data = users.map(el => el.Login);
        if (data.indexOf(login) == -1) return false;
        else return true;
    }
    
}

const checkFields = (object) => {
    let form = document.querySelectorAll(".form-group input");
    form.forEach(el => {
        el.value == '' ? el.classList.add("is-invalid") : el.classList.remove("is-invalid");
    })

    for (const key in object) {
        if (object[key] == '') return false;
    }
    return true;
} 

const checkEmail = (email) => {
  var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(email);
}




