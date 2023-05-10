import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { UserContext } from "../../context/Context";
import { getCategoryWiseData } from "../../utils/getCategoryWiseData";
import useCategoryDonutState from "../../customHooks/useCategoryDonutState";

function CategorywiseDonutChart() {
  const [transactionCategory, setTransactionCategory] = useState([]);
  const [donutAmount, setDonutAmount] = useState([]);

  const user = useContext(UserContext);
  const donutState = useCategoryDonutState(transactionCategory, donutAmount);

  useEffect(() => {
    getCategoryWiseData(user, setTransactionCategory, setDonutAmount);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <ReactApexChart
        options={donutState.options}
        series={donutState.series}
        type="donut"
        width="100%"
        height={350}
      />
    </div>
  );
}

export default CategorywiseDonutChart;
