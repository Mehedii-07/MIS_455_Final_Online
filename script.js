const apiBaseUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const mealsContainer = document.getElementById("mealsContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moreMealsBtn = document.getElementById("moreMealsBtn");
const modal = document.getElementById("mealModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalInstructions = document.getElementById("modalInstructions");

let allMeals = [];
let displayedMealsCount = 0;
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMeals(query);
        searchInput.value = ""; // Clear the input field after search
    }
});

// Add event listener for Enter key to trigger search
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
            fetchMeals(query);
            searchInput.value = ""; // Clear the input field after search
        }
    }
});

moreMealsBtn.addEventListener("click", () => {
    displayMeals(allMeals, true);
});

async function fetchMeals(query) {
    const url = `${apiBaseUrl}${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        allMeals = data.meals || [];
        displayedMealsCount = 0;
        mealsContainer.innerHTML = "";
        moreMealsBtn.classList.add("d-none");

        if (allMeals.length > 0) {
            displayMeals(allMeals, false);
        } else {
            mealsContainer.innerHTML = `<p class='text-danger'>No meals found. Try another search!</p>`;
        }
    } catch (error) {
        mealsContainer.innerHTML = `<p class='text-danger'>Error fetching data. Please try again later.</p>`;
    }
}

function displayMeals(meals, showAll) {
    const start = displayedMealsCount;
    const end = showAll ? meals.length : Math.min(displayedMealsCount + 5, meals.length);
    const mealsToShow = meals.slice(start, end);

    mealsToShow.forEach(meal => {
        const mealCard = `
            <div class="col-md-4 col-sm-6">
                <div class="card mb-4">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text"><strong>ID:</strong> ${meal.idMeal}</p>
                        <p class="card-text"><strong>Category:</strong> ${meal.strCategory || "N/A"}</p>
                        <p class="card-text"><strong>Area:</strong> ${meal.strArea || "N/A"}</p>
                        <p class="card-text">${meal.strInstructions.slice(0, 100)}...</p>
                        <button class="btn btn-primary see-more-btn" 
                            data-title="${meal.strMeal.replace(/"/g, '&quot;')}" 
                            data-image="${meal.strMealThumb}" 
                            data-instructions="${meal.strInstructions.replace(/"/g, '&quot;')}">
                            See More Instructions
                        </button>
                    </div>
                </div>
            </div>
        `;
        mealsContainer.innerHTML += mealCard;
    });

    displayedMealsCount = end;

    if (displayedMealsCount < meals.length) {
        moreMealsBtn.classList.remove("d-none");
    } else {
        moreMealsBtn.classList.add("d-none");
    }

    // Attach event listeners for "See More Instructions" buttons
    document.querySelectorAll('.see-more-btn').forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            const image = button.getAttribute('data-image');
            const instructions = button.getAttribute('data-instructions');

            showModal(title, image, formatInstructions(instructions));
        });
    });
}

// Format instructions into step-by-step points
function formatInstructions(instructions) {
    const steps = instructions.split(". ").filter(step => step.trim() !== "");
    return steps
        .map((step, index) => `<strong>Step ${index + 1}:</strong> ${step.trim()}.`)
        .join("<br><br>");
}

function showModal(title, image, formattedInstructions) {
    modalTitle.textContent = title;
    modalImage.src = image;
    modalInstructions.innerHTML = formattedInstructions;
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}


