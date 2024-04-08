"use client";

import { useState, useEffect } from "react";

// Components
import { DataTableDemo } from "@/components/datatable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Utils
import getTransactions from "@/utils/actions/getTransaction";
import { formatCurrency } from "@/utils/functions/formatCurrency";

export default function Index() {
  const [transactions, setTransactions] = useState<any>([]);
  const [categoryTotals, setCategoryTotals] = useState<any>({});
  const [categoryPercentages, setCategoryPercentages] = useState({});
  const [outcome, setOutcome] = useState<number | undefined>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { transactions, categoryPercentages, categoryTotals, outcome } =
          await getTransactions();
        setTransactions(transactions);
        setCategoryPercentages(categoryPercentages);
        setCategoryTotals(categoryTotals);
        setOutcome(outcome);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [outcome, transactions, categoryTotals, categoryPercentages]);

  return (
    <section id="wallet" className="flex flex-col pad-x">
      {/* Overview */}
      <div className="flex items-center justify-between gap-x-4">
        <h1 className="text-4xl font-bold text-foreground">Wallet</h1>
        <Select>
          <SelectTrigger className="focus:ring-0 w-28 md:w-[180px] border-0 shadow-none">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Summary */}
      <div className="flex lg:flex-row flex-col lg:items-end lg:justify-between gap-x-4 gap-y-4 py-6 lg:py-12">
        <div className="flex flex-col justify-start">
          <h2 className="font-medium text-lg text-foreground/60">Summary</h2>
          <p className={`text-2xl font-semibold`}>
            {formatCurrency(outcome ?? 0, "USD").value}
          </p>
        </div>
        <div className="flex items-end gap-x-2 w-full mb-2 min-w-52 lg:max-w-lg">
          {Object.entries(categoryPercentages).map(([category, percentage]) => (
            <div
              key={category}
              className={`h-3 rounded-full ${
                category === "Income"
                  ? "bg-green-500"
                  : category === "Expenses"
                  ? "bg-red-500"
                  : category === "Investments"
                  ? "bg-yellow-400"
                  : "bg-violet-700"
              }`}
              style={{ width: `${percentage}%` }}
            />
          ))}
        </div>
      </div>
      {/* Detail */}
      <div className="lg:flex items-center grid grid-cols-2 grid-rows-2 justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="font-medium text-lg text-green-500">Income</h3>
          <p className="text-foreground text-xl font-semibold mt-2">
            {formatCurrency(categoryTotals.Income, "USD").value}
          </p>
          <p className="text-foreground/60 text-sm">+10% vs last year</p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-medium text-lg text-red-500">Expenses</h3>
          <p className="text-foreground text-xl font-semibold mt-2">
            {formatCurrency(categoryTotals.Expenses, "USD").value}
          </p>
          <p className="text-foreground/60 text-sm">+4% vs last year</p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-medium text-lg text-yellow-400">Investments</h3>
          <p className="text-foreground text-xl font-semibold mt-2">
            {formatCurrency(categoryTotals.Investments, "USD").value}
          </p>
          <p className="text-foreground/60 text-sm">-6% vs last year</p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-medium text-lg text-violet-700">Savings</h3>
          <p className="text-foreground text-xl font-semibold mt-2">
            {formatCurrency(categoryTotals.Savings, "USD").value}
          </p>
          <p className="text-foreground/60 text-sm">+3% vs last year</p>
        </div>
      </div>
      {/* Table */}
      <div className="flex flex-col mt-12">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex flex-col">
            <h4 className="font-medium text-2xl text-foreground">
              Transactions
            </h4>
            <p className="text-foreground/60 text-sm">
              You have {transactions?.length} transactions this month
            </p>
          </div>
        </div>
        <DataTableDemo />
      </div>
    </section>
  );
}
