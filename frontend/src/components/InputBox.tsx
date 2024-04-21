import { TailSpin } from "react-loader-spinner";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const InputBox: React.FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://securepass-api-84ry.onrender.com/password_strength", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        mode: "cors",
        body: JSON.stringify({ password: inputPassword }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const responseData = await response.json();
      setLoading(false);
      let strengthText = "";
      if (responseData === "0") strengthText = "Weak";
      if (responseData === "1") strengthText = "Medium";
      if (responseData === "2") strengthText = "Strong";

      // Handle response data
      navigate("/results", {
        state: { password: inputPassword, strength: strengthText },
      });
    } catch (error) {
      console.error("Error sending password:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ textAlign: "center", margin: "20px" }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter your password"
          style={{
            width: "200px",
            height: "25px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            padding: "5px 10px",
            fontSize: "16px",
            margin: "10px 0",
          }}
        />
        <br />
        <button
          type="submit"
          style={{
            width: "150px",
            height: "40px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            outline: "none",
            position: "relative", // Add this to handle positioning
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <TailSpin color="#00BFFF" height={40} width={40} />
            </div>
          ) : (
            "Calculate"
          )}
        </button>
      </form>
    </>
  );
};

export default InputBox;
