import React, { useState } from "react";

const Captcha = () => {
  
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="m-2">
      <h1>Captcha</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex m-2">
          <div className="m-2 ">
            {num1} + {num2} = ?
          </div>
          <input
            type="number"
            className="border-red-200 border-2 m-2"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
        </div>
      </form>
      {isValid && <p>Captcha is valid!</p>}
      {!isValid && captchaResult && <p>Incorrect answer, try again!</p>}
    </div>
  );
};

export default Captcha;
