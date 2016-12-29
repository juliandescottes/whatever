
let markup = `
  <div class="pizza table-header">
    <div class="category">Catégorie</div>
    <div class="name">Nom</div>
    <div class="ingredients">Ingrédients</div>
    <div class="price25">Prix (25cm)</div>
    <div class="price30">Prix (30cm)</div>
  </div>
`;

for (let pizza of window.pizzas) {
  markup += `
    <div class="pizza">
      <div class="category">${pizza.category}</div>
      <div class="name">${pizza.name}</div>
      <div class="ingredients">${pizza.ingredients.join(", ")}</div>
      <div class="price25">${pizza.price25}</div>
      <div class="price30">${pizza.price30}</div>
    </div>
  `;
}

document.getElementById("root").innerHTML = markup;