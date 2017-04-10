describe("Person.js Test Suite", function(){
    var person;


    beforeEach(function() {
        person = new Person();
    });


    describe("becomeHungerier()", function () {

        it("If Hunger value is >= 100 then it should be dead message" , function () {
            person.hunger = 150
            person.becomeHungerier();
            person.die();
            expect(person.isDead).toBe(true);
        });

        it("If Hunger value is < 100 then it should show character hunger message", function () {
            person.becomeHungerier.hunger = 10;
            expect(person.becomeHungerier()).not.toBeDefined();
        });

    });


    describe("die()", function () {

        it("Character death should ne defaulted", function () {
            expect(person.die()).not.toBe(person.isDead);
        })

        it("Charcter Dies", function () {
            person.die();
            expect(person.isDead).toBe(true);
        })

    });


    describe("feed()", function () {

        it("Hunger value should be 0", function () {
            person.feed.hunger = 0;
            expect(person.feed()).toBeGreaterThanOrEqual(person.feed.hunger);
        })
    });
    
    describe("CharacterManager()", function () {
        var characters;

        beforeEach(function() {
            characters = new CharacterManager();
        });

        it("Character array is populated", function () {
            expect(characters).not.toBeNull()
        });

    });

})
