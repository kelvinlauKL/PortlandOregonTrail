describe("Car.js Test Suite", function(){
    var car;

    beforeEach(function() {
        car = new Car();
    });

    describe("travel()", function () {
        it("Travel should be executed", function () {
            expect(car.travel()).not.toBeDefined();
        });
    });

    describe("requiredFuel()", function () {

        it("Required fuel should be equal to of greater than 0 ", function () {
            expect(car.requiredFuel()).toBeGreaterThanOrEqual(0);
        })


        it("Required fuel should be less than or equal to 20 ", function () {
            expect(car.requiredFuel()).toBeLessThanOrEqual(20);
        })


        it("Required fuel should not be equal to of less than 0 ", function () {
            expect(car.requiredFuel()).not.toBeLessThanOrEqual(-1);
        })

        it("Required fuel should not be equal to of greater than 20 ", function () {
            expect(car.requiredFuel()).not.toBeGreaterThanOrEqual(21);
        })

    });

    //car.reFuel is called by gameTest.js

    describe("generateCostPerGallon()", function () {

        it("Cost per gallon should be greater than 2", function () {
            expect(car.generateCostPerGallon()).toBeGreaterThan(2);
        })

        it("Cost per gallon should be less than or equal to 3", function () {
            expect(car.generateCostPerGallon()).toBeLessThanOrEqual(3);
        })

    });

})

