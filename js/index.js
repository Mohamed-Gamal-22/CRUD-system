var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var myRow = document.getElementById("myRow");
var searchInput = document.getElementById("searchInput");
var btnAdd = document.getElementById("btnAdd");
var btnEdit = document.getElementById("btnEdit");

var productList;
var currentIndex;

if (localStorage.getItem("products") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("products"));
  display(productList);
}

function addProduct() {
  if (
    validateInputs(productNameInput) &&
    validateInputs(productPriceInput) &&
    validateInputs(productCategoryInput) &&
    validateInputs(productDescriptionInput)
    // productNameInput.classList.contains("is-valid") &&
    // productPriceInput.classList.contains("is-valid") &&
    // productCategoryInput.classList.contains("is-valid") &&
    // productDescriptionInput.classList.contains("is-valid")
  ) {
    var product = {
      code: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescriptionInput.value,
      img: `crudImages/${productImageInput.files[0]?.name}`,
    };

    productList.push(product);
    display(productList);
    localStorage.setItem("products", JSON.stringify(productList));

    console.log(productList);
    // clearForm();
  } else {
    alert("not valid data");
  }
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
}

function display(arr) {
  var cartona = ``;

  for (var i = 0; i < arr.length; i++) {
    // arr[i] ==> objct (product)

    cartona += `<div class="col-md-2">
    <div class="item">
    <img src="${arr[i].img}" class="w-100" alt="product">
      <h2 class="h5">Name ${arr[i].code}  </h2>
      <p>price : ${arr[i].price} </p>
      <p>Category : ${arr[i].category} </p>
      <p>desc : ${arr[i].desc} </p>
      <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100">Delete<i class="fas fa-trash-alt ms-2"></i></button>
      <button onclick="setDataToForm(${i})"  class="btn btn-outline-warning w-100 my-2">Update<i class="fas fa-pen ms-2"></i></button>
    </div>
  </div>`;
  }

  myRow.innerHTML = cartona;
}

function deleteProduct(deletedIndex) {
  productList.splice(deletedIndex, 1);
  display(productList);
  localStorage.setItem("products", JSON.stringify(productList));
}

function searchProduct() {
  console.log("fire");
  var word = searchInput.value;

  var searchedList = [];

  for (var i = 0; i < productList.length; i++) {
    if (productList[i].code.toUpperCase().includes(word.toUpperCase())) {
      searchedList.push(productList[i]);
    }
  }

  display(searchedList);
}

function validateInputs(element) {
  var regex = {
    productName: /^[A-Za-z]{2,20}$/,
    productPrice: /^[1-9][0-9]{0,3}$/,
    productCategory: /^(mobile|tv|screen|labtop)$/i,
    productDescription: /^\w{0,20}$/,
  };

  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

function setDataToForm(index) {
  currentIndex = index;
  // console.log(productList[index]);
  productNameInput.value = productList[index].code;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].desc;

  productNameInput.classList.add("is-valid");
  productPriceInput.classList.add("is-valid");
  productDescriptionInput.classList.add("is-valid");
  productCategoryInput.classList.add("is-valid");

  btnAdd.classList.add("d-none");
  btnEdit.classList.remove("d-none");
}

function updateProduct() {
  if (
    productNameInput.classList.contains("is-valid") &&
    productPriceInput.classList.contains("is-valid") &&
    productCategoryInput.classList.contains("is-valid") &&
    productDescriptionInput.classList.contains("is-valid")
  ) {
    productList[currentIndex].code = productNameInput.value;
    productList[currentIndex].price = productPriceInput.value;
    productList[currentIndex].category = productCategoryInput.value;
    productList[currentIndex].desc = productDescriptionInput.value;

    display(productList);
    localStorage.setItem("products", JSON.stringify(productList));
    btnAdd.classList.remove("d-none");
    btnEdit.classList.add("d-none");
  } else {
    alert("can't update");
  }
  // console.log(currentIndex);
}

// JSON
// var test = [
//   { code: "samsung", price: 3000, category: "screen", desc: "good" },
//   { code: "nokia", price: 3000, category: "screen", desc: "good" },
//   { code: "redmi", price: 3000, category: "screen", desc: "good" },
//   { code: "lg", price: 3000, category: "screen", desc: "good" },
//   { code: "samsung", price: 3000, category: "screen", desc: "good" },
//   { code: "samsung", price: 3000, category: "screen", desc: "good" },
//   { code: "samsung", price: 3000, category: "screen", desc: "good" },
// ];

// localStorage.setItem("userName", "mohamed")
// localStorage.setItem("userName", "ahmed")
// console.log(localStorage.getItem("userName"));

// localStorage.removeItem("userName")
// localStorage.clear()

// console.log(localStorage.length);

// sessionStorage.setItem("userName", "hambozo")
// console.log(sessionStorage.getItem("userName"));

// var str = "web design and web development at route academy".split(" ").slice(0,5).join(" ")
// console.log(str);

// regular expression ===> validation

/* 
  * ==> {0,}
  + ==> {1,}
  ? ==> {0,1}
*/
