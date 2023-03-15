import React, { useEffect, useContext, useState } from "react";
import Chart from "react-apexcharts";
import db from "../../firebase/firebase";
import { UserContext } from "../../context/Context";

function MonthwiseColumnChart() {
  const [transactionDate, setTransactionDate] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const user = useContext(UserContext);

  useEffect(() => {
    db.collection("transactions")
      .doc(user.email)
      .collection("transactions")
      .orderBy("date", "asc")
      .onSnapshot((snapshot) => {
        let dbData = snapshot.docs.map((doc) => doc.data());

        const monthYearMap = {};
        const incomeMap = {};
        const expenseMap = {};

        dbData.forEach((transaction) => {
          const date = new Date(transaction.date.seconds * 1000);
          const monthYear = `${date.toLocaleString("default", {
            month: "long",
          })} ${date.getFullYear()}`;

          if (transaction.type === "income") {
            if (!incomeMap[monthYear]) {
              incomeMap[monthYear] = 0;
            }
            incomeMap[monthYear] += transaction.amount;
          } else if (transaction.type === "expense") {
            if (!expenseMap[monthYear]) {
              expenseMap[monthYear] = 0;
            }
            expenseMap[monthYear] += transaction.amount;
          }

          monthYearMap[monthYear] = true;
        });

        const monthYearList = Object.keys(monthYearMap).sort((a, b) => {
          const aDate = new Date(`${a} 1, 2000`);
          const bDate = new Date(`${b} 1, 2000`);
          return aDate - bDate;
        });
        setTransactionDate(monthYearList);

        const incomeList = monthYearList.map(
          (monthYear) => incomeMap[monthYear] || 0
        );
        setIncomeData(incomeList);

        const expenseList = monthYearList.map(
          (monthYear) => expenseMap[monthYear] || 0
        );
        setExpenseData(expenseList);
      });
    //eslint-disable-next-line
  }, []);

  let columnState = {
    series: [
      {
        name: "Income",
        data: incomeData,
      },
      {
        name: "Expense",
        data: expenseData,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "60px",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: transactionDate,
      },
      yaxis: {
        title: {
          text: "Rupees",
        },
      },
      fill: {
        opacity: 1,
      },
      title: {
        text: "All Transactions",
        align: "left",
        margin: 40,
        floating: true,
        style: {
          fontSize: "1rem",
          fontWeight: "500",
          fontFamily: "poppins",
          color: "#212121",
          lineHeight: "1.2",
          marginBottom: "50px !important",
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "Rupees " + val;
          },
        },
      },
    },
  };

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
