function useExpenseTrendState(transactionDate, incomeData, expenseData) {
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
  return state;
}

export default useExpenseTrendState;
