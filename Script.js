
const tabs = document.querySelectorAll(".tab");
const content = document.getElementById("Portfolio_Content");

console.log("Script Working");
console.log("Tabs found:", tabs.length);
console.log("Content found:", content);

async function loadPage(page) {
    try {
        const response = await fetch(page);

        if (!response.ok) {
            throw new Error(`Page could not be loaded: ${response.status}`);
        }

        const html = await response.text();
        content.innerHTML = html;

        // Set up popup after the page is loaded
        setupImagePopup();

        // Report images that failed to load
        content.querySelectorAll(".Image_Collection img").forEach(image => {
            image.addEventListener("error", () => {
                console.error("Image failed to load:", image.getAttribute("src"));
            });
        });

    } catch (error) {
        console.error(error);
        content.innerHTML = "<p>ERROR: Could not load page.</p>";
    }
}

function setupImagePopup() {
    const popup = content.querySelector("#ImagePopup");
    const popupImage = content.querySelector("#PopupImage");
    const closeButton = content.querySelector(".Popup_Close");

    if (!popup || !popupImage || !closeButton) {
        console.error("Popup elements not found in loaded page.");
        return;
    }

    const images = content.querySelectorAll(".Image_Collection img");

    images.forEach(image => {
        image.addEventListener("click", () => {
            if (!image.complete || image.naturalWidth === 0) {
                console.error("Cannot open broken image:", image.getAttribute("src"));
                return;
            }

            popupImage.src = image.src;
            popupImage.alt = image.alt;
            popup.style.display = "flex";
        });
    });

    closeButton.onclick = () => {
        popup.style.display = "none";
        popupImage.removeAttribute("src");
    };

    popup.onclick = event => {
        if (event.target === popup) {
            popup.style.display = "none";
            popupImage.removeAttribute("src");
        }
    };
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        const popup = content.querySelector("#ImagePopup");
        const popupImage = content.querySelector("#PopupImage");

        if (popup) popup.style.display = "none";
        if (popupImage) popupImage.removeAttribute("src");
    }
});

tabs.forEach(tab => {
    tab.addEventListener("click", function(event) {
        event.preventDefault();

        const page = this.getAttribute("href");

        tabs.forEach(item => item.classList.remove("active"));
        this.classList.add("active");

        loadPage(page);
    });
});
