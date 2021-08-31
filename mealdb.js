// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

document.getElementById('error-message').style.display='none';

const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    if(searchField==0){
        alert('please write a food name');
    }
    // console.log(searchText);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data =>displayMeal(data.meals));
}

const displayMeal = meals =>
{
   const searchResult = document.getElementById('search-result');
   searchResult.textContent = '';
   meals.forEach(meal=>{
       const div = document.createElement('div');
       div.classList.add('col');
       div.innerHTML = `
       <div onClick = "loadMealDetails(${meal.idMeal})" class="card h-100">
         <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">${meal.strMeal}</h5>
         <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
       </div>
     </div>
       `;
       searchResult.appendChild(div);

   })
};

const loadMealDetails =async mealId =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
   try{
    const res =await fetch(url)
    const data = await res.json();
    displayMealDetails(data.meals[0]);
   }
   catch(error){
    document.getElementById('error-message').style.display='block';
   }
}

const displayMealDetails = meal =>{
    const mealDetail = document.getElementById('meal-detail');
    mealDetail.textContent='';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML =`
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
              <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
            </div>
    `;
    mealDetail.appendChild(div);

}