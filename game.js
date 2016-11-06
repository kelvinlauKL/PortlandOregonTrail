class Game {
	constructor() {
    this.TOTALMILES = 1893;
		this.car = new Car()
		this.cool = 100.0
		this.wealth = 1000.0
		this.restaurants = new RestaurantManager()
		this.people = []
		this.characterManager = new CharacterManager()
    this.currentCityIndex = 0;
    this.currentCity = cities[this.currentCityIndex];
		this.eventsManager = new EventsManager()
    this.restaurantManager = new RestaurantManager()
    this.atCity = true;
	}

  changeCool(num) {
    this.cool += num;
  }

  changeMoney(num) {
    this.wealth += num;
  }

  currentCity() {
    return this.currentCity;
  }

  currentCityIndex() {
    return this.currentCityIndex;
  }

  getCar() {
    return this.car;
  }

  distanceFromLastCity() {
    return cities[this.currentCityIndex - 1].distanceRemaining - this.currentCity.distanceRemaining;
  }

  updateStatesEvent(event) {
    if (event != undefined) {
      if (event.description.includes('Nickelback')) {
        console.log("NICKELBACK");
        var stopItPlease = function() {
          nickelback.pause();
          nickelback.currentTime = 0;
        }
        setTimeout(stopItPlease, 12000);
        var nickelback = new Audio('audio/nickelback.mp3');
        nickelback.play();
      }
      this.changeCool(event.cool);
      this.changeMoney(event.cost);
      notification(event.description, event.cool, event.cost);
    }
  }

	goWest() {
    // for (person in this.people) {
    //   person.becomeHungrier()
    // }

    if (this.currentCityIndex < cities.length) {
      this.currentCityIndex++;
      this.currentCity = cities[this.currentCityIndex];
      this.car.mileage += this.distanceFromLastCity();
    }
		// var event = this.eventsManager.getRandomEvent();
    // this.updateStatesEvent(event);
    return event;
  }
  getGasStats() {
    var costPerGallon = this.car.generateCostPerGallon();
    var requiredFuel = this.car.MAX_TANK_CAPACITY - this.car.currentTank;
    var totalCost = requiredFuel * costPerGallon; 
    console.log('requiredFuel ' + requiredFuel);
    console.log('total cost ' + totalCost);
    
    return {
      costPerGallon: costPerGallon,
      amountToFill: requiredFuel, 
      totalCost: totalCost
    }
     
  }

	refuelCar(totalCost) {
		// let requiredFuel = this.car.requiredFuel();
		// let randomNumber = Math.random();
		// let costPerGallon = 2 + randomNumber;
		// let costOfGas = requiredFuel * costPerGallon;
    if (totalCost <= this.wealth) {
      this.wealth -= totalCost;
      this.car.refuel();
    } else {
      notification("Not enough money for gas!");
    }
	}

  feedPeople(restaurant) {
  //   for (person in this.people) {
  //     person.feed()
  //   }

    this.wealth -= restaurant.cost
  }

	selectRestaurant(restaurant) {
		this.changeMoney(restaurant.price);
		this.changeCool(restaurant.cool);
	}
}
