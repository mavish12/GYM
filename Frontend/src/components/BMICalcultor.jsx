import React, { useState } from "react";
import { toast } from "react-toastify";

const BMICalcultor = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!height || !weight || !gender) {
      toast.error("Please enter valid Height, Weight and Gender");
      return;
    }
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      toast.warning(
        "You're underweight. Consider seeking advice from a healthcare provider"
      );
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      toast.success(
        "You have normal weight. Keep it up by maintaining a healthy lifestyle"
      );
    } else if (bmiValue > 24.9 && bmiValue < 29.9) {
      toast.warning(
        "You're overweight. Consider seeking advice from a healthcare provider"
      );
    } else {
      toast.error(
        "You're in obese range. It is recomended to seekadvice from a Specialist and take follow daily routeins given by them"
      );
    }
  };

  return (
    <section className="bmi">
      <h1>BMI CALCULATOR</h1>
      <div className="container">
        <div className="wrapper">
          <form onSubmit={calculateBMI}>
            <div>
              <label>Height (cm)</label>
              <input
                type="number"
                placeholder="Height in cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Weight (kg)</label>
              <input
                type="number"
                placeholder="Weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Gender</label>
              <select value={gender} onChange={(e)=> setGender(e.target.value)}>
                <option value="Select Gender">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <button type="submit" >
              Calculate BMI
            </button>
          </form>
        </div>
        <div className="wrapper">
          <img src="/bmi.jpg" alt="bmiImage" />
        </div>
      </div>
    </section>
  );
};

export default BMICalcultor;
