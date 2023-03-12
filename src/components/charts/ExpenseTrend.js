import React, { useEffect, useContext, useState } from "react";
import ReactApexChart from "react-apexcharts";
import db from "../../firebase/firebase";
import { UserContext } from "../../context/Context";

function ExpenseTrend() {
  const user = useContext(UserContext);

  const [transactionDate, setTransactionDate] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

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
        const incomeByMonth = dbData.reduce((acc, transaction) => {
          const date = new Date(transaction.date.seconds * 1000);
          const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
          if (transaction.type === "income") {
            acc[month] = (acc[month] || 0) + transaction.amount;
          } else if (!acc[month]) {
            acc[month] = 0;
          }
          return acc;
        }, {});

        setIncomeData(Object.values(incomeByMonth));

        const expenseByMonth = dbData.reduce((acc, transaction) => {
          const date = new Date(transaction.date.seconds * 1000);
          const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
          if (transaction.type === "expense") {
            acc[month] = (acc[month] || 0) + transaction.amount;
          } else if (!acc[month]) {
            acc[month] = 0;
          }
          return acc;
        }, {});

        setExpenseData(Object.values(expenseByMonth));
      });
    //eslint-disable-next-line
  }, []);

  let state = {
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
      title: {
        text: "Cash Flow Trend",
        align: "left",
      },
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: transactionDate,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
    },
  };

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
