var foodsContainer = document.getElementById("foodsContainer")
var foodsButton = document.getElementById("foodsButton")
var drinksButton = document.getElementById("drinksButton")

async function getFoods(file) {
  try {
    console.log("Getting ", file)
    const response = await fetch(file)
    const foods = await response.json()
    console.log(foods)
    return foods
  } catch (error) {
    console.error("Json not working.", error)
  }
}

var foodsData = await getFoods("foods.json")

foodsButton.addEventListener("click", foodButtonClicked)

function foodButtonClicked() {
  console.log("foods clicked", "aaa")
  foodsContainer.innerHTML = ""

  for (let id = 1; id < 5; id++) {
    var foodTodisplay = foodsData.foods[id]
    console.log(foodTodisplay.name)
    
  }

}

var drinksData = await getFoods("drinks.json")
drinksButton.addEventListener("click", drinkButtonClicked)


function drinkButtonClicked() {
  console.log("drinks clicked")
  foodsContainer.innerHTML = ""

  for (let id = 1; id <= Object.keys(drinksData.drinks).length; id++) {
    var drinkTodisplay = drinksData.drinks[id]
    console.log(drinkTodisplay.name)

    //paste element

    const drinkElementHtml = `
  <div class="food">
    <img src="${drinkTodisplay.img}" alt="${drinkTodisplay.name}" class="foodDisplayImage"/>
    <h3 class="foodName">${drinkTodisplay.name}</h3>
    <p class="price">${drinkTodisplay.price} px</p>
  </div>
`
//<p class="description">${drinkTodisplay.description}</p>


    foodsContainer.insertAdjacentHTML("beforeend",drinkElementHtml)
    
  }

}