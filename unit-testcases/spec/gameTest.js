describe("game.js Test Suite", function(){
    var game;
    var person;
    var car;
    var event;
    var restaurant;

    beforeEach(function() {
        game = new Game();
        person = new Person();
        car = new Car();
        event = new Event();
        restaurant = new RestaurantManager();
    });


    describe("setUpPeople()", function () {

        it("Setup should be executed", function () {
            expect(game.setUpPeople()).not.toBeDefined();
        })
    });


    describe("changeCool()", function () {

        it("Change Cool should have cool equal cool + num", function () {
            game.cool = 20
            game.changeCool(10)
            expect(game.cool).toBe(30);
        })
    });


    describe("changeMoney()", function () {

        it("Change Cool should have cool equal cool + num", function () {
            game.wealth = 10
            game.changeMoney(40)
            expect(game.wealth).toBe(50);
        })
    });

    describe("currentCity()", function () {

        it("Return current city from index", function () {
            index = game.currentCityIndex;
            expect(game.currentCity).toBe(cities[index]);
        })
    });

    describe("currentCityIndex()", function () {

        it("Return current city index", function () {
            expect(game.currentCityIndex).toBe(0);
        })
    });

    describe("getCar()", function () {

        it("Return car should not be NULL", function () {
            expect(game.getCar()).not.toBeNull();
        })
    });


    describe("updateStatesEvent()", function () {

        it("Should update event", function () {
            expect(game.updateStatesEvent()).not.toBeDefined();
        })
    });


    describe("goWest()", function () {

        it("Should increment city index & car mileage", function () {
            expect(game.goWest()).not.toBeDefined();
        })
    });

    describe("getGasStats()", function () {

        it("Should retrieve gas stats from car.js and not be null", function () {
            expect(game.getGasStats()).not.toBeNull();
        })
    });


    describe("refuelCar()", function () {
            var wealthBeforeGas;

        it("Should deduct wealth by gas total cost if wealth is >= gas total cost", function () {
            game.wealth = 100;
            WealthBeforeGas = game.wealth;
            game.refuelCar(10);
            expect(WealthBeforeGas).toBeGreaterThan(game.wealth);
        })

        it("Wealth Should reamin the same if wealth is < gas total cost", function () {
            game.wealth = 10;
            WealthBeforeGas = game.wealth;
            game.refuelCar(100);
            expect(WealthBeforeGas).toBeLessThanOrEqual(game.wealth);
        })
    });

    describe("starvePeople()", function () {

        it("Characters get hungry", function () {
            expect(game.starvePeople()).not.toBeDefined();
        })
    });


    describe("isGameOver()", function () {

        it("should check for game over condition", function () {
            expect(game.isGameOver()).not.toBeNull();
        })
    });

})