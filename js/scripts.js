const submitButton = document.getElementById("submit-button");

submitButton.addEventListener('click', () => {
    fetchMenuItems();
});

// get menu items list from api
const fetchMenuItems = () => {
    async function getMenuItems() {
        const searchText = document.getElementById("search-text").value;

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
        const data = await response.json();
        return data.meals;
      }
      getMenuItems().then(menuItems => {
          if(menuItems == null){
            displayErrors("No Data Found!");
            return;
          }
        displayMenus(menuItems);
      }).catch((error) => {        
        displayErrors("API Fetch Error! Kindly submit again.");
      });;
}

// display menu items list
const displayMenus = menuItems => {
    const menuContainer = document.getElementById("menu-container");
    const errorContainer = document.getElementById("error-container");
    errorContainer.style.display = "none";
    document.getElementById("menu-item-container").style.display = "none";
    menuItems.forEach( menu => {
        const menuDiv = document.createElement('div');
        menuDiv.className = "col-md-3 my-2";
        const menuText = `
            <div class="card h-100" onclick="displayMenu(${menu.idMeal})">
                <img src="${menu.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-footer">
                <small class="text-muted">${menu.strMeal}</small>
                </div>
            </div>
        `;

        menuDiv.innerHTML = menuText;
        menuContainer.appendChild(menuDiv);
    });
}


// get single menu
const displayMenu = (menuId) => {
    async function getMenuItems() {
console.log(menuId);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${menuId}`);
        const data = await response.json();
        return data.meals;
      }
      getMenuItems().then(menu => {
        if(menu == null){
            displayErrors("No Data Found!");
            return;
        }
        displayMenuDetails(menu[0]);
      }).catch((error) => {
        displayErrors("API Fetch Error! Kindly submit again.");
      });;
}

// display menu items list
const displayMenuDetails = menuItem => {

    const errorContainer = document.getElementById("error-container");
    errorContainer.style.display = "none";

    document.getElementById("menu-item-image").src = `${menuItem.strMealThumb}`;
    const menuItemTitle = document.getElementById("menu-item-title").innerText = `${menuItem.strMeal}`;
    const menuItemIngredients = document.getElementById("menu-item-ingredients");
    menuItemIngredients.innerHTML = "";

    Object.keys(menuItem).map( (item) => {
        if(item.startsWith('strIngredient') && menuItem[item] != null && menuItem[item] != ""){
            let li = document.createElement("li");
            li.innerText = menuItem[item];
            menuItemIngredients.appendChild(li);
        }
    });

    document.getElementById("menu-item-container").style.display = "block";

}

// display error if no data is available
const displayErrors = error => {
    const menuContainer = document.getElementById("menu-container");
    const menuDiv = document.createElement('div');
    menuDiv.className = "col-md-6 m-auto";
    menuDiv.id = "error-container";
    const menuText = `
        <div class="alert alert-danger" role="alert">
            ${error}
        </div>
    `;

    menuDiv.innerHTML = menuText;
    menuContainer.appendChild(menuDiv);  
}