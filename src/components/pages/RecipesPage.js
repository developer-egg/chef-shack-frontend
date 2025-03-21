import MainNavbar from "../MainNavbar";
import RecipeTile from "../RecipeTile";
import { Spinner } from "react-bootstrap";

import { useEffect, useState } from "react";
import axios from "axios";

import "../../css/recipe-page-styles.css";
import { Link } from "react-router-dom";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fillRecipeList() {
    await axios
      .get("http://159.65.224.118:8080/recipes/get_all_recipes")
      .then((res) => {
        setRecipes(res.data.recipes);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // since all axios calls are done at this point, set isLoading to false
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fillRecipeList();
  }, []);

  if (!isLoading) {
    return (
      <>
        <MainNavbar />
        <h1 className="recipe-page-header">Explore Recipes</h1>
        {/*Todo: make the span a link*/}
        <p className="recipe-page-subheader">
          or browse by{" "}
          <Link to="/categories" className="recipe-page-subheader-span">category</Link>
        </p>

        <div className="recipe-tiles">
          {recipes.map((recipe) => (
            <RecipeTile
              title={recipe.recipe_title}
              author={recipe.username}
              image={recipe.image}
              id={recipe.id}
              likes={recipe.likes}
            />
          ))}
        </div>
      </>
    );
  } else {
    return <Spinner id="spinner" animation="border" variant="success" />;
  }
};

export default RecipesPage;
