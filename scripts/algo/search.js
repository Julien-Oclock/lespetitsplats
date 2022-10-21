const searchRecipes = (recipes, query = null) => {
    if (query === null) {
        return recipes
    }
    let result = [];
    if (query.length > 2) {
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            let name = recipe.name;
            let description = recipe.description;
            let ingredients = recipe.ingredients;
            if (name.toLowerCase().includes(query.toLowerCase()) || description.toLowerCase().includes(query.toLowerCase())) {
                result.push(recipe);
            } else {
                for (let j = 0; j < ingredients.length; j++) {
                    let ingredient = ingredients[j].ingredient;
                    if (ingredient.toLowerCase().includes(query.toLowerCase())) {
                        result.push(recipe);
                    }
                }
            }
        }
        return result;
    } else {
        return recipes;
    }

}


// search ingredients
const searchIngredients = (recipes, query = null) => {
    if (query === null) {
        return recipes
    }
    if (query.length > 2) {
        const filterRecipes = []
        for (let recipe of recipes) {
            for (let ingredient of recipe.ingredients) {
                if (ingredient.ingredient.toLowerCase().includes(query.toLowerCase())) {
                    filterRecipes.push(recipe)
                }
            }
        }
        return filterRecipes
    } else {
        return recipes
    }
}

const searchDevices = (recipes, query = null) => {
    if (query === null) {
        return recipes
    }
    if (query.length > 2) {
        const filterRecipes = []
        for (let recipe of recipes) {
            if (recipe.appliance.toLowerCase().includes(query.toLowerCase())) {
                filterRecipes.push(recipe)
                console.log(filterRecipes)
            }
        }
        return filterRecipes
    } else {
        return recipes
    }
}

const searchUstensils = (recipes, query = null) => {
    if (query === null) {
        return recipes
    }
    if (query.length > 2) {
        const filterRecipes = []
        for (let recipe of recipes) {
            for (let ustensil of recipe.ustensils) {
                if (ustensil.toLowerCase().includes(query.toLowerCase())) {
                    filterRecipes.push(recipe)
                }
            }
        }
        return filterRecipes
    } else {
        return recipes
    }
}


export { searchRecipes, searchIngredients, searchDevices, searchUstensils }