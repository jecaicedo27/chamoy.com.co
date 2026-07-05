import type { Recipe } from "@/lib/types";
import Link from "next/link";

export function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid four">
      {recipes.map((recipe) => (
        <Link className="card recipe-card" href={`/recetas/${recipe.slug}/`} key={recipe.slug}>
          <img className="card-image recipe-image" src={recipe.image} alt={recipe.imageAlt} loading="lazy" />
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <div className="recipe-meta">
            <span className="tag">{recipe.prepMinutes} min</span>
            <span className="tag">{recipe.intent}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
