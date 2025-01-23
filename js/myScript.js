var nameInput=document.getElementById("productName");
var categoryInput=document.getElementById("productCategory");
var priceInput=document.getElementById("productPrice");
var descriptionInput=document.getElementById("productDescription");
var tbody=document.getElementById("tbody");
var searshInput=document.getElementById("searchInput");
  var i="";

if(localStorage.getItem("ProductsStorage")==null){
    var products=[];
}else{
    var products=JSON.parse(localStorage.getItem("ProductsStorage"));
    console.log(products)
}

function addProducts(){
    var product = {
        pname : nameInput.value,
        pcat : categoryInput.value,
        pprice : Number(priceInput.value),
        pdesc: descriptionInput.value,
     }
    console.log(product);
     products.push(product);
     localStorage.setItem("ProductsStorage",JSON.stringify(products));
     displayproduct();
     clearproduct();
}
function clearproduct(){
    nameInput.value="";
    categoryInput.value="";
    priceInput.value="";
    descriptionInput.value="";
}
function displayproduct(){
    console.log("test");
    var str="";
    console.log(products.length)
    for(var i=0; i<products.length; i++){
         str +=`<tr>
          <td>${i}</td>
        <td>${products[i].pname}</td>
        <td>${products[i].pcat}</td>
        <td>${products[i].pprice}</td>
        <td>${products[i].pdesc}</td>
        <td>
        <button class="btn btn-warning" onclick="updateproduct(${i})"> update</button>
        </td>
        <td>
        <button onclick="deleteproduct(${i})" class="btn btn-danger"> delete</button>
        </td>
         </tr>`
    }
    tbody.innerHTML=str;
}

displayproduct();

var button =document.getElementById("update");
 function updateproduct(k){
  nameInput.value=products[k].pname;
  categoryInput.value=products[k].pcat;
  priceInput.value=products[k].pprice;
  descriptionInput.value=products[k].pdesc;
  button.innerHTML="update product";
  button.classList.add("btn-secondary" , "text-white");
  button.onclick=function(){
    products=JSON.parse(localStorage.getItem("ProductsStorage"));
    products[k].pname=nameInput.value;
    products[k].pcat.categoryInput;
    products[k].pprice= priceInput.value;
    products[k].pdesc=descriptionInput.value;
    localStorage.setItem("ProductsStorage",JSON.stringify(products));
    displayproduct();
    clearproduct();
    button.innerHTML="add product";
    button.classList.remove("btn-secondary" , "text-white");
    button.onclick=function(){
        addProducts();
    }
  }

 }

 function deleteproduct(k){
    
    products.splice(k, 1);
    localStorage.setItem("ProductsStorage",JSON.stringify(products));
    displayproduct();
}

 function searchProduct() {
    const searchValue = searchInput.value.toLowerCase();
    const rows = Array.from(tbody.getElementsByTagName("tr"));
    const nameColumns = rows.map(row => row.getElementsByTagName("td")[1]);

    rows.forEach((row, i) => {
    const nameText = nameColumns[i].textContent.toLowerCase();
    const shouldDisplay = nameText.includes(searchValue);
    nameColumns[i].innerHTML = shouldDisplay
        ? nameText.replace(searchValue, '<span class="highlight">' + searchValue + '</span>')
        : nameText;
    row.style.display = shouldDisplay ? "" : "none";
    });
}
