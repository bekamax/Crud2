function initStorage() {
  if (!localStorage.getItem("db")) {
    localStorage.setItem("db", "[]");
  }
}
initStorage();
function getContactsFromLS() {
  const contacts = JSON.parse(localStorage.getItem("db"));
  return contacts;
}
// console.log(getContactsFromLS());
function setContactsToLS(contacts) {
  localStorage.setItem("db", JSON.stringify(contacts));
}

let contacts = getContactsFromLS();
console.log(contacts);

const container = document.querySelector(".container");
const nameInp = document.querySelector("#input_name");
const surNameInp = document.querySelector("#input_sur_name");
const numberInp = document.querySelector("#input_number");
const imageInp = document.querySelector("#input_img");
const addBtnInModal = document.querySelector("#addBtnInModal");
const saveBtnInModal = document.querySelector("#saveBtnInModal");
const closeOverlow = document.querySelector(".overlay");
const closeBtn = document.querySelector(".btn_close");
const searchInp = document.querySelector("#search-inp");
const addTriger = document.querySelector("#add-triger");
const modal = document.querySelector("#modal");
const eddBtn = document.querySelector(".edit_btn");

addTriger.addEventListener("click", () => {
  addBtnInModal.style.display = "block";
  saveBtnInModal.style.display = "none";

  !nameInp.value.trim() ||
    !surNameInp.value.trim() ||
    !numberInp.value.trim() ||
    !imageInp.value.trim();
});

//!modal

addTriger.addEventListener("click", () => {
  modal.style.display = "flex";
});
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
closeOverlow.addEventListener("click", () => {
  modal.style.display = "none";
});

//!render
function render(data = getContactsFromLS()) {
  container.innerHTML = "";
  data.forEach((item, index) => {
    container.innerHTML += `
    <div class="card">
          <div class="card_inner">
            <img
              src="${item.image}"
              class="card_img"
              width="50px"
            />
            <h1 class="name style_card_title">${item.name}</h1>
            <h1 class="sur_name style_card_title">${item.surName}</h1>
            <h3 class="number style_card_title">${item.number}</h3>
          </div>
          <div class="buttons">
            <button class="edit_btn" id="${index}">Edit</button>
            <button class="delete_btn" id="${index}">Delete</button>
          </div>
        </div>
`;
    container.innerHTML += `

`;
  });
}
render();

//!creat
function creatContact() {
  if (
    !nameInp.value.trim() ||
    !surNameInp.value.trim() ||
    !numberInp.value.trim() ||
    !imageInp.value.trim()
  ) {
    alert("Некоторые поля не заполнены");
    return;
  }

  let newContact = {
    name: nameInp.value,
    surName: surNameInp.value,
    number: numberInp.value,
    image: imageInp.value,
  };

  let contacts = getContactsFromLS();
  contacts.push(newContact);
  setContactsToLS(contacts);
  console.log(contacts);
  nameInp.value = "";
  surNameInp.value = "";
  imageInp.value = "";
  numberInp.value = "";

  closeBtn.click();
  render();
}

addBtnInModal.addEventListener("click", creatContact);

//!update
let id = null;
function getOneContactByIndex(index) {
  const contactObj = getContactsFromLS()[index];
  return contactObj;
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit_btn")) {
    let fuondObj = getOneContactByIndex(e.target.id);
    nameInp.value = fuondObj.name;
    surNameInp.value = fuondObj.surName;
    numberInp.value = fuondObj.number;
    imageInp.value = fuondObj.image;
    id = e.target.id;
    modal.style.display = "flex";
    saveBtnInModal.style.display = "block";
    addBtnInModal.style.display = "none";
  }
});

saveBtnInModal.addEventListener("click", () => {
  if (
    !nameInp.value.trim() ||
    !surNameInp.value.trim() ||
    !numberInp.value.trim() ||
    !imageInp.value.trim()
  ) {
    alert("Some inputs era empty");
    return;
  }
  const editedObj = {
    name: nameInp.value,
    surName: surNameInp.value,
    number: numberInp.value,
    image: imageInp.value,
  };

  const contacts = getContactsFromLS();
  contacts.splice(id, 1, editedObj);
  setContactsToLS(contacts);

  nameInp.value = "";
  surNameInp.value = "";
  imageInp.value = "";
  numberInp.value = "";

  closeBtn.click();
  render();
});

//!delete
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete_btn")) {
    let ans = confirm("A you sure?");
    if (!ans) return;
    const contacts = getContactsFromLS();
    contacts.splice(e.target.id, 1);
    setContactsToLS(contacts);
    render();
  }
});

//!search
searchInp.addEventListener("input", (e) => {
  const contacts = getContactsFromLS();
  const filter = contacts.filter(
    (item) =>
      item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
  );
  render(filter);
});
