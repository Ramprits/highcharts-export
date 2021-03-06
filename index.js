// /index.js

// 1. Import filesystem and Highcharts Export Server module
const fs = require("fs");
const chartExporter = require("highcharts-export-server");

// Initialize the exporter
chartExporter.initPool();
// Chart details object specifies chart type and data to plot

// Usually the same object that you use to configure your charts
// in the frontend. This will be used to specify the chart type
// and data to plot. I will use a bar chart, the same data
// specified in one of the official demonstrations in the HC website
let chartOptions = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Historic World Population by Region'
    },
    subtitle: {
        text: 'Source: Our Code World'
    },
    xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
    }, {
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6]
    }, {
        name: 'Year 2000',
        data: [814, 841, 3714, 727, 31]
    }, {
        name: 'Year 2016',
        data: [1216, 1001, 4436, 738, 40]
    }]
};

// Export chart using these options
chartExporter.export({
    type: "png",
    options: chartOptions,
    // By default the width of the chart images is of 600
    // In this case, we want a big image
    width: 1200
}, (err, res) => {
    // Get the image data (base64)
    let imageb64 = res.data;

    // Filename of the output. In this case, we will write the image
    // to the same directory of the initialization script.
    let outputFile = "./output-chart.png";

    // Save the image data to a file
    fs.writeFileSync(outputFile, imageb64, "base64", function (err) {
        if (err) console.log(err);
    });

    console.log("The chart has been succesfully generated!");

    chartExporter.killPool();
});
