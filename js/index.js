$(document).ready(function() {
  var imageInterval = $( window ).width();
  var people = [
    new Person("Bill", 100, 300, 20, 0),
    new Person("Bob", 300, 100, 30, 1),
    new Person("Jack", 400, 250, 40, 2),
    new Person("Jill", 240, 3000, 50, 3)
  ]
  var game = new Game(people);
  const TOTALMILES = 1893;

  var currentCity;
  var currentCityIndex;
  var mileage; //will be on instance of car
  var distanceRemaining = TOTALMILES;

  var selectedCharacters = [];

  function setCityName(name) {
    $('#currentCityName').text(name);
  }
  function setMilesTravelled(num) {
    $('#milesTravelledNum').text(Math.floor(num));
  }
  function setMilesToGo(num) {
    $('#milesToGoNum').text(Math.floor(num));
  }
  function setMilesToNext(num) {
    $('#milesToNextNum').text(Math.floor(num));
  }
  function setCoolPoints(num) {
    $('#coolPointsNum').text(Math.floor(num));
  }
  function setMoney(num) {
    $('#moneyLeftNum').text(Math.floor(num));
  }
  function setGas(num) {
    $('#gasRemainingNum').text(Math.floor(num*10)/10);
  }
  function getEvent() {
    return game.eventsManger.getRandomEvent();
  }

  function countdownMilage(){
    var milesInTurn = 0;
    setRollingImage();
    leftCity();
    $('#goWest').hide();
    var timeInterval = setInterval(function(){
      var nextCityDist = cities[game.currentCityIndex + 1].distanceRemaining;
      distanceRemaining--;
      milesInTurn++;
      setMilesToGo(distanceRemaining);
      setMilesToNext(distanceRemaining - nextCityDist + 1);
      setMilesTravelled(TOTALMILES - distanceRemaining);
      game.getCar().travel(1);
      updateStats();

      if (distanceRemaining < nextCityDist){ //arrived at city
        $('#goWest').show();
        atCity();
        clearInterval(timeInterval)
        goWest();
      }
      if (milesInTurn > 49){
        $('#goWest').show();
        clearInterval(timeInterval);
        stopScrollingBackground();
      }
    }, 50)
    var event = game.eventsManager.getRandomEvent();
    game.updateStatesEvent(event);
    game.starvePeople();
  }

  function initGame(){
    $('#nextCity').text(cities[game.currentCityIndex+1].name);
    setCityImage(cities[game.currentCityIndex])
    setMilesToGo(TOTALMILES);
    setMilesTravelled(0);
  }

  function atCity() {
    $('#buyGas').show();
    $('#getFood').show();
    $('#currentCity').show();
    console.log(cities[game.currentCityIndex+1].name);
    $('#nextCity').text(cities[game.currentCityIndex+2].name);
    setTimeout(function(){
      setCityImage(cities[game.currentCityIndex])
    }, 1000)
  }
  function leftCity() {
    $('#buyGas').hide();
    $('#getFood').hide();
    $('#currentCity').text("On the road again!");
    $('#milesToNext').show();
  }

  function updateStats() {
    var mileage = game.getCar().mileage;
    var cityName = game.currentCity.name;
    setCityName(cityName);
    setCoolPoints(game.cool);
    setMoney(game.wealth);
    setGas(game.getCar().currentTank);
  }

  function goWest() {
    var event = game.goWest();
    updateStats();
    stopScrollingBackground();
  }
  
  function setCityImage(city){
    stopScrollingBackground();
    $('#backgroundImage').hide();
    $('#cityImage').attr("src", city.img);
    $('#cityImage').fadeIn(1000, null);
  }

  function setRollingImage(){
    startScrollingBackground();
    $('#cityImage').hide();
    $('#backgroundImage').fadeIn(1000, null);
  }

  updateStats();
  $('#cityImage').hide();
  $('#restaurantOptions').hide();
  $('#buyingGasInfo').hide();
  // $('#gasOptionsContainer').hide();

  //buttons
  $('#goWest').on('click', countdownMilage);
  $('#getFood').on('click', getFood);
  $('#buyGas').on('click', buyGas);
  $('#forgetIt').on('click', forgetIt);
  initGame();

  function getFood(){
    $('#actions').hide();
    $('#restaurantOptions').show();
    game.restaurants.getRandomRestaurants().forEach(function(restaurant){
      $("<div />")
        .html(restaurant.name)
        .addClass('action')
        .appendTo("#restaurantOptionsContainer")
        .on('click', function(){
          game.selectRestaurant(restaurant);
          setMoney(game.wealth);
          setCoolPoints(game.cool);
          $('#restaurantOptionsContainer').empty();
          $('#restaurantOptions').hide();
          $('#actions').show();
        });
    })
  }
  function buyGas() {
    $('#actions').hide();
    var gasStats = game.getGasStats();
    var costPerGallonRounded = Math.round(gasStats.costPerGallon * 100) / 100;
    var amountToFillRounded = Math.round(gasStats.amountToFill * 100) / 100;
    var totalCostRounded = Math.round(gasStats.totalCost * 100) / 100;
    $('#buyingGasInfo').show();
    $('#gasPrice').text(costPerGallonRounded);
    $('#gasTotalGallons').text(amountToFillRounded);
    $('#gasTotalCost').text(totalCostRounded);
    $('#payNow').on('click', function(){
      game.refuelCar(gasStats.totalCost);
      $('#buyingGasInfo').hide();
      $('#actions').show();
      $('gasOptionsContainer').empty();
      $('#moneyLeftNum').text(Math.round(game.wealth * 100) / 100);
    });
  }
  function forgetIt() {
    $('#buyingGasInfo').hide();
    $('#actions').show();
  }

  var scrollBackground;

  function stopScrollingBackground(){
    clearInterval(scrollBackground);
  }

  function setupCharacterScreen(){
    game.characterManager.characters.forEach(function(character){
      $("<div/>")
      .append(`
        <span>${character.name}</span>
        <span>${character.money}</span>
        <span>${character.cool}</span>
        <span>${character.hungerRate}</span>
      `)
      .addClass('action')
      .addClass('characterSelectionIndividual')
      .appendTo("#characterSelectionContainer")
      .on('click', function(){
        if(!selectedCharacters.includes(character)){
          selectedCharacters.push(character);
          $(this).addClass('characterSelected')
        }else{
          selectedCharacters = selectedCharacters.filter(e => e !== character)
          $(this).removeClass('characterSelected')
        }
      });
    });
  };

  $('#acceptCharacters').on('click', function(){
    game.people = selectedCharacters;
    $('#characterSelection').hide();
  })

  $('#whateverCharacters').on('click', function(){
    console.log('whateverCharacters')
  })

  setupCharacterScreen();

  function startScrollingBackground(){
    scrollBackground = setInterval(function(){
      imageInterval+=1.6;
      $('#backgroundImage').css('background-position', imageInterval + 'px 0');
    }, 20);
  }


});
