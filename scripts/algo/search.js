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
        return recipes
    }
}


export default searchRecipes