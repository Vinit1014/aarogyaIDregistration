import React, { useState } from "react";

const Captcha = () => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10));
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10));
  const [userAnswer, setUserAnswer] = useState("");
  const [captchaResult, setCaptchaResult] = useState("");
  const [isValid, setIsValid] = useState(false);
    
  const generateCaptcha = () => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
    setUserAnswer("");
    setCaptchaResult("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = num1 + num2;
    if (parseInt(userAnswer) === result) {
      setIsValid(true);
    } else {
      setIsValid(false);
      generateCaptcha();
    }
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
