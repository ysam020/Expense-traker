import React, { useEffect, useContext, useState } from "react";
import Chart from "react-apexcharts";
import db from "../../firebase/firebase";
import { UserContext } from "../../context/Context";

function DatewiseColumnChart() {
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

        const now = new Date();
        const currentMonthTimestamp =
          new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000;

        const filteredData = dbData.filter((item) => {
          const itemTimestamp = item.date.seconds;
          return itemTimestamp >= currentMonthTimestamp;
        });

        // set dates for chart
        let date = [];
        filteredData.map((res) => {
          return date.push(res.date.toDate().toLocaleDateString());
        });
        // remove duplicate dates
        let dateArray = [...new Set(date)];
        setTransactionDate(dateArray);

        const incomeByDate = {};
        const expenseByDate = {};

        // Categorize the data by date
        filteredData.forEach((entry) => {
          const dateStr = new Date(
            entry.date.seconds * 1000
          ).toLocaleDateString();
          if (dateArray.includes(dateStr)) {
            if (entry.type === "income") {
              incomeByDate[dateStr] =
                (incomeByDate[dateStr] || 0) + entry.amount;
            } else if (entry.type === "expense") {
              expenseByDate[dateStr] =
                (expenseByDate[dateStr] || 0) + entry.amount;
            }
          }
        });

        // Add entries for dates with no data
        dateArray.forEach((dateStr) => {
          if (!(dateStr in incomeByDate)) {
            incomeByDate[dateStr] = 0;
          }
          if (!(dateStr in expenseByDate)) {
            expenseByDate[dateStr] = 0;
          }
        });

        // Return the results as arrays
        const incomeArray = dateArray.map((dateStr) => incomeByDate[dateStr]);
        const expenseArray = dateArray.map((dateStr) => expenseByDate[dateStr]);

        setIncomeData(incomeArray);
        setExpenseData(expenseArray);
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
          columnWidth: "30%",
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
        text: "Transactions this month",
        align: "left",
        floating: true,
        margin: 40,
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

export default DatewiseColumnChart;
