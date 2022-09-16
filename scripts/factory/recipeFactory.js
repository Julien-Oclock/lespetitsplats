import recipeTemplate from "../template/recipeTemplate.js";

export default function recipeFactory(data) {

  const HTMLcontent = recipeTemplate(data);

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("recipes");
    article.innerHTML = HTMLcontent;
    return (article);
  }
  return { getUserCardDOM }

}
