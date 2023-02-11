const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made

    const recipe1 = await Recipe.create({
      title: "Hello",
      level: "Easy Peasy",
      ingredients: ["choclate", "banana", "oats"],
      cuisine: "continental",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 20,
      creator: "Godan",
      created: "10/02/2023",
    });
    //console.log(recipe1.title);

    const recipeMany = await Recipe.insertMany(data);
    recipeMany.forEach((recipe12) => {
      // console.log(recipe12.title);
    });

    const updateMananger = await Recipe.findOneAndUpdate(
      {
        title: "Rigatoni alla Genovese",
      },
      {
        duration: 100,
      },
      {
        new: true,
      }
    );

    //console.log(updateMananger);
    const deleteCarrot = await Recipe.deleteOne(
      {
        title: "Carrot Cake",
      },
      {
        deleteCount: 1,
      }
    );
    console.log(deleteCarrot);
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  })

  .finally(() => {
    mangoose.connection.close();
  });
