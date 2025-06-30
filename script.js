const form = document.querySelector("form");
const input = document.getElementById("input-city");
const resultDiv = document.getElementById("result");
const apiKey = "7d71a6ccd4094a269bd92bd5657d1453";
const baseUrl = "https://api.spoonacular.com/recipes/complexSearch";

async function fetchRecipe(recipeName) {
    const url = `${baseUrl}?apiKey=${apiKey}&query=${recipeName}&number=1&addRecipeInformation=true&fillIngredients=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
            displayRecipe(data.results[0]);
        } else {
            resultDiv.innerHTML = `<p class="text-red-600 text-xl">No recipe found for "${recipeName}".</p>`;
        }
    } catch (error) {
        console.error("API error:", error);
        resultDiv.innerHTML = `<p class="text-red-600 text-xl">Something went wrong. Please try again later.</p>`;
    }
}

function displayRecipe(recipe) {
    resultDiv.innerHTML = 
    `
        <div class="bg-white p-5 rounded-xl max-w-xl shadow-md text-black flex flex-col gap-4">
            <h2 class="text-2xl font-bold text-pink-600">${recipe.title}</h2>
            <img class="rounded-md" src="${recipe.image}" alt="${recipe.title}" />
            <p><strong>⏱ Ready in:</strong> ${recipe.readyInMinutes} mins</p>
            <p><strong>🍽 Servings:</strong> ${recipe.servings}</p>
            <h3 class="font-semibold mt-3">📝 Ingredients:</h3>
            <ul class="list-disc list-inside">
                ${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}
            </ul>
            <h3 class="font-semibold mt-3">👨‍🍳 Instructions:</h3>
            <p>${recipe.instructions || "Instructions not available."}</p>
        </div>
    `;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const recipeName = input.value.trim();
    if (recipeName !== "") {
        fetchRecipe(recipeName);
    } else {
        resultDiv.innerHTML = `<p class="text-red-600 text-xl">Please enter a recipe name.</p>`;
    }
});

