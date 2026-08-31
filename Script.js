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

    } catch (error) {

        console.error(error);

        content.innerHTML = "<p>ERROR: Could not load page.</p>";

    }
}


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
