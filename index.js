import recipeFactory from "./scripts/factory/recipeFactory.js";

const app = {
    init: async function () {
        app.recipes = await app.getRecipes();
        setTimeout(() => {
            app.displayRecipes();
            app.toggleCLass();
            app.displayIngredients()
            app.displayDevices()
            app.displayUstensils()
        }, 50)
    },

    recipes: [],
    ingredients: [],
    devices: [],
    ustensils: [],

    toggleCLass: async function () {
        const searchInput = document.querySelectorAll(".searchInput");
        searchInput.forEach((input) => {
            input.addEventListener('click', () => {
                const tagContainer = input.parentElement;
                const resultContainer = tagContainer.childNodes[5];
                resultContainer.classList.toggle('hidden');
            })
        })
    },


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

    getIgredients: async function () {
        let ingredients = [];
        app.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                ingredients.push(ingredient.ingredient)
            })
        });
        app.ingredients = new Set(ingredients)
        console.log(app.ingredients)
    },

    getDevices: async function () {
        let devices = [];
        app.recipes.forEach(recipe => {
            devices.push(recipe.appliance)
        });
        app.devices = new Set(devices)
        console.log(app.devices)
    },

    getUstensils: async function () {
        let ustensils = [];
        app.recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                ustensils.push(ustensil)
            })
        });
        app.ustensils = new Set(ustensils)
        console.log(app.ustensils)
    },

    displayIngredients: async function () {
        app.getIgredients()
        const ingredientsContainer = document.querySelector(".results-ingredients");
        const ingredientList = document.createElement("ul");
        ingredientList.classList.add("results-ingredients-list");
        ingredientList.classList.add("blue");
        ingredientsContainer.appendChild(ingredientList);
        app.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement("li");
            ingredientItem.classList.add("results-ingredients-item");
            ingredientItem.innerHTML = ingredient;
            ingredientList.appendChild(ingredientItem);
        })
    },

    displayDevices: async function () {
        app.getDevices()
        const devicesContainer = document.querySelector(".results-devices");
        const devicesList = document.createElement("ul");
        devicesList.classList.add("results-devices-list");
        devicesList.classList.add("green");
        devicesContainer.appendChild(devicesList);
        app.devices.forEach(device => {
            const deviceItem = document.createElement("li");
            deviceItem.classList.add("results-devices-item");
            deviceItem.innerHTML = device;
            devicesList.appendChild(deviceItem);
        })
    },

    displayUstensils: async function () {
        app.getUstensils()
        const ustensilsContainer = document.querySelector(".results-kitchenware");
        const ustensilsList = document.createElement("ul");
        ustensilsList.classList.add("results-kitchenware-list");
        ustensilsList.classList.add("red");
        ustensilsContainer.appendChild(ustensilsList);
        app.ustensils.forEach(ustensil => {
            const ustensilItem = document.createElement("li");
            ustensilItem.classList.add("results-kitchenware-item");
            ustensilItem.innerHTML = ustensil;
            ustensilsList.appendChild(ustensilItem);
        })
    }


}
document.addEventListener('DOMContentLoaded', app.init)