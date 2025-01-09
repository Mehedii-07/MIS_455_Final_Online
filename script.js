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