function useCategoryDonutState(transactionCategory, donutAmount) {
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
        position: "right",
      },
      title: {
        text: "Category-wise transactions",
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
      responsive: [
        {
          breakpoint: 992,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  return donutState;
}

export default useCategoryDonutState;
