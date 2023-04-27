import React, { useEffect, useContext, useState } from "react";
import Chart from "react-apexcharts";
import { UserContext } from "../../context/Context";
import { getMonthWiseData } from "../../utils/getMonthWiseData";
import useMonthColumnState from "../../customHooks/useMonthColumnState";

function MonthwiseColumnChart() {
  const [transactionDate, setTransactionDate] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const user = useContext(UserContext);
  const columnState = useMonthColumnState(
    transactionDate,
    incomeData,
    expenseData
  );

  useEffect(() => {
    getMonthWiseData(user, setTransactionDate, setIncomeData, setExpenseData);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Chart
        options={columnState.options}
        series={columnState.series}
        type="bar"
        height={350}
        width="100%"
      />
    </div>
  );
}

export default MonthwiseColumnChart;
