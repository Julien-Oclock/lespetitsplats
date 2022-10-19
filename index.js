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
        app.ingredientsSearchInput.addEventListener('input', app.searchIngredients);
        app.devicesSearchInput.addEventListener('input', app.searchDevices);
        app.ustensilsSearchInput.addEventListener('input', app.searchUstensils);

        
    },

    recipes: [],
    filteredRecipes : [],
    ingredients: [],
    devices: [],
    ustensils: [],
    globalSearchInput: document.querySelector(".search__recipes-input"),
    ingredientsSearchInput: document.querySelector(".ingredients"),
    devicesSearchInput: document.querySelector(".devices"),
    ustensilsSearchInput: document.querySelector(".kitchenware"),
    htmlTagContainer: document.querySelector('.search__tag'),
    body : document.querySelector('body'),



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
        recipes.forEach(recipe => {
            const recipeFactoryInstance = recipeFactory(recipe);
            recipesContainer.appendChild(recipeFactoryInstance.getUserCardDOM());
        });
        app.filteredRecipes = recipes;
        app.displayIngredients(recipes)
        app.displayDevices(recipes)
        app.displayUstensils(recipes)
    },

    getIngredients: async function (recipes, query) {
        let ingredients = [];
        if (query === null) {
            recipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    ingredients.push(ingredient.ingredient)
                })
            });
            app.ingredients = new Set(ingredients)

        } else {
            if (query.length > 2) {
                recipes.forEach(recipe => {
                    recipe.ingredients.forEach(ingredient => {
                        if (ingredient.ingredient.toLowerCase().includes(query.toLowerCase())) {
                            ingredients.push(ingredient.ingredient)
                        }
                    })
                });
                app.ingredients = new Set(ingredients)
            }
        }

    },

    getDevices: async function (recipes, query) {
        let devices = [];
        if (query === null) {
            recipes.forEach(recipe => {
                devices.push(recipe.appliance)
            });
            app.devices = new Set(devices)

        } else {
            if (query.length > 2) {
                recipes.forEach(recipe => {
                    if (recipe.appliance.toLowerCase().includes(query.toLowerCase())) {
                        devices.push(recipe.appliance)
                    }
                });
                app.devices = new Set(devices)
            }
        }
    },

    getUstensils: async function (recipes, query) {
        let ustensils = [];
        if (query === null) {
            recipes.forEach(recipe => {
                recipe.ustensils.forEach(ustensil => {
                    ustensils.push(ustensil)
                })
            });
            app.ustensils = new Set(ustensils)

        } else {
            if (query.length > 2) {
                recipes.forEach(recipe => {
                    recipe.ustensils.forEach(ustensil => {
                        if (ustensil.toLowerCase().includes(query.toLowerCase())) {
                            console.log(ustensil)
                            ustensils.push(ustensil)
                        }
                    })
                });
                app.ustensils = new Set(ustensils)
            }
        }

    },

    displayIngredients: async function (recipes, query = null) {
        app.getIngredients(recipes, query);
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
            ingredientItem.addEventListener('click', (e) => {
                app.searchIngredients(e, ingredient)
                //close ingredient list
                const ingredientList = document.querySelector(".results-ingredients-list");
                ingredientList.classList.add("hidden");
            })
        })
    },

    displayDevices: async function (recipes, query = null) {
        app.getDevices(recipes, query)
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
            deviceItem.addEventListener('click', (e) => {
                app.searchDevices(e, device)
                const deviceList = document.querySelector(".results-devices-list");
                deviceList.classList.add("hidden");
            })
        })
    },

    displayUstensils: async function (recipes, query = null) {
        app.getUstensils(recipes, query)
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
            ustensilItem.addEventListener('click', (e) => {
                app.searchUstensils(e, ustensil)
                const ustensilList = document.querySelector(".results-kitchenware-list");
                ustensilList.classList.add("hidden");
            })
        })
    },

    globalSearch: async function (e) {
        const recipesContainer = document.querySelector(".result");
        const query = e.target.value;
        const filteredRecipes = searchRecipes(app.recipes, query);
        recipesContainer.innerHTML = "";
        app.displayRecipes(filteredRecipes)
        app.filteredRecipes = [...filteredRecipes];
    },

    searchIngredients: async function (e, tag = null) {
        const query = e.target.value;
        const recipesContainer = document.querySelector(".result");
        let recipes = [...app.recipes];

        if (recipes.length !== app.filteredRecipes.length) {
            recipes = [...app.filteredRecipes];
        } else {
            recipes = [...app.recipes];
        }

        if (tag !== null) {
            const filteredRecipes = searchRecipes(recipes, tag);
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
                htmlTag.remove();
                app.displayRecipes(recipes)
            })
        } else {
            const filteredRecipes = searchIngredients(app.recipes, query.toLowerCase());
            recipesContainer.innerHTML = "";
            app.filteredRecipes = [...filteredRecipes];
            app.displayRecipes(filteredRecipes)
            app.displayIngredients(filteredRecipes, query.toLowerCase())
        }

    },

    searchDevices: async function (e, tag = null) {
        const query = e.target.value;
        const recipesContainer = document.querySelector(".result");

        let recipes = [...app.recipes];

        if (recipes.length !== app.filteredRecipes.length) {
            recipes = [...app.filteredRecipes];
        } else {
            recipes = [...app.recipes];
        }

        if (tag !== null) {
            app.displayDevices(tag);
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
            const filteredRecipes = searchDevices(recipes, query);
            app.filteredRecipes = [...filteredRecipes];
            recipesContainer.innerHTML = "";
            app.displayRecipes(filteredRecipes)
            app.displayDevices(filteredRecipes, query)
        }

    },

    searchUstensils: async function (e, tag = null) {
        const query = e.target.value;
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
                app.displayUstensils()
                app.displayRecipes(recipes)
            })

        } else {
            const filteredRecipes = searchUstensils(recipes, query);
            app.filteredRecipes = [...filteredRecipes];
            recipesContainer.innerHTML = "";
            app.displayRecipes(filteredRecipes)
            app.displayUstensils(filteredRecipes, query)
        }

    }


}
document.addEventListener('DOMContentLoaded', app.init)