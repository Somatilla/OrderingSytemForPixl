async function main () {
var foodsContainer = document.getElementById("foodsContainer")
var foodsButton = document.getElementById("foodsButton")
var drinksButton = document.getElementById("drinksButton")
var foodButton = document.getElementsByClassName("food")
var foodNameHTML = document.getElementById("foodName")
var foodDescriptionHTML = document.getElementById("foodDescription")
var todaysSpecialImg = document.getElementById("todaysSpecialImg")

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

var drinksData = await getFoods("drinks.json")
var foodsData = await getFoods("foods.json")

foodsButton.addEventListener("click", foodButtonClicked)

//################################--TODAY'S SPECIAL--#####################################

var foodslength = Object.keys(foodsData.foods).length
var drinkslength = Object.keys(drinksData.drinks).length

console.log(foodNameHTML)

var foodOrDrink = Math.floor(Math.random() * 2) + 1
if(foodOrDrink == 1){
  var randomFoodNumber = Math.floor(Math.random() * foodslength) + 1
  var randomFood = foodsData["foods"]
  console.log("CCC" + JSON.stringify(randomFood[randomFoodNumber.name]))
  foodNameHTML.innerHTML = JSON.parse(JSON.stringify(randomFood[randomFoodNumber])).name
  foodDescriptionHTML.innerHTML = JSON.parse(JSON.stringify(randomFood[randomFoodNumber])).description
  todaysSpecialImg.src = JSON.parse(JSON.stringify(randomFood[randomFoodNumber])).img
}
else{
  var randomDrinkNumber = Math.floor(Math.random() * drinkslength) + 1
  var randomDrink = drinksData["drinks"]
  console.log("CCC" + JSON.stringify(randomDrink[randomDrinkNumber.name]))
  foodNameHTML.innerHTML = JSON.parse(JSON.stringify(randomDrink[randomDrinkNumber])).name
  foodDescriptionHTML.innerHTML = JSON.parse(JSON.stringify(randomDrink[randomDrinkNumber])).description
  console.log(todaysSpecialImg)
  todaysSpecialImg.src = JSON.parse(JSON.stringify(randomDrink[randomDrinkNumber])).img
}


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
      <div style="display: flex;">
        <button 
  class="removeButton" 
  id="remove${foodToDisplay.name}Button"
  onclick="removeFoodFromLocalStorage('food', ${foodToDisplay.id}, 1)"
>
  -
</button>
        <p id="amount${foodToDisplay.id}">0</p>
        <button 
  class="buyButton" 
  id="buy${foodToDisplay.name}Button"
  onclick="addFoodToLocalStorage('food', ${foodToDisplay.id}, 1)"
>
  +
</button>
      </div>
    </div>
`
    //<p class="description">${foodToDisplay.description}</p>

    foodsContainer.insertAdjacentHTML("beforeend",foodElement)
    displayAmount = document.getElementById("amount" + id)


    if (localStorage.getItem(foodToDisplay.id + "food") !== null){
      loadAmount = JSON.parse(localStorage.getItem(foodToDisplay.id + "food")).amount
    }
    else{
      loadAmount = 0
    }


    displayAmount.innerHTML = loadAmount
  }
}


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
        <button 
  class="removeButton" 
  id="remove${drinkTodisplay.name}Button"
  onclick="removeFoodFromLocalStorage('drink', ${drinkTodisplay.id}, 1)"
>
  -
</button>
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
    displayAmount = document.getElementById("amount" + id)


    if (localStorage.getItem(drinkTodisplay.id + "drink") !== null){

      loadAmount = JSON.parse(localStorage.getItem(drinkTodisplay.id + "drink")).amount
    }
    else{
      loadAmount = 0
    }


    displayAmount.innerHTML = loadAmount

  }

}

}

async function addFoodToLocalStorage(type, id, amount) {

  var newAmount
  if (localStorage.getItem(id + type) !== null){
    var OldAmount = JSON.parse(localStorage.getItem(id + type)).amount
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
  localStorage.setItem(id + type, savStr)

  console.log("SAVED")
}

async function removeFoodFromLocalStorage(type, id, amount) {

  var newAmount
  if (localStorage.getItem(id + type) !== null){
    var OldAmount = JSON.parse(localStorage.getItem(id + type)).amount
    newAmount = OldAmount - 1

  }
  else{
    newAmount = 0
  }

  if (newAmount < 0) {
    newAmount = 0
  }
  
  displayAmount = document.getElementById("amount" + id)
  displayAmount.innerHTML = newAmount

  console.log("AA")

  var save = {type:type, id:id, amount:newAmount}
  var savStr = JSON.stringify(save)
  localStorage.setItem(id + type, savStr)

  console.log("SAVED")
}

main()