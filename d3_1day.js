/**
 * Created by skaymen on 6/12/2017.
 */
"use strict";

d3.json("1day.json", function(err,data) {
    console.log("data length: ",data.length);

    var times = ["time"];
    var values = ["discharge"];
    //for holding x and y axis values, respectively. In C3, the first value in the list
    //of data is the "title" of that set of data

    for (var i=0; i<data.length; i++) {

        times.push(data[i]["dateTime"].slice(11,19));
        //take only the time (since we are only using 1 day of data

        values.push(data[i]["value"]);
        //fill data for y axis
    }

    var chart = c3.generate({
        //generate chart using c3

        bindto: '#chart',
        //bind to char div

        data: {
            type: "spline",
            //this type of chart has curvier lines

            selection: {
                draggable: true
            },
            //make it draggable

            xFormat: '%H:%M:%S',
            //format time
            x: "time",
            //select value for x axis

            columns: [
                times,values
            ],

            colors: {
                // discharge: '#ff0000'
            }
        },

        axis : {

            //set up x axis
            x : {
                type : 'timeseries',
                tick: {
                    format: '%H:%M:%S'
                    //format: '%Y' // format string is also available for timeseries data
                },
                label: {
                    text: "Time",
                    position: "outer-center"
                    //set and position x label
                }
            },

            y: {
                label: {
                    text: "cubic feet per second",
                    position: "outer-middle"
                    //set and position y label
                }

            }
        },

        //enable zoom
        // zoom: {
        //     enabled: true
        // },

        //turn on the subchart
        subchart: {
            show: true
        }


    });

    // test out different transformations
    setTimeout(function () {
        chart.transform('scatter');
    }, 2000);

    setTimeout(function () {
        chart.transform('area-spline');
    }, 4000);

    setTimeout(function () {
        chart.transform('bar', 'discharge');
    }, 6000);

    setTimeout(function () {
        chart.transform('spline', 'discharge');
    }, 8000);

});