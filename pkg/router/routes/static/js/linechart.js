var chart = echarts.init(document.getElementById('chart'), 'dark')
var json = '{{ .Data }}'
var data = JSON.parse(json)
var series = {
    data: [],
    type: 'line',
    smooth: false,
    symbol: 'none',
    zlevel: 1,
    z: 1
}
Object.values(data.Batteries).forEach((battery) => {
    series.data.push([battery.Time, battery.Load])
})

var option = {
    backgroundColor: '#343a40',
    tooltip: {
        confine: true,
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%']
        },
        valueFormatter: (value) => {
            return value + '%'
        }
    },
    grid: {
        left: '10%',
        right: '5%'
    },
    xAxis: {
        type: 'time',
        splitNumber: 3
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: function (value, index) {
                return value + '%'
            }
        }
    },
    dataZoom: [
        {
            type: 'slider',
            start: 0,
            end: 100
        },
        {
            start: 0,
            end: 100
        }
    ],
    series: [series]
}

option && chart.setOption(option)

window.onload = function () {
    if (window.screen.width < 600) {
        chart.resize({
            width: document.getElementById('chart').width,
            height: document.getElementById('chart').width
        })
    }
}

window.onresize = function () {
    chart.resize()
    if (window.screen.width < 600) {
        chart.resize({
            width: document.getElementById('chart').width,
            height: document.getElementById('chart').width
        })
    }
}
