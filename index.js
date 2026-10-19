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
  console.log("foods clicked")
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

  for (let id = 1; id < 5; id++) {
    var drinkTodisplay = drinksData.foods[id]
    console.log(drinkTodisplay.name)
    
  }

}