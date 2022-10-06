const searchRecipes = (recipes, query = null) => {
    let result = [];
    console.log(query)
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
        console.log({result : result})
        return result;
    } else {
        return recipes;
    }
    
}


// search ingredients
const searchIngredients = (recipes, query = null) => {
    console.log({ 'start': recipes })
    if (query === null) {
        return recipes
    }
    console.log(query)
    if (query.length > 2) {
        console.log('query is used in search function')
        const filterRecipes = []
        console.log('result')
        for (let recipe of recipes){
            for (let ingredient of recipe.ingredients){
                if (ingredient.ingredient.toLowerCase().includes(query.toLowerCase())) {
                    filterRecipes.push(recipe)
                }
            }
        }
        console.log({ 'filtered': filterRecipes })
        return filterRecipes
    } else {
        console.log({ 'end': recipes })
        return recipes
    }
}

const searchDevices = (recipes, query = null) => {
    console.log({ 'start': recipes })
    if (query === null) {
        return recipes
    }
    if (query.length > 2) {
        const filterRecipes = []
        for (let recipe of recipes){
            if (recipe.appliance.toLowerCase().includes(query.toLowerCase())) {
                filterRecipes.push(recipe)
            }
        }
        console.log({ 'filtered': filterRecipes })
        return filterRecipes
    } else {
        console.log({ 'end': recipes })
        return recipes
    }
}

const searchUstensils = (recipes, query = null) => {
    console.log({ 'start': recipes })
    if (query === null) {
        return recipes
    }
    if (query.length > 2) {
        const filterRecipes = []
        for (let recipe of recipes){
            for (let ustensil of recipe.ustensils){
                if (ustensil.toLowerCase().includes(query.toLowerCase())) {
                    filterRecipes.push(recipe)
                }
            }
        }
        console.log({ 'filtered': filterRecipes })
        return filterRecipes
    } else {
        console.log({ 'end': recipes })
        return recipes
    }
}


export { searchRecipes, searchIngredients, searchDevices, searchUstensils }