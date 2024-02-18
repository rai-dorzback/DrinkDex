// event listener
document.querySelector('button').addEventListener('click', getDrink)

// can also search by hitting enter key and it will automatically turn that into a button click and run the getDrink function
document.querySelector('input').addEventListener('keypress', function(event) {
    if (event.key == 'Enter') {
        document.querySelector('button').click();
    }
})

function getDrink(){
  let search = document.querySelector('input').value
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        const drinks = data.drinks[0];
        console.table(drinks);

        const drinkName = document.querySelector('.drink-name');        

        displayDrinkImage(drinks)

        drinkName.innerText = drinks.strDrink // place drink's name into DOM
        displayIngredients(drinks)
        displayInstructions(drinks)

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function displayDrinkImage(drinks) {
    const drinkImg = document.querySelector('#drink-img');
    drinkImg.src = drinks.strDrinkThumb // place image into DOM
    drinkImg.alt = drinks.strDrink // set alt for image ot name of drink
}

function displayIngredients(drinks) {
    const ingredientList=document.querySelector('.ingredient-list');
    ingredientList.textContent = '';

    // use a for loop and change the number ending of the property (strIngredient1 through strIngredient15). If the value is null, don't print it otherwise do
    for (let i = 1; i < 16; i++) {
        if (drinks[`strIngredient${i}`] !== null) {
            let li = document.createElement('li')
            
            // if the quantity of ingredient exists, add it to the text node, if not proceed as normal without quantity
            if (drinks[`strMeasure${i}`] !== null) {
                li.appendChild(document.createTextNode(`${drinks[`strIngredient${i}`]} (${drinks[`strMeasure${i}`].trim()})`))
            } else {
                // create a list item with the ingredient name
                li.appendChild(document.createTextNode(drinks[`strIngredient${i}`]))
            }
            // add item to ol
            ingredientList.appendChild(li)
        }
    }
}

function displayInstructions(drinks) {
    // place to put instructions
    const instructionsParagraph = document.querySelector('.instructions-p')

    instructionsParagraph.innerText = drinks.strInstructions
}