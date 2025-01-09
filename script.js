const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const mealsContainer = document.getElementById('mealsContainer');
const showAllButton = document.getElementById('showAllButton');

let allMeals = [];

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (!query) return;

    fetchMeals(query);
});

showAllButton.addEventListener('click', () => {
    displayMeals(allMeals);
    showAllButton.classList.add('d-none');
});

async function fetchMeals(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        allMeals = data.meals || [];
        mealsContainer.innerHTML = '';

        if (allMeals.length === 0) {
            mealsContainer.innerHTML = '<p class="text-danger">No meals found!</p>';
            return;
        }

        if (allMeals.length > 5) {
            displayMeals(allMeals.slice(0, 5));
            showAllButton.classList.remove('d-none');
        } else {
            displayMeals(allMeals);
        }
    } catch (error) {
        console.error('Error fetching meals:', error);
        mealsContainer.innerHTML = '<p class="text-danger">An error occurred while fetching meals.</p>';
    }
}

function displayMeals(meals) {
    mealsContainer.innerHTML = '';

    meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('col-md-4', 'meal-card');

        mealCard.innerHTML = `
            <div class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text"><strong>ID:</strong> ${meal.idMeal}</p>
                    <p class="card-text">${meal.strInstructions.slice(0, 100)}...</p>
                </div>
            </div>
        `;

        mealsContainer.appendChild(mealCard);
    });
}