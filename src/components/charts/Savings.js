import React, { useState, useEffect, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import db from "../../firebase/firebase";
import { UserContext } from "../../context/Context";

function Savings() {
  const user = useContext(UserContext);

  const [transactionDate, setTransactionDate] = useState([]);
  const [savingsData, setSavingsData] = useState([]);

  useEffect(() => {
    db.collection("transactions")
      .doc(user.email)
      .collection("transactions")
      .orderBy("date", "asc")
      .onSnapshot((snapshot) => {
        let dbData = snapshot.docs.map((doc) => doc.data());

        const uniqueDates = [
          ...new Set(
            dbData.map((t) => {
              const date = new Date(t.date.seconds * 1000);
              return date.toISOString().substr(0, 7);
            })
          ),
        ];

        setTransactionDate(uniqueDates);

        /////////////
        const calculateSavings = (data) => {
          const savings = {};
          data.forEach((item) => {
            const date = new Date(item.date.seconds * 1000);
            const month = date.toLocaleString("default", { month: "long" });
            const year = date.getFullYear();

            if (item.type === "income") {
              if (!savings[`${month} ${year}`]) {
                savings[`${month} ${year}`] = 0;
              }
              savings[`${month} ${year}`] += item.amount;
            } else if (item.type === "expense") {
              if (!savings[`${month} ${year}`]) {
                savings[`${month} ${year}`] = 0;
              }
              savings[`${month} ${year}`] -= item.amount;
            }
          });

          const savingsArray = Object.values(savings);
          return savingsArray;
        };

        const savings = calculateSavings(dbData);
        setSavingsData(savings);
      });
    //eslint-disable-next-line
  }, []);

  let state = {
    series: [
      {
        name: "Savings",
        data: savingsData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#008FFB"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Savings",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        type: "datetime",
        categories: transactionDate,
      },
      yaxis: {
        title: {
          text: "Rupees",
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  };

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
