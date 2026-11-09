async function main () {
var foodsContainer = document.getElementById("foodsContainer")
var foodsButton = document.getElementById("foodsButton")
var drinksButton = document.getElementById("drinksButton")
var foodButton = document.getElementsByClassName("food")

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
  for (let id = 1; id <= Object.keys(foodsData.foods).length; id++) {
    var foodToDisplay = foodsData.foods[id]
    console.log(foodToDisplay.name)

    //paste element

    const foodElement = `
    <div class="food">
      <img src="${foodToDisplay.img}" alt="${foodToDisplay.name}" class="foodDisplayImage"/>
      <h3 class="foodName">${foodToDisplay.name}</h3>
      <p class="price">${foodToDisplay.price} px</p>
      <button class="removeButton" id="remove${foodToDisplay.name}Button">-</button>
      <p id="amount${foodToDisplay.name}">0</p>
      <button class="buyButton" id="buy${foodToDisplay.name}Button">+</button>
    </div>
`
//<p class="description">${foodToDisplay.description}</p>


    foodsContainer.insertAdjacentHTML("beforeend",foodElement)
    
    var addFoodToCartButton = document.getElementById(`buy${foodToDisplay.name}Button`)

    addFoodToCartButton.addEventListener("click", () => {
      addFoodToLocalStorage("food", foodToDisplay.id)
    })
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
      <div style="display: flex;">
        <button class="removeButton" id="remove${drinkTodisplay.name}Button">-</button>
        <p id="amount${drinkTodisplay.id}">0</p>
        <button 
  class="buyButton" 
  id="buy${drinkTodisplay.name}Button"
  onclick="addFoodToLocalStorage('drink', ${drinkTodisplay.id}, 1)"
>
  +
</button>
      </div>
    </div>
`
//<p class="description">${drinkTodisplay.description}</p>


    foodsContainer.insertAdjacentHTML("beforeend",drinkElementHtml)

  }

}

}

async function addFoodToLocalStorage(type, id, amount) {
  console.log(type, id, "A")

  var newAmount
  if (localStorage.getItem(id) !== null){
    var OldAmount = JSON.parse(localStorage.getItem(id)).amount
    newAmount = OldAmount + 1

  }
  else{
    newAmount = 1
  }
  
  displayAmount = document.getElementById("amount" + id)
  displayAmount.innerHTML = newAmount

  console.log("AA")

  var save = {type:type, id:id, amount:newAmount}
  var savStr = JSON.stringify(save)
  localStorage.setItem(id, savStr)

  console.log("SAVED")
}
main()