import React, { useEffect, useContext, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { UserContext } from "../../context/Context";
import { getExpenseTrend } from "../../utils/getExpenseTrend";
import useExpenseTrendState from "../../customHooks/useExpenseTrendState";

function ExpenseTrend() {
  const user = useContext(UserContext);

  const [transactionDate, setTransactionDate] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const state = useExpenseTrendState(transactionDate, incomeData, expenseData);

  useEffect(() => {
    getExpenseTrend(user, setExpenseData, setTransactionDate, setIncomeData);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      />
    </>
  );
}

export default ExpenseTrend;
