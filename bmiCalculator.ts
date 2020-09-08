const calculateBmi = (height: number, weight: number): string => {
  const meters: number = height / 100;
  const bmi: number = weight / (meters * meters);

  if (bmi < 16) return 'Severly underweight';
  else if (bmi < 18.5) return 'Underweight';
  else if (bmi < 25) return 'Normal (healthy weight)';
  else if (bmi < 30) return 'Overweight';
  else if (bmi < 35) return 'Moderately obese';
  else if (bmi > 35) return 'Severly obese';
  else throw new Error('Incorrect arguments');
};

console.log(calculateBmi(120, 74));
