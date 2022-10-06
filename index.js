import recipeFactory from "./scripts/factory/recipeFactory.js";
import {
    searchRecipes,
    searchIngredients,
    searchDevices,
    searchUstensils
} from "./scripts/algo/search.js";

const app = {
    init: async function () {
        app.recipes = await app.getRecipes();
        setTimeout(() => {
            app.displayRecipes(app.recipes);
            app.toggleCLass();
        }, 50)
        app.globalSearchInput.addEventListener('input', app.globalSearch);
        app.ingredientsSearchInput.addEventListener('input', app.ingredientsSearch);
    },

    recipes: [],
    filteredRecipes: [],
    ingredients: [],
    devices: [],
    ustensils: [],
    globalSearchInput: document.querySelector(".search__recipes-input"),
    ingredientsSearchInput: document.querySelector(".ingredients"),
    devicesSearchInput: document.querySelector(".devices"),
    ustensilsSearchInput: document.querySelector(".kitchenware"),
    htmlTagContainer: document.querySelector('.search__tag'),

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
            })
            .then(() => {
                app.displayRecipes(app.recipes);
            })
    },

    displayRecipes: async function (recipes) {
        const recipesContainer = document.querySelector(".result");
        for (let recipe of recipes) {
            const recipeFactoryInstance = recipeFactory(recipe);
            recipesContainer.appendChild(recipeFactoryInstance.getUserCardDOM());
        };
        app.filteredRecipes = recipes;
        app.displayIngredients(recipes)
        app.displayDevices(recipes)
        app.displayUstensils(recipes)
    },

    getIgredients: async function (recipes) {
        let ingredients = [];
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                ingredients.push(ingredient.ingredient)
            })
        });
        app.ingredients = new Set(ingredients)
    },

    getDevices: async function () {
        let devices = [];
        app.recipes.forEach(recipe => {
            devices.push(recipe.appliance)
        });
        app.devices = new Set(devices)
    },

    getUstensils: async function () {
        let ustensils = [];
        app.recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                ustensils.push(ustensil)
            })
        });
        app.ustensils = new Set(ustensils)
    },

    displayIngredients: async function (recipes) {
        app.getIgredients(recipes)
        const ingredientsContainer = document.querySelector(".results-ingredients");
        ingredientsContainer.innerHTML = "";
        const ingredientList = document.createElement("ul");
        ingredientList.classList.add("results-ingredients-list");
        ingredientList.classList.add("blue");
        ingredientsContainer.appendChild(ingredientList);
        console.log({ingredients : app.ingredients})
        for (let ingredient of app.ingredients) {
            
            const ingredientItem = document.createElement("li");
            ingredientItem.classList.add("results-ingredients-list-item");
            ingredientItem.classList.add("blue");
            ingredientItem.innerHTML = ingredient;
            ingredientList.appendChild(ingredientItem);
            ingredientItem.addEventListener('click', (e) => {
                console.log(ingredient)
            })
        }
    },

    displayDevices: async function () {
        app.getDevices()
        const devicesContainer = document.querySelector(".results-devices");
        devicesContainer.innerHTML = "";
        const devicesList = document.createElement("ul");
        devicesList.classList.add("results-devices-list");
        devicesList.classList.add("green");
        devicesContainer.appendChild(devicesList);
        for (let device of app.devices) {
            const deviceItem = document.createElement("li");
            deviceItem.classList.add("results-devices-item");
            deviceItem.innerHTML = device;
            devicesList.appendChild(deviceItem);
        }
    },

    displayUstensils: async function () {
        app.getUstensils()
        const ustensilsContainer = document.querySelector(".results-kitchenware");
        ustensilsContainer.innerHTML = "";
        const ustensilsList = document.createElement("ul");
        ustensilsList.classList.add("results-kitchenware-list");
        ustensilsList.classList.add("red");
        ustensilsContainer.appendChild(ustensilsList);
        for (let ustensil of app.ustensils) {
            const ustensilItem = document.createElement("li");
            ustensilItem.classList.add("results-kitchenware-item");
            ustensilItem.innerHTML = ustensil;
            ustensilsList.appendChild(ustensilItem);
        }
    },

    globalSearch: async function (e) {
        const recipesContainer = document.querySelector(".result");
        const query = e.target.value;
        const filteredRecipes = searchRecipes(app.recipes, query);
        recipesContainer.innerHTML = "";
        app.displayRecipes(filteredRecipes)
        app.filteredRecipes = [...filteredRecipes];
    },

    ingredientsSearch: async function (e, tag = null) {
        
        const query = e.target.value.toLowerCase();
        const recipesContainer = document.querySelector(".result");
        let recipes = [...app.recipes];
        

        if (recipes.length !== app.filteredRecipes.length) {
            recipes = [...app.filteredRecipes];
        } else {
            recipes = [...app.recipes];
        }
        if (tag !== null) {
            const filteredRecipes = searchIngredients(recipes, tag);
            app.filteredRecipes = [...filteredRecipes];
            recipesContainer.innerHTML = "";
            app.displayRecipes(filteredRecipes)
            app.displayIngredients(filteredRecipes, tag)

            const htmlTag = document.createElement('div');
            htmlTag.className = 'search__tag-item blue';
            htmlTag.innerHTML = `${tag} <i class="fa-regular fa-circle-xmark close"></i>`;
            app.htmlTagContainer.appendChild(htmlTag);
            const closeTag = htmlTag.querySelector('.close');
            closeTag.addEventListener('click', () => {
                console.log('close')
            })
        } else {
            console.log("query is used")
            const filteredRecipes = searchIngredients(recipes, query);
            app.filteredRecipes = [...filteredRecipes];
            recipesContainer.innerHTML = "";
            console.log({filteredRecipes : filteredRecipes})
            app.displayRecipes(filteredRecipes)
            app.displayIngredients(filteredRecipes, query)
        }
    }


}
document.addEventListener('DOMContentLoaded', app.init)