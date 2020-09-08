class Result {
  periodLength: number;
  trainingDays: number = 0;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  training: Array<number>,
  target: number
): Result => {
  let summary = new Result();
  summary.periodLength = training.length;
  for (let i = 0; i < training.length; i++) {
    if (training[i] !== 0) {
      summary.trainingDays += 1;
    }
  }
  summary.average = training.reduce((p, c) => p + c, 0) / training.length;
  if (summary.average === target) {
    summary.success = true;
  } else {
    summary.success = false;
  }
  summary.target = target;

  if (summary.average >= target) {
    summary.rating = 3;
  } else if (summary.rating < target / 2.5) {
    summary.rating = 1;
  } else {
    summary.rating = 2;
  }

  if (summary.rating === 1) {
    summary.ratingDescription = 'pretty bad';
  } else if (summary.rating === 2) {
    summary.ratingDescription = 'not too bad but could be better';
  } else {
    summary.ratingDescription = 'pretty good';
  }

  return summary;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1, 10], 2));
