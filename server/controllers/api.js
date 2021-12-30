const needle = require("needle");
const User = require("../models/user");
const Recipe = require("../models/recipe");

module.exports = class API {
  static async createUser(req, res) {
    const { email, fullName, password } = req.body;
    const user = new User({
      email: email,
      fullName: fullName,
      password: password,
    });

    user
      .save()
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async readUserByEmail(req, res) {
    User.find({ email: req.body.email })
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async updateUser(req, res) {
    const { _id, fullName, password } = req.body;
    User.findByIdAndUpdate(
      { _id },
      {
        fullName: fullName,
        password: password,
      }
    )
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async deleteUser(req, res) {
    User.findByIdAndDelete({ _id: req.body._id })
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async createRecipe(req, res) {
    const { _userId, name, description, imageURL, instructions } = req.body;
    const recipe = new Recipe({
      _userId: _userId,
      name: name,
      description: description,
      imageURL: imageURL,
      tags: "",
      favourite: false,
      ingredients: [],
      instructions: instructions,
    });

    recipe
      .save()
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async readRecipe(req, res) {
    Recipe.findOne({ _id: req.body._id })
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async updateRecipe(req, res) {
    const { _id, name, description, imageURL, instructions } = req.body;
    Recipe.findByIdAndUpdate(
      { _id },
      {
        name: name,
        description: description,
        imageURL: imageURL,
        instructions: instructions,
      }
    )
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async deleteRecipe(req, res) {
    Recipe.findByIdAndDelete({ _id: req.body._id })
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async readRecipes(req, res) {
    Recipe.find({ _userId: req.body._id })
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async updateTags(req, res) {
    Recipe.findByIdAndUpdate(
      { _id: req.body._id },
      {
        tags: req.body.tags,
      }
    )
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async createIngredient(req, res) {
    const {
      _id,
      name,
      unit,
      amount,
      caloriesAmount,
      proteinAmount,
      fatAmount,
      saturatedFatAmount,
      carbohydratesAmount,
      sodiumAmount,
      fiberAmount,
    } = req.body;
    Recipe.findByIdAndUpdate(
      { _id },
      {
        $push: {
          ingredients: {
            name: name,
            unit: unit,
            amount: amount,
            nutrients: [
              {
                name: "calories",
                amount: caloriesAmount,
                unit: "kcal",
              },
              {
                name: "protein",
                amount: proteinAmount,
                unit: "g",
              },
              {
                name: "fat",
                amount: fatAmount,
                unit: "g",
              },
              {
                name: "saturated fat",
                amount: saturatedFatAmount,
                unit: "g",
              },
              {
                name: "carbohydrates",
                amount: carbohydratesAmount,
                unit: "g",
              },
              {
                name: "sodium",
                amount: sodiumAmount,
                unit: "mg",
              },
              {
                name: "fiber",
                amount: fiberAmount,
                unit: "g",
              },
            ],
          },
        },
        $inc: {
          "nutrients.0.amount": caloriesAmount,
          "nutrients.1.amount": proteinAmount,
          "nutrients.2.amount": fatAmount,
          "nutrients.3.amount": saturatedFatAmount,
          "nutrients.4.amount": carbohydratesAmount,
          "nutrients.5.amount": sodiumAmount,
          "nutrients.6.amount": fiberAmount,
        },
      }
    )
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  //wyrzucic?
  static async updateIngredient(req, res) {
    const { _id, name, unit, amount } = req.body;
    Recipe.updateOne(
      { _id: _id, "ingredients.$.name": name },
      {
        "ingredients.$.unit": unit,
        "ingredients.$.amount": amount,
      }
    )
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async deleteIngredient(req, res) {
    const { _id, name } = req.body;
    const oldIngredient = await Recipe.findOne(
      { _id: _id, "ingredients.name": name },
      { "ingredients.nutrients.$": 1 }
    );
    const caloriesAmount = oldIngredient.ingredients[0].nutrients[0].amount;
    const proteinAmount = oldIngredient.ingredients[0].nutrients[1].amount;
    const fatAmount = oldIngredient.ingredients[0].nutrients[2].amount;
    const saturatedFatAmount = oldIngredient.ingredients[0].nutrients[3].amount;
    const sodiumAmount = oldIngredient.ingredients[0].nutrients[4].amount;
    const carbohydratesAmount =
      oldIngredient.ingredients[0].nutrients[5].amount;
    const fiberAmount = oldIngredient.ingredients[0].nutrients[6].amount;
    Recipe.updateOne(
      { _id: _id },
      {
        $pull: {
          ingredients: {
            name: name,
          },
        },
        $inc: {
          "nutrients.0.amount": -caloriesAmount,
          "nutrients.1.amount": -proteinAmount,
          "nutrients.2.amount": -fatAmount,
          "nutrients.3.amount": -saturatedFatAmount,
          "nutrients.4.amount": -carbohydratesAmount,
          "nutrients.5.amount": -sodiumAmount,
          "nutrients.6.amount": -fiberAmount,
        },
      }
    )
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async readIngredients(req, res) {
    Recipe.find({ _id: req.body._id }, { ingredients: 1, _id: 0 })
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async getIngredientsList(req, res) {
    try {
      const params = new URLSearchParams({
        [process.env.API_KEY_NAME]: process.env.API_KEY_VALUE,
        query: req.body.ingredient,
      });

      const apiRes = await needle(
        "get",
        `${process.env.API_BASE_URL}/search?${params}`
      );
      const data = apiRes.body;

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async getIngredientInformation(req, res) {
    try {
      const { id, amount } = req.body;
      const params = new URLSearchParams({
        [process.env.API_KEY_NAME]: process.env.API_KEY_VALUE,
        amount: amount,
      });

      const apiRes = await needle(
        "get",
        `${process.env.API_BASE_URL}${id}/information?${params}`
      );
      const data = apiRes.body;

      const list = {
        name: data.name,
        nutrients: [
          {
            name: "calories",
            amount: data.nutrition.nutrients[2].amount,
            unit: "kcal",
          },
          {
            name: "protein",
            amount: data.nutrition.nutrients[13].amount,
            unit: "g",
          },
          {
            name: "fat",
            amount: data.nutrition.nutrients[25].amount,
            unit: "g",
          },
          {
            name: "saturated fat",
            amount: data.nutrition.nutrients[7].amount,
            unit: "g",
          },
          {
            name: "carbohydrates",
            amount: data.nutrition.nutrients[19].amount,
            unit: "g",
          },
          {
            name: "sodium",
            amount: data.nutrition.nutrients[33].amount,
            unit: "mg",
          },
          {
            name: "fiber",
            amount: data.nutrition.nutrients[14].amount,
            unit: "g",
          },
        ],
      };

      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};
