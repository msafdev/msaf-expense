import { createClient } from "../supabase/client";

interface CategoryTotals {
  [key: string]: number;
}

const getTransactions = async () => {
  const supabase = createClient();

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select(
      `
      amount,
      date,
      tags (
          *,
          categories (
              *
          )
      )
      `
    )
    .order("date", { ascending: false });

  const outcome = transactions?.reduce(
    (acc, curr) => acc + (curr.amount ?? 0),
    0
  );

  const categoryTotals: CategoryTotals = {
    Expenses: 0,
    Income: 0,
    Investments: 0,
    Savings: 0,
  };

  transactions?.forEach((transaction) => {
    const categoryName = transaction.tags?.categories?.name;

    if (categoryName !== null && categoryName !== undefined) {
      const amount = transaction.amount ?? 0;
      if (categoryName in categoryTotals) {
        categoryTotals[categoryName] += amount;
      }
    }
  });

  const categoryPercentages = Object.fromEntries(
    Object.entries(categoryTotals).map(([category, total]) => [
      category,
      Math.round((total / (outcome ?? 0)) * 100),
    ])
  );

  return { transactions, outcome, categoryTotals, categoryPercentages };
};

export default getTransactions;
