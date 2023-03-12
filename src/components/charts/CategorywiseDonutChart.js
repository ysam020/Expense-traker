import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { UserContext } from "../../context/Context";
import db from "../../firebase/firebase";

function CategorywiseDonutChart() {
  const [transactionCategory, setTransactionCategory] = useState([]);
  const [donutAmount, setDonutAmount] = useState([]);

  const user = useContext(UserContext);

  useEffect(() => {
    const categories = [];
    const amount = [];

    db.collection("transactions")
      .doc(user.email)
      .collection("transactions")
      .onSnapshot((snapshot) => {
        let dbData = snapshot.docs.map((doc) => doc.data());

        const result = Object.values(
          dbData.reduce((acc, cur) => {
            if (!acc[cur.category]) {
              acc[cur.category] = { category: cur.category, amount: 0 };
            }
            acc[cur.category].amount += cur.amount;
            return acc;
          }, {})
        );

        const resultAmount = result.map((res) => {
          categories.push(res.category);
          setTransactionCategory(categories);
          return amount.push(res.amount);
        });
        setDonutAmount(resultAmount);
      });
    //eslint-disable-next-line
  }, []);

  const donutState = {
    series: donutAmount,
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      labels: transactionCategory,
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        },
      },
      title: {
        text: "Category-wise transactions",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <div>
      {" "}
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
