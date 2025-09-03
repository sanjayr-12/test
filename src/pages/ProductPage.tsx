import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { productList, type Product } from "../products";

const ProductPage = () => {
  const [userInput, setUserInput] = useState("");
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleRecommend = async () => {
    if (!userInput.trim()) {
      setError("Please enter your preferences.");
      return;
    }

    setLoading(true);
    setError(null);
    setInfoMessage(null);
    setRecommendedProducts([]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing. Please check your .env file.");
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const prompt = `
        Based on the user's request: "${userInput}", 
        and the following product list: ${JSON.stringify(productList)}.
        
        Please recommend the most suitable products.
        
        Return ONLY a JSON object with a single key "ids" which is an array of the recommended product IDs. 
        For example: {"ids": [1, 5, 6]}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/{[\s\S]*}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON object found in the AI's response.");
      }
      const jsonString = jsonMatch[0];

      const recommendedIds: number[] = JSON.parse(jsonString).ids;

      const filteredProducts = productList.filter((product) =>
        recommendedIds.includes(product.id)
      );

      if (filteredProducts.length === 0) {
        setInfoMessage(
          "No specific products matched your request based on the AI's recommendation."
        );
      }

      setRecommendedProducts(filteredProducts);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Sorry, something went wrong. ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h1>AI Product Recommender </h1>

      <h2>All Available Products</h2>
      <ul>
        {productList.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> (${p.price}) - <em>{p.specs}</em>
          </li>
        ))}
      </ul>

      <hr style={{ margin: "30px 0" }} />

      <h2>Get Your Recommendation</h2>
      <p>
        Tell us what you're looking for (e.g., "a good phone under $500" or "a
        laptop for programming")
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your preferences here..."
          style={{ width: "300px", padding: "10px", fontSize: "16px" }}
        />
        <button
          onClick={handleRecommend}
          disabled={loading}
          style={{ marginLeft: "10px", padding: "10px 15px", fontSize: "16px" }}
        >
          {loading ? "Thinking..." : "Get Recommendation"}
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {error && (
          <p style={{ color: "red" }}>
            <strong>Error:</strong> {error}
          </p>
        )}
        {infoMessage && <p style={{ color: "blue" }}>{infoMessage}</p>}

        {recommendedProducts.length > 0 && (
          <div>
            <h3>Here are your recommendations:</h3>
            <ul>
              {recommendedProducts.map((product) => (
                <li key={product.id} style={{ marginBottom: "10px" }}>
                  <strong>{product.name}</strong> - ${product.price} (
                  {product.category})
                  <p style={{ margin: "5px 0 0 10px" }}>{product.specs}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
