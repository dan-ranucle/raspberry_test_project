const data = {
  users: [
    {
      id: 1,
      mobile: "9876543210",
      bets: [
        { number: 3, amount: 2500 },
        { number: 1, amount: 5000 },
        { number: 2, amount: 5000 },
        { number: 3, amount: 5000 },
        { number: 4, amount: 5000 },
        { number: 5, amount: 5000 },
        { number: 0, amount: 5000 },
        { number: 9, amount: 2500 }
      ]
    },
    {
      id: 2,
      mobile: "8765432109",
      bets: [
        { number: 2, amount: 3333 },
        { number: 5, amount: 3333 },
        { number: 6, amount: 3333 },
        { number: 7, amount: 3333 },
        { number: 8, amount: 3333 },
        { number: 0, amount: 3333 },
        { number: 1, amount: 3334 }
      ]
    },
    {
      id: 3,
      mobile: "7654321098",
      bets: [
        { number: 1, amount: 5000 },
        { number: 0, amount: 2500 },
        { number: 2, amount: 2500 },
        { number: 3, amount: 2500 },
        { number: 6, amount: 2500 },
        { number: 7, amount: 2500 },
        { number: 4, amount: 2500 }
      ]
    },
    {
      id: 4,
      mobile: "6543210987",
      bets: [
        { number: 6, amount: 2000 },
        { number: 3, amount: 3000 },
        { number: 4, amount: 3000 },
        { number: 8, amount: 3000 },
        { number: 9, amount: 3000 },
        { number: 2, amount: 3000 },
        { number: 7, amount: 5000 }
      ]
    },
    {
      id: 5,
      mobile: "5432109876",
      bets: [
        { number: 9, amount: 1000 },
        { number: 2, amount: 4000 },
        { number: 1, amount: 4000 },
        { number: 3, amount: 4000 },
        { number: 4, amount: 4000 },
        { number: 6, amount: 4000 },
        { number: 7, amount: 4000 },
        { number: 8, amount: 4000 },
        { number: 5, amount: 5000 }
      ]
    },
    {
      id: 6,
      mobile: "9876543212",
      bets: [
        { number: 1, amount: 250 },
        { number: 2, amount: 500 },
        { number: 4, amount: 500 },
        { number: 5, amount: 500 },
        { number: 7, amount: 500 },
        { number: 8, amount: 500 },
        { number: 3, amount: 250 }
      ]
    },
    {
      id: 7,
      mobile: "8765432129",
      bets: [
        { number: 4, amount: 333 },
        { number: 5, amount: 333 },
        { number: 7, amount: 333 },
        { number: 8, amount: 333 },
        { number: 1, amount: 333 },
        { number: 2, amount: 333 },
        { number: 6, amount: 333 }
      ]
    },
    {
      id: 8,
      mobile: "7654321198",
      bets: [
        { number: 7, amount: 500 },
        { number: 8, amount: 250 },
        { number: 9, amount: 250 }
      ]
    },
    {
      id: 9,
      mobile: "6543210989",
      bets: [
        { number: 6, amount: 200 },
        { number: 3, amount: 300 },
        { number: 7, amount: 500 }
      ]
    },
    {
      id: 10,
      mobile: "5432109877",
      bets: [
        { number: 9, amount: 100 },
        { number: 2, amount: 400 },
        { number: 5, amount: 500 }
      ]
    }
  ]
};

const calculateResults = (data) => {
  const numberCounts = {};
  const rewards = {};
  let totalAmount = 0;
  let totalBets = 0;
  // Step 1: Calculate total amount and count numbers
  data.users.forEach((user) => {
    user.bets.forEach((bet) => {
      totalAmount += bet.amount;
      totalBets += 1; // Increment total bets
      if (!numberCounts[bet.number]) {
        numberCounts[bet.number] = 0;
      }
      numberCounts[bet.number] += 1;
      console.log(
        `User ID: ${user.id}, Mobile: ${user.mobile}, Bet Number: ${bet.number}, Bet Amount: ${bet.amount}`
      );
      console.log(`Total Amount: ${totalAmount}, Total Bets: ${totalBets}`);
    });
  });
  // Step 2: Find the number with the least bets
  const leastBetNumber = Object.keys(numberCounts).reduce(
    (leastNumber, currentNumber) => {
      if (
        leastNumber === null ||
        numberCounts[currentNumber] < numberCounts[leastNumber]
      ) {
        return currentNumber;
      }
      return leastNumber;
    },
    null
  );
  // Step 3: Calculate rewards for users
  data.users.forEach((user) => {
    let userReward = 0;
    const betNumbers = []; // Array to store bet numbers

    user.bets.forEach((bet) => {
      betNumbers.push(bet.number); // Add bet number to array
      if (bet.number == leastBetNumber) {
        userReward += bet.amount * 8; // Reward is 8 times the bet amount
      }
    });
    // Store reward details for every user, even if no reward
    rewards[user.id] = {
      id: user.id,
      mobile: user.mobile,
      reward: userReward,
      betNumbers: betNumbers,
      winningNumber: leastBetNumber
    };
  });
  // Step 4: Return the results
  return {
    totalAmount,
    leastBetNumber,
    rewards
  };
};
// Call the function with the data and log the results
const results = calculateResults(data);
console.log(results);

// Code in Typescript
// type Bet = {
//   number: number;
//   amount: number;
// };

// type User = {
//   id: number;
//   mobile: string;
//   bets: Bet[];
// };

// type Data = {
//   users: User[];
// };

// type Rewards = {
//   [key: number]: {
//     id: number;
//     mobile: string;
//     reward: number;
//     betNumbers: number[];
//     winningNumber: number | null;
//   };
// };

// const calculateResults = (data: Data): {
//   totalAmount: number;
//   leastBetNumber: number | null;
//   rewards: Rewards;
// } => {
//   const numberCounts: Record<number, number> = {};
//   const rewards: Rewards = {};
//   let totalAmount = 0;
//   let totalBets = 0;

//   // Step 1: Calculate total amount and count numbers
//   data.users.forEach((user) => {
//     user.bets.forEach((bet) => {
//       totalAmount += bet.amount;
//       totalBets += 1; // Increment total bets
//       if (!numberCounts[bet.number]) {
//         numberCounts[bet.number] = 0;
//       }
//       numberCounts[bet.number] += 1;
//       console.log(
//         `User ID: ${user.id}, Mobile: ${user.mobile}, Bet Number: ${bet.number}, Bet Amount: ${bet.amount}`
//       );
//       console.log(`Total Amount: ${totalAmount}, Total Bets: ${totalBets}`);
//     });
//   });

//   // Step 2: Find the number with the least bets
//   const leastBetNumber: number | null = Object.keys(numberCounts).reduce(
//     (leastNumber, currentNumber) => {
//       if (
//         leastNumber === null ||
//         numberCounts[+currentNumber] < numberCounts[+leastNumber]
//       ) {
//         return +currentNumber;
//       }
//       return leastNumber;
//     },
//     null as number | null
//   );

//   // Step 3: Calculate rewards for users
//   data.users.forEach((user) => {
//     let userReward = 0;
//     const betNumbers: number[] = []; // Array to store bet numbers

//     user.bets.forEach((bet) => {
//       betNumbers.push(bet.number); // Add bet number to array
//       if (bet.number === leastBetNumber) {
//         userReward += bet.amount * 8; // Reward is 8 times the bet amount
//       }
//     });

//     // Store reward details for every user, even if no reward
//     rewards[user.id] = {
//       id: user.id,
//       mobile: user.mobile,
//       reward: userReward,
//       betNumbers: betNumbers,
//       winningNumber: leastBetNumber
//     };
//   });

//   // Step 4: Return the results
//   return {
//     totalAmount,
//     leastBetNumber,
//     rewards
//   };
// };

// // Example data
// const data: Data = {
//   users: [
//     {
//       id: 1,
//       mobile: "9876543210",
//       bets: [
//         { number: 3, amount: 2500 },
//         { number: 1, amount: 5000 },
//         { number: 2, amount: 5000 },
//         { number: 3, amount: 5000 },
//         { number: 4, amount: 5000 },
//         { number: 5, amount: 5000 },
//         { number: 0, amount: 5000 },
//         { number: 9, amount: 2500 }
//       ]
//     },
//     {
//       id: 2,
//       mobile: "8765432109",
//       bets: [
//         { number: 2, amount: 3333 },
//         { number: 5, amount: 3333 },
//         { number: 6, amount: 3333 },
//         { number: 7, amount: 3333 },
//         { number: 8, amount: 3333 },
//         { number: 0, amount: 3333 },
//         { number: 1, amount: 3334 }
//       ]
//     },
//     {
//       id: 3,
//       mobile: "7654321098",
//       bets: [
//         { number: 1, amount: 5000 },
//         { number: 0, amount: 2500 },
//         { number: 2, amount: 2500 },
//         { number: 3, amount: 2500 },
//         { number: 6, amount: 2500 },
//         { number: 7, amount: 2500 },
//         { number: 4, amount: 2500 }
//       ]
//     },
//     {
//       id: 4,
//       mobile: "6543210987",
//       bets: [
//         { number: 6, amount: 2000 },
//         { number: 3, amount: 3000 },
//         { number: 4, amount: 3000 },
//         { number: 8, amount: 3000 },
//         { number: 9, amount: 3000 },
//         { number: 2, amount: 3000 },
//         { number: 7, amount: 5000 }
//       ]
//     },
//     {
//       id: 5,
//       mobile: "5432109876",
//       bets: [
//         { number: 9, amount: 1000 },
//         { number: 2, amount: 4000 },
//         { number: 1, amount: 4000 },
//         { number: 3, amount: 4000 },
//         { number: 4, amount: 4000 },
//         { number: 6, amount: 4000 },
//         { number: 7, amount: 4000 },
//         { number: 8, amount: 4000 },
//         { number: 5, amount: 5000 }
//       ]
//     },
//     {
//       id: 6,
//       mobile: "9876543212",
//       bets: [
//         { number: 1, amount: 250 },
//         { number: 2, amount: 500 },
//         { number: 4, amount: 500 },
//         { number: 5, amount: 500 },
//         { number: 7, amount: 500 },
//         { number: 8, amount: 500 },
//         { number: 3, amount: 250 }
//       ]
//     },
//     {
//       id: 7,
//       mobile: "8765432129",
//       bets: [
//         { number: 4, amount: 333 },
//         { number: 5, amount: 333 },
//         { number: 7, amount: 333 },
//         { number: 8, amount: 333 },
//         { number: 1, amount: 333 },
//         { number: 2, amount: 333 },
//         { number: 6, amount: 333 }
//       ]
//     },
//     {
//       id: 8,
//       mobile: "7654321198",
//       bets: [
//         { number: 7, amount: 500 },
//         { number: 8, amount: 250 },
//         { number: 9, amount: 250 }
//       ]
//     },
//     {
//       id: 9,
//       mobile: "6543210989",
//       bets: [
//         { number: 6, amount: 200 },
//         { number: 3, amount: 300 },
//         { number: 7, amount: 500 }
//       ]
//     },
//     {
//       id: 10,
//       mobile: "5432109877",
//       bets: [
//         { number: 9, amount: 100 },
//         { number: 2, amount: 400 },
//         { number: 5, amount: 500 }
//       ]
//     }
//   ]
// };

// const results = calculateResults(data);
// console.log(results);
