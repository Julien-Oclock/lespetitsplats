export default function recipeTemplate(data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;
    console.log(data)
    const ingredientArray = [...ingredients]
    return (
        `
            <div class="recipes__img"></div>
            <div class="recipes__content">
                <div class="recipes__content-header">
                    <h2 class="recipes__content-title">${name}</h2>
                    <p class="recipes__content-time">${time} min</p>
                </div>
                <div class="recipes__content-text">
                    <ul class="recipes__content-ingredients">
                    ${ingredientArray.map(ingredient => {
            return `<li class="recipes__content-ingredient"><span class="bold" >${ingredient.ingredient}</span> ${ingredient.quantity ? `: ${ingredient.quantity}` : ''} ${ingredient.unit ? ingredient.unit : ''}</li>`
        }).join("")}
                    </ul>
                    <p class="recipes__content-instructions">
                       ${description}
                    </p>
                </div>
            </div>
        `
    )
}



