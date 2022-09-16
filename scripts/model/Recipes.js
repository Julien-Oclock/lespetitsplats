export default class Recipe {


    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
    get servings() {
        return this._servings;
    }
    get ingredients() {
        return this._ingredients;
    }
    get time() {
        return this._time;
    }
    get description() {
        return this._description;
    }
    get appliance() {
        return this._appliance;
    }
    get ustensils() {
        return this._ustensils;
    }
}