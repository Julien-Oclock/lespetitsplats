import recipeFactory from "./scripts/factory/recipeFactory.js";

const app = {
    init: async function () {
        app.recipes = await app.getRecipes();
        setInterval(() => {
            app.displayRecipes();
        }, 50)
    },

    recipes: [],
    getRecipes: async function () {
        fetch("./data/recipes.json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                app.recipes = data.recipes
                console.log(app.recipes)
            })
            .then(() => {
                app.displayRecipes(app.recipes);
            })
    },
    displayRecipes: async function () {
        const recipesContainer = document.querySelector(".result");
        app.recipes.forEach(recipe => {
            const recipeFactoryInstance = recipeFactory(recipe);
            recipesContainer.appendChild(recipeFactoryInstance.getUserCardDOM());
        });
    },

}
document.addEventListener('DOMContentLoaded', app.init)