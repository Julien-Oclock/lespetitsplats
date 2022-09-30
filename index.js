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
            app.displayRecipes();
            app.toggleCLass();
            app.displayIngredients()
            app.displayDevices()
            app.displayUstensils()
        }, 50)
        app.globalSearchInput.addEventListener('input', app.globalSearch);
        app.ingredientsSearchInput.addEventListener('input', app.searchIngredients);
        app.devicesSearchInput.addEventListener('input', app.searchDevices);
        app.ustensilsSearchInput.addEventListener('input', app.searchUstensils);
    },

    recipes: [],
    ingredients: [],
    devices: [],
    ustensils: [],
    globalSearchInput: document.querySelector(".search__recipes-input"),
    ingredientsSearchInput: document.querySelector(".ingredients"),
    devicesSearchInput: document.querySelector(".devices"),
    ustensilsSearchInput: document.querySelector(".kitchenware"),


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

    getIngredients: async function (query = null) {
        let ingredients = [];
        if (query === null) {
            app.recipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    ingredients.push(ingredient.ingredient)
                })
            });
            app.ingredients = new Set(ingredients)
            console.log({ 'no query': app.ingredients })

        } else {
            app.recipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    if (ingredient.ingredient.toLowerCase().includes(query.toLowerCase())) {
                        ingredients.push(ingredient.ingredient)
                    }
                })
            });
            app.ingredients = new Set(ingredients)
            console.log({ 'query': app.ingredients })
        }

    },

    getDevices: async function (query) {
        let devices = [];
        if (query === null) {
            app.recipes.forEach(recipe => {
                devices.push(recipe.appliance)
            });
            app.devices = new Set(devices)
            console.log({ 'no query': app.devices })

        } else {
            app.recipes.forEach(recipe => {
                if (recipe.appliance.toLowerCase().includes(query.toLowerCase())) {
                    devices.push(recipe.appliance)
                }
            });
            app.devices = new Set(devices)
            console.log({ 'query': app.devices })
        }

    },

    getUstensils: async function (query) {
        let ustensils = [];
        if (query === null) {
            app.recipes.forEach(recipe => {
                recipe.ustensils.forEach(ustensil => {
                    ustensils.push(ustensil)
                })
            });
            app.ustensils = new Set(ustensils)
            console.log({ 'no query': app.ustensils })

        } else {
            app.recipes.forEach(recipe => {
                recipe.ustensils.forEach(ustensil => {
                    console.log(ustensil)
                    if (ustensil.toLowerCase().includes(query.toLowerCase())) {
                        ustensils.push(ustensil)
                    }
                })
            });
            app.ustensils = new Set(ustensils)
            console.log({ 'query': app.ustensils })
        }

    },

    displayIngredients: async function (query = null) {
        app.getIngredients(query);
        const ingredientsContainer = document.querySelector(".results-ingredients");
        ingredientsContainer.innerHTML = "";
        const ingredientList = document.createElement("ul");
        ingredientList.classList.add("results-ingredients-list");
        ingredientList.classList.add("blue");
        ingredientsContainer.appendChild(ingredientList);
        app.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement("li");
            ingredientItem.classList.add("results-ingredients-item");
            ingredientItem.innerHTML = ingredient;
            ingredientList.appendChild(ingredientItem);
            ingredientItem.addEventListener('click', () => {
                console.log(ingredient)
            })
        })
    },

    displayDevices: async function (query = null) {
        app.getDevices(query)
        const devicesContainer = document.querySelector(".results-devices");
        devicesContainer.innerHTML = "";
        const devicesList = document.createElement("ul");
        devicesList.classList.add("results-devices-list");
        devicesList.classList.add("green");
        devicesContainer.appendChild(devicesList);
        app.devices.forEach(device => {
            const deviceItem = document.createElement("li");
            deviceItem.classList.add("results-devices-item");
            deviceItem.innerHTML = device;
            devicesList.appendChild(deviceItem);
            deviceItem.addEventListener('click', () => {
                console.log(device)
            })
        })
    },

    displayUstensils: async function (query = null) {
        app.getUstensils(query)
        const ustensilsContainer = document.querySelector(".results-kitchenware");
        ustensilsContainer.innerHTML = "";
        const ustensilsList = document.createElement("ul");
        ustensilsList.classList.add("results-kitchenware-list");
        ustensilsList.classList.add("red");
        ustensilsContainer.appendChild(ustensilsList);
        app.ustensils.forEach(ustensil => {
            const ustensilItem = document.createElement("li");
            ustensilItem.classList.add("results-kitchenware-item");
            ustensilItem.innerHTML = ustensil;
            ustensilsList.appendChild(ustensilItem);
            ustensilItem.addEventListener('click', () => {
                console.log(ustensil)
            })
        })
    },

    globalSearch: async function (e) {
        app.displayRecipes(app.recipes)
        console.log(e.target.value)
        const recipesContainer = document.querySelector(".result");
        const query = e.target.value;
        const filteredRecipes = searchRecipes(app.recipes, query);
        recipesContainer.innerHTML = "";
        filteredRecipes.forEach(recipe => {
            const recipeFactoryInstance = recipeFactory(recipe);
            recipesContainer.appendChild(recipeFactoryInstance.getUserCardDOM());
        })
    },

    searchIngredients: async function (e) {
        app.displayRecipes(app.recipes)
        const query = e.target.value;
        const recipesContainer = document.querySelector(".result");
        const filteredRecipes = searchIngredients(app.recipes, query);
        //console.log(filteredRecipes)
        recipesContainer.innerHTML = "";

        filteredRecipes.forEach(recipe => {
            const recipeFactoryInstance = recipeFactory(recipe);
            recipesContainer.appendChild(recipeFactoryInstance.getUserCardDOM());
        })
        app.displayIngredients(query)
    },

    searchDevices: async function (e) {
        app.displayRecipes(app.recipes)
        const query = e.target.value;
        const recipesContainer = document.querySelector(".result");
        const filteredRecipes = searchDevices(app.recipes, query);
        //console.log(filteredRecipes)
        recipesContainer.innerHTML = "";

        filteredRecipes.forEach(recipe => {
            const recipeFactoryInstance = recipeFactory(recipe);
            recipesContainer.appendChild(recipeFactoryInstance.getUserCardDOM());
        })
        app.displayDevices(query)
    },

    searchUstensils: async function (e) {
        app.displayRecipes(app.recipes)
        const query = e.target.value;
        const recipesContainer = document.querySelector(".result");
        const filteredRecipes = searchUstensils(app.recipes, query);
        //console.log(filteredRecipes)
        recipesContainer.innerHTML = "";

        filteredRecipes.forEach(recipe => {
            const recipeFactoryInstance = recipeFactory(recipe);
            recipesContainer.appendChild(recipeFactoryInstance.getUserCardDOM());
        })
        app.displayUstensils(query)
    }


}
document.addEventListener('DOMContentLoaded', app.init)