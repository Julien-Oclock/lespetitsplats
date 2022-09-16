import recipeFactory from "./scripts/factory/recipeFactory.js";
import Recipes from "./scripts/model/Recipes.js";

async function getRecipes() {
    let recipes = [];
    fetch("./data/recipes.json")
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(data => {
            console.log(data)
            recipes = data.recipes
        })
        .then(() => {
            displayRecipes(recipes);
        })
    return recipes;

}

async function displayRecipes(recipes) {
    const recipesContainer = document.querySelector(".result");
    console.log(recipes)
    recipes.forEach(recipe => {
        const recipeFactoryInstance = recipeFactory(recipe);
        recipesContainer.appendChild(recipeFactoryInstance.getUserCardDOM());
    });
}

async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes);
}

init()