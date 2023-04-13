/////////////// REGISTER AND LOGIN ////////////////////////
const token = localStorage.getItem('token')
if (!token) {
    window.location.href = "login.html";
}
console.log(token);
////////////////// Logout btn  ////////////////
const elLogoutBtn = document.querySelector(".js-logout")
elLogoutBtn.addEventListener("click", function () {
    window.localStorage.removeItem("token");
    window.location.href("login.html");
});


//////////////////   POST ZAPROS        ///////////////////
document.getElementById('form').addEventListener('submit', function (evt) {
    evt.preventDefault();
    
    const productFile = document.getElementById('file').files[0];
    const productName = document.getElementById('name').value;
    const productDesc = document.getElementById('description').value;
    const productPrice = document.getElementById('price').value;

    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('product_desc', productDesc);
    formData.append('product_img', productFile, 'product_img.jpg');
    formData.append('product_price', productPrice);
    // formData.append("token",token)

    fetch('http://localhost:5000/product', {
            method: "POST",
            headers: {
                "Authorization": `${token}`
            },
            body: formData,
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
})


////////////////////      GET ZAPROS       ////////////////

const elTemplate = document.querySelector('.js-product_template').content;
const elProductName = document.querySelector(".js-product_name");
const elProductDesc = document.querySelector(".js-product_desc");
const elProductImg = document.querySelector(".js-product_img");
const elProductPrice = document.querySelector(".js-product_price");
const elResult = document.querySelector('.js-new-prosucts');
const newProductFragment = new DocumentFragment();

fetch('http://localhost:5000/product', {
        method: "GET",
        headers: {
            "Authorization": `${token}`
        },
    })
    .then(res => res.json())
    .then(data => renderProduct(data))

function renderProduct(array) {
    
    array.forEach(product => {
        const elTemplateClone = elTemplate.cloneNode(true);
        elTemplateClone.querySelector('.js-product_img').src = product.product_img;
        elTemplateClone.querySelector('.js-product_name').textContent = product.product_name;
        elTemplateClone.querySelector('.js-product_desc').textContent = product.product_desc;
        elTemplateClone.querySelector('.js-product_price').textContent = product.product_price;
        newProductFragment.appendChild(elTemplateClone);
    })
    elResult.appendChild(newProductFragment);
}



///////////////  BTNS EVENTS  /////////////////

const elProductEditBtn = document.querySelector('.js-product-edit');
const elProductKorzinaBtn = document.querySelector('.js-product-addkorzina');
const elProductDeleteBtn = document.querySelector('.js-product-delete');

////////////////  PUT ZAPROS  ////////////////

// document.querySelector('.js-product-edit').addEventListener('click', function (evt) {
//     evt.preventDefault();
//     const productFile = document.getElementById('file').files[0];
//     const productName = document.getElementById('name').value;
//     const productDesc = document.getElementById('description').value;
//     const productPrice = document.getElementById('price').value;

//     const formData = new FormData();
//     formData.append('product_name', productName);
//     formData.append('product_desc', productDesc);
//     formData.append('product_img', productFile, 'product_img.jpg');
//     formData.append('product_price', productPrice);
//     // obj = {
//     //     product_name: productName,
//     //     product_desc: productDesc,
//     //     product_img: productFile,
//     //     product_price:productPrice
//     // }

//     fetch('http://localhost:5000/product/1', {
//             method: 'PUT',
//             headers: {
//                 'Content-type': 'application/json',
//                 "Authorization": `${token}`
//             },
//             body: formData,
//         })
//         .then(res => res.json())
//         .then(data => console.log(data))
//         .catch(err => console.log(err));
// });

// const API_PATH = 'http://localhost:5000/';
// async function setProduct(id) {
//     if (id >= 0) {
//         try {
//             // Create FormData object
//             const formData = new FormData();
//             formData.append('product_name', elProductName.value);
//             formData.append('product_desc', elProductDesc.value);
//             formData.append('product_price', elProductPrice.value);
//             formData.append('product_img', elProductImg.files[0]); // Append the image file

//              const res = await fetch(API_PATH + 'product/' + id, {
//                 method: 'PUT',
//                 headers: {
//                     Authorization: token,
//                 },
//                 body: formData // Pass the FormData object as the request body
//             });
//         } catch (error) {
//             console.log(error.message);
//         }
//     } else {
//         try {
//             // Create FormData object
//             const formData = new FormData();
//             formData.append('product_name', elProductName.value);
//             formData.append('product_desc', elProductDesc.value);
//             formData.append('product_price', elProductPrice.value);
//             formData.append('product_img', elProductImg.files[0]); // Append the image file

//             const res = await fetch(API_PATH + 'product', {
//                 method: 'POST',
//                 headers: {
//                     Authorization: token,
//                 },
//                 body: formData // Pass the FormData object as the request body
//             });
//             const data = await res.json();
//             console.log(data);
//         } catch (error) {
//             console.log(error.message);
//         }
//     }
// }

// elProductEditBtn.addEventListener('click', function(evt){
//     evt.preventDefault();
//     setProduct();
// })

////////////// DELETE ZAPROS ////////////

// function deleteSomething(id){
//     fetch('http://localhost:5000/product/' + id, {
//       method: "DELETE",
//       headers: {
//         "Authorization": `${token}`
//     },
//     })
//   }


// elProductDeleteBtn.addEventListener('submit', function(evt){
//     evt.preventDefault();
//     fetch('http://localhost:5000/product/1', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           "Authorization": `${token}`
//         },
//         // qo'shimcha so'rov body'si (kerak bo'lsa)
//          body: JSON.stringify(data)
//       })
//       .then(response => {
//         if (response.ok) {
//           // delete so'rovi muvaffaqiyatli bo'lganda ishlatiladi
//           console.log(`Ma\'lumot muvaffaqiyatli o\'chirildi`);
//         } else {
//           // delete so'rovi muvaffaqiyatsiz bo'lganda ishlatiladi
//           console.error(`Ma\'lumot o\'chirishda xatolik yuz berdi`);
//         }
//       })
//       .catch(error => {
//         // hatolarni ushlab turish uchun catch qismi
//         console.error('Xatolik yuz berdi:', error);
//       });
// })


