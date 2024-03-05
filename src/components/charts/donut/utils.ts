export function calculatePercentage(
  numbers: number[],
  total: number
): number[] {
  const percentageArray: number[] = [];

  numbers.forEach((number) => {
    const percentage = Math.round((number / total) * 100);

    percentageArray.push(percentage);
  });

  return percentageArray;
}

export function generateRandomNumbers(n: number): number[] {
  const min = 100;
  const max = 500;
  const result: number[] = [];

  for (let i = 0; i < n; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    result.push(randomNumber);
  }

  return result;
}
