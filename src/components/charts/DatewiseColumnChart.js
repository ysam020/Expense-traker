import React, { useEffect, useContext, useState } from "react";
import Chart from "react-apexcharts";
import { UserContext } from "../../context/Context";
import { getdateWiseData } from "../../utils/getDateWiseData";
import useDateWiseColumnState from "../../customHooks/useDateWiseColumnState";

function DatewiseColumnChart() {
  const [transactionDate, setTransactionDate] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const user = useContext(UserContext);
  const columnState = useDateWiseColumnState(
    transactionDate,
    incomeData,
    expenseData
  );

  useEffect(() => {
    getdateWiseData(user, setIncomeData, setExpenseData, setTransactionDate);
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

export default DatewiseColumnChart;
