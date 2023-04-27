import React, { useState, useEffect, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { UserContext } from "../../context/Context";
import { getSavingsData } from "../../utils/getSavingsData";
import useSavingsState from "../../customHooks/useSavingsState";

function Savings() {
  const user = useContext(UserContext);

  const [transactionDate, setTransactionDate] = useState([]);
  const [savingsData, setSavingsData] = useState([]);

  const state = useSavingsState(transactionDate, savingsData);
  useEffect(() => {
    getSavingsData(user, setTransactionDate, setSavingsData);
    //eslint-disable-next-line
  }, []);

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="line"
      height={350}
    />
  );
}

export default Savings;
