// search recipes

const searchRecipes = (recipes, query = null) => {
    console.log({ 'recipes': recipes })
    if (query === null) {
        return recipes
    }
    if (query.length > 2) {
        const filterRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(query.toLowerCase()) ||
                recipe.ingredients.find((ingredients) =>
                    ingredients.ingredient.toLowerCase().includes(query.toLowerCase())) ||
                recipe.description.toLowerCase().includes(query.toLowerCase())
        })
        console.log({ 'filtered': filterRecipes })
        return filterRecipes
    } else {
        console.log({ 'end': recipes })
        return recipes
    }
}


// search ingredients
const searchIngredients = (recipes, query = null) => {
    console.log({ 'start': recipes })
    if (query === null) {
        return recipes
    }
    if (query.length > 2) {
        const filterRecipes = recipes.filter(recipe => {
            return recipe.ingredients.find((ingredients) =>
                ingredients.ingredient.toLowerCase().includes(query.toLowerCase()))
        })
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
        const filterRecipes = recipes.filter(recipe => {
            return recipe.appliance.toLowerCase().includes(query.toLowerCase())
        })
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
        const filterRecipes = recipes.filter(recipe => {
            return recipe.ustensils.find((ustensils) =>
                ustensils.toLowerCase().includes(query.toLowerCase()))
        })
        console.log({ 'filtered': filterRecipes })
        return filterRecipes
    } else {
        console.log({ 'end': recipes })
        return recipes
    }
}


export { searchRecipes, searchIngredients, searchDevices, searchUstensils }