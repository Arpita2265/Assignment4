

let cart = [];
let totalAmount;



document.addEventListener("DOMContentLoaded", () => {
    const addButtons = document.querySelectorAll(".add-btn");
    const cartItemsContainer = document.getElementById("cart-items");
    totalAmount = document.getElementById("totalamount");
    const emptyCartMsg = document.querySelector(".emptyCart");

    function updateCartTable() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            emptyCartMsg.style.display = "block";
        } else {
            emptyCartMsg.style.display = "none";
        }

        cart.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(row);
            total += item.price;
        });

        totalAmount.textContent = `₹${total.toFixed(2)}`;
    }

    addButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const name = btn.getAttribute("data-name");
            const price = parseFloat(btn.getAttribute("data-price"));
            const existingItemIndex = cart.findIndex(item => item.name === name);

            if (existingItemIndex === -1) {
                cart.push({ name, price });
                btn.innerHTML = 'Remove Item&nbsp;<ion-icon class="icon" name="remove-circle-outline"></ion-icon>';
            } else {
                cart.splice(existingItemIndex, 1);
                btn.innerHTML = 'Add Item&nbsp;<ion-icon class="icon" name="add-circle-outline"></ion-icon>';
            }
            updateCartTable();
        });
    });

    cartTable = updateCartTable();
});





// ✅ EmailJS Send Function
function sendMail() {

    const cartHTML = cart.map((item, index) => `${index + 1}.  ${item.name} - ₹${item.price.toFixed(2)}
    `).join("");


    const params = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,



        cart_html: cartHTML,




        totalAmount: totalAmount.textContent,





    };

    // ⚠ Replace with your actual EmailJS IDs
    const serviceID = "service_gw6fmlr";
    const templateID = "template_2ekkf2p";

    console.log("Sending Email with params:", params);

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            console.log("✅ Email sent successfully:", res.status);
            document.querySelector(".successful").style.visibility = "visible";
            document.querySelector(".unsuccessful").style.visibility = "hidden";

            // Optional: Clear form
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
           
        })
.catch (err => {
    console.error("❌ Email failed:", err);
    document.querySelector(".unsuccessful").style.visibility = "visible";
    document.querySelector(".successful").style.visibility = "hidden";
});
}
