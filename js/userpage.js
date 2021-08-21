const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
document.querySelector("span").textContent = "Hello, " + user.name;
document.querySelector("svg text").textContent = user.name.charAt(0).toUpperCase();
document.querySelector("svg").addEventListener('click', () => userInfo());


document.querySelector("#name").placeholder = user.name;
document.querySelector("#email").placeholder = user.email;
document.querySelector("#login").placeholder = user.login;
document.querySelector("#password").value = user.password;

const userInfo = () => {
	let userInf = document.createElement("div");
	userInf.className = "userInfo";
	document.body.prepend(userInf);

	document.querySelector(".card").classList.remove("d-none");
	document.querySelector("button").addEventListener('click', () => { closeForm()});
};

const closeForm = () => {
	document.querySelector(".card").classList.add("d-none");
	document.querySelector(".userInfo").remove();
}