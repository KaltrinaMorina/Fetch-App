(function () {
  "use strict";

  //Variables
  const addForm = document.getElementById("add-form");
  const addModal = document.getElementById("add-modal");
  const closeModalEl = document.getElementById("close-modal");
  const productsList = document.getElementById("products-section");

  const addButtons = document.getElementsByClassName("add_button");

  //console.log(addButtons);
  //console.log(addForm,addModal,closeModalEl,productsList,addButtons);

  Array.from(addButtons).forEach(function (element) {
    element.addEventListener("click", showAddModal);
  });

async function getProducts(){
  try{
    const response=await fetch("https://dummyjson.com/products");
     const values=await response.json();

     values.products.forEach((item) =>
      renderProduct({
        title:item.title,
        price:item.price,
        thumbnail:item.thumbnail,
        description: item.description,
      })
     );
  }catch(error){
  console.error(error);
} 
}
   function renderProduct(product){
    productsList.insertAdjacentHTML(
      "beforeend",
          `<div class="products-section-item">
                  <div class="products-section-item__thumb">
                    <img src="${product.thumbnail}" alt="${product.title}" />
                  </div>
                  <div class="products-section-item__content">
                    <div class="products-section-item__headings">
                      <h3 class="products-section-item__title">
                      ${product.title}
                      </h3>
                      <p class="products-section-item__description">
                      ${product.description}
                      </p>
                    </div>
                    <span class="products-section-item__price">
                      ${product.price}€
                    </span>
                  </div>
                </div>`
       );
    }
   

  function showAddModal() {
    addModal.classList.add("add_modal--shown");
  }

  closeModalEl.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
      closeModal();
    }
  });
  function closeModal() {
    addModal.classList.remove("add_modal--shown");
    addForm.reset();
  }
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    renderProduct({
      title:formData.get("title"),
      description:formData.get("description"),
      price: formData.get("price"),
    }

    )
    addModal.classList.remove("add_modal--shown");
    this.reset();
  });
   getProducts();
})();
