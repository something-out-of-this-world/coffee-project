"use strict";

var divbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeName = document.querySelector('#coffeeName');
var addBtn = document.querySelector('#create');
var addedCoffee = document.querySelector('#coffee-name-add');
var addedRoast = document.querySelector('#roast-addition');

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'}
];

function renderCoffee(coffee) {
    var html = '<div class="coffee mb-5">';
    html += '<div class="mr-5"><h3 class="d-inline">' + coffee.name  + '</h3>';
    html += '<p class="d-inline pl-2">' + coffee.roast + '</p></div>';
    html += '</div>';
    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i <= coffees.length -1; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var searchedCoffee = coffeeName.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast && (coffee.name === searchedCoffee || searchedCoffee === '')) {
            filteredCoffees.unshift(coffee);
        }
    });
    if(selectedRoast === 'all'){
        divbody.innerHTML = renderCoffees(coffees);
    }else {
        divbody.innerHTML = renderCoffees(filteredCoffees);
    }
}

function createCoffee(e) {
    e.preventDefault();
    coffees.push({
        id: coffees.length,
        name: addedCoffee.value,
        roast: addedRoast.value
    });

    divbody.innerHTML = renderCoffees(coffees);
}

function updateResult(query) {
    var resultList = document.querySelector("#coffees");
    resultList.innerHTML = "";
    var selectedRoast = roastSelection.value;
    //for each element in the new array its calling the function
    coffees.map(function(coffee){
        //taking the input of the function updateResult(), splitting it and making a new array
        //for each element in the array its calling the function
        query.split(" ").map(function (word) {
            if((coffee.name.indexOf(word) != -1) && (selectedRoast === coffee.roast || selectedRoast === 'all')){
                console.log(coffee.name);
                resultList.innerHTML += '<div class="col-4"><h3>' + coffee.name + '</h3><p>' + coffee.roast + '</p></div>';
            }
        })
    })
}

function swapStyleSheet(sheet) {
    document.getElementById("style1").setAttribute("href", sheet);
}
function updateBackground(){
    switch (roastSelection.value) {
        case 'light':
            swapStyleSheet("light.css");
            break;
        case 'medium':
            swapStyleSheet("medium.css");
            break;
        case 'dark':
            swapStyleSheet("dark.css");
            break;
        default:
            swapStyleSheet("style.css");
            break;
    }
}


divbody.innerHTML = renderCoffees(coffees);


roastSelection.addEventListener('change', updateBackground);
roastSelection.addEventListener('change', updateCoffees);
submitButton.addEventListener('click', updateCoffees);
addBtn.addEventListener('click', createCoffee);
