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
        app.devicesSearchInput.addEventListener('input', app.deviceSearch);
        app.ustensilsSearchInput.addEventListener('input', app.ustensilsSearch);
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

    getIgredients: async function (recipes, query) {
        let ingredients = [];

        if (query === null) {
            for (let recipe of recipes) {
                recipe.ingredients.forEach(ingredient => {
                    ingredients.push(ingredient.ingredient)
                })
            };
            app.ingredients = new Set(ingredients)
        } else {
            if (query.length > 2) {
                for (let recipe of recipes) {
                    for (let ingredient of recipe.ingredients) {
                        if (ingredient.ingredient.toLowerCase().includes(query.toLowerCase())) {
                            ingredients.push(ingredient.ingredient)
                        }
                    }
                };
                app.ingredients = new Set(ingredients)
            }
        }
    },

    getDevices: async function (recipes) {
        let devices = [];
        recipes.forEach(recipe => {
            devices.push(recipe.appliance)
        });
        app.devices = new Set(devices)
    },

    getUstensils: async function (recipes) {
        let ustensils = [];
        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                ustensils.push(ustensil)
            })
        });
        app.ustensils = new Set(ustensils)
    },

    displayIngredients: async function (recipes, query = null) {
        app.getIgredients(recipes, query)
        const ingredientsContainer = document.querySelector(".results-ingredients");
        ingredientsContainer.innerHTML = "";
        const ingredientList = document.createElement("ul");
        ingredientList.classList.add("results-ingredients-list");
        ingredientList.classList.add("blue");
        ingredientsContainer.appendChild(ingredientList);
        for (let ingredient of app.ingredients) {
            const ingredientItem = document.createElement("li");
            ingredientItem.classList.add("results-ingredients-list-item");
            ingredientItem.classList.add("blue");
            ingredientItem.innerHTML = ingredient;
            ingredientList.appendChild(ingredientItem);
            ingredientItem.addEventListener('click', (e) => {
                app.ingredientsSearch(e, ingredient)
            })
        }
    },

    displayDevices: async function (recipes) {
        app.getDevices(recipes)
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
            deviceItem.addEventListener('click', (e) => {
                app.deviceSearch(e, device)
            })
        }
    },

    displayUstensils: async function (recipes) {
        app.getUstensils(recipes)
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
            ustensilItem.addEventListener('click', (e) => {
                app.ustensilsSearch(e, ustensil)
            })
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
        const query = e.target.value ? e.target.value.toLowerCase() : '';
        const recipesContainer = document.querySelector(".result");
        let recipes = [...app.recipes];


        if (recipes.length !== app.filteredRecipes.length) {
            recipes = [...app.filteredRecipes];
        } else {
            recipes = [...app.recipes];
        }
        if (tag !== null) {
            const filteredRecipes = searchIngredients(recipes, tag);
            recipesContainer.innerHTML = "";
            app.displayRecipes(filteredRecipes)
            app.displayIngredients(filteredRecipes, tag)
            const htmlTag = document.createElement('div');
            htmlTag.className = 'search__tag-item blue';
            htmlTag.innerHTML = `${tag} <i class="fa-regular fa-circle-xmark close"></i>`;
            app.htmlTagContainer.appendChild(htmlTag);
            const closeTag = htmlTag.querySelector('.close');
            closeTag.addEventListener('click', () => {
                htmlTag.remove();
                app.displayRecipes(recipes)
            })
        } else {
            if (query.length > 2) {
                let filteredRecipes = []
                if (app.filteredRecipes.length > 0) {
                    filteredRecipes = searchIngredients(recipes, query);
                } else {
                    filteredRecipes = searchIngredients(app.recipes, query);
                }
                app.filteredRecipes = [...filteredRecipes];
                recipesContainer.innerHTML = "";
                app.displayRecipes(filteredRecipes)
                app.displayIngredients(filteredRecipes, query)
            }
            else {
                recipesContainer.innerHTML = "";
                app.displayRecipes(app.recipes)
            }

        }
    },

    deviceSearch: async function (e, tag = null) {
        console.log('début de la recherche')
        const query = e.target.value ? e.target.value.toLowerCase() : '';
        const recipesContainer = document.querySelector(".result");
        let recipes = [...app.recipes];
        if (recipes.length !== app.filteredRecipes.length) {
            recipes = [...app.filteredRecipes];
        } else {
            recipes = [...app.recipes];
        }
        if (tag !== null) {
            const filteredRecipes = searchDevices(recipes, tag);
            app.filteredRecipes = [...filteredRecipes];
            recipesContainer.innerHTML = "";
            app.displayRecipes(filteredRecipes)
            app.displayDevices(filteredRecipes, tag)

            const htmlTag = document.createElement('div');
            htmlTag.className = 'search__tag-item green';
            htmlTag.innerHTML = `${tag} <i class="fa-regular fa-circle-xmark close"></i>`;
            app.htmlTagContainer.appendChild(htmlTag);
            const closeTag = htmlTag.querySelector('.close');
            closeTag.addEventListener('click', () => {
                htmlTag.remove();
                app.displayRecipes(recipes)
            })
        } else {
            if (query.length > 2) {
                console.log({ query: query })
                console.log(recipes)
                let filteredRecipes = []
                if (app.filteredRecipes.length > 0) {
                    filteredRecipes = searchDevices(recipes, query);
                } else {
                    filteredRecipes = searchDevices(app.recipes, query);
                }
                app.filteredRecipes = [...filteredRecipes];
                console.log(filteredRecipes)
                recipesContainer.innerHTML = "";
                app.displayRecipes(filteredRecipes)
                app.displayDevices(filteredRecipes, query)
            }
            else {
                recipesContainer.innerHTML = "";
                app.displayDevices(app.recipes)
                app.displayRecipes(app.recipes)
                app.filteredRecipes = [...app.recipes];
            }
        }
    },

    ustensilsSearch: async function (e, tag = null) {
        const query = e.target.value ? e.target.value.toLowerCase() : '';
        const recipesContainer = document.querySelector(".result");
        let recipes = [...app.recipes];
        if (recipes.length !== app.filteredRecipes.length) {
            recipes = [...app.filteredRecipes];
        } else {
            recipes = [...app.recipes];
        }
        if (tag !== null) {
            const filteredRecipes = searchUstensils(recipes, tag);
            app.filteredRecipes = [...filteredRecipes];
            recipesContainer.innerHTML = "";
            app.displayRecipes(filteredRecipes)
            app.displayUstensils(filteredRecipes, tag)

            const htmlTag = document.createElement('div');
            htmlTag.className = 'search__tag-item red';
            htmlTag.innerHTML = `${tag} <i class="fa-regular fa-circle-xmark close"></i>`;
            app.htmlTagContainer.appendChild(htmlTag);
            const closeTag = htmlTag.querySelector('.close');
            closeTag.addEventListener('click', () => {
                htmlTag.remove();
                app.displayRecipes(recipes)
            })
        } else {
            if (query.length > 2) {
                const filteredRecipes = searchUstensils(recipes, query);
                app.filteredRecipes = [...filteredRecipes];
                recipesContainer.innerHTML = "";
                app.displayRecipes(filteredRecipes)
                app.displayUstensils(filteredRecipes, query)
            }
            else {
                recipesContainer.innerHTML = "";
                app.displayRecipes(recipes)
                app.displayUstensils(recipes)
            }
        }
    }



}
document.addEventListener('DOMContentLoaded', app.init)