
const tabs = document.querySelectorAll(".tab");
const content = document.getElementById("Portfolio_Content");

console.log("Script Working");
console.log("Tabs found:", tabs.length);
console.log("Content found:", content);

async function loadPage(page) {
    try {
        const response = await fetch(page);

        if (!response.ok) {
            throw new Error("Page could not be loaded");
        }

        const html = await response.text();

        content.innerHTML = html;

        // Setup popup after loading the page
        setupImagePopup();

    } catch (error) {
        console.error(error);
        content.innerHTML = "<p>ERROR: Could not load page.</p>";
    }
}

function setupImagePopup() {
    const popup = document.getElementById("ImagePopup");
    const popupImage = document.getElementById("PopupImage");
    const closeButton = document.querySelector(".Popup_Close");

    if (!popup || !popupImage || !closeButton) {
        console.error("Popup elements not found.");
        return;
    }

    // Make each image clickable
    const images = content.querySelectorAll(".Image_Collection img");

    images.forEach(image => {
        image.addEventListener("click", () => {
            popupImage.src = image.src;
            popupImage.alt = image.alt;
            popup.style.display = "flex";
        });
    });

    // Close using the X button
    closeButton.onclick = () => {
        popup.style.display = "none";
        popupImage.src = "";
    };

    // Close by clicking the dark background
    popup.onclick = event => {
        if (event.target === popup) {
            popup.style.display = "none";
            popupImage.src = "";
        }
    };
}

// Close popup using Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        const popup = document.getElementById("ImagePopup");
        const popupImage = document.getElementById("PopupImage");

        if (popup) popup.style.display = "none";
        if (popupImage) popupImage.src = "";
    }
});

// Handle tab clicks
tabs.forEach(tab => {
    tab.addEventListener("click", function(event) {
        event.preventDefault();

        const page = this.getAttribute("href");

        // Change active tab
        tabs.forEach(tab => {
            tab.classList.remove("active");
        });

        this.classList.add("active");

        // Load selected page
        loadPage(page);
    });
});
