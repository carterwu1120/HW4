// ref : https://github.com/ShapeLab/ZooidsCompositePhysicalizations/blob/master/Zooid_Vis/bin/data/student-dataset.csv?plain=1
//       https://raw.githubusercontent.com/ShapeLab/ZooidsCompositePhysicalizations/master/Zooid_Vis/bin/data/student-dataset.csv

// get data
d3.csv("https://raw.githubusercontent.com/ShapeLab/ZooidsCompositePhysicalizations/master/Zooid_Vis/bin/data/student-dataset.csv").then(
    res=>{
        console.log(res);
        drawScatterChart(res);
        drawPieChart(res);
        drawBarChart(res);
    }
)
function finMax(res, suject){
    let max = 0;
    for(let x = 0; x < res.length; x++){
        if(max < res[x][suject])
            max = res[x][suject];
    }
    return max;
}
function finMin(res, suject){
    let min = 1e9;
    for(let x = 0; x < res.length; x++){
        if(min > res[x][suject])
            min = res[x][suject];
    }
    return min;
}
function setting_trace_x(trace1, min, max){
    trace1.x = [];
    for(let i = min*10; i<max*10; i++){
        trace1.x[i-min*10] = i;
    }
    return trace1.x;
}
function setting_trace_y(trace1, min, max){
    trace1.y = [];
    for(let i = min*10; i<max*10; i++){
        trace1.y[i-min*10] = 0;
    }
    return trace1.y;
}
function drawScatterChart(res){
    let myGraph1 = document.getElementById('myGraph1');
    let max = 0;
    let min = 0;

    let trace1 = {};
    trace1.mode = "lines+markers";
    trace1.type = "scatter";
    trace1.name = "english grade"
    trace1.x = [];
    trace1.y = [];
    max = finMax(res, 'english.grade');
    min = finMin(res, 'english.grade')
    trace1.x = setting_trace_x(trace1, min, max);
    trace1.y = setting_trace_y(trace1, min, max);
    for(let x = 0; x < res.length; x++){
        trace1.y[res[x]['english.grade']*10-min*10] += 1;
    }
    trace1.domain = {
        row:0,
        column:0
    };

    let trace2 = {};
    trace2.mode = "lines+markers";
    trace2.type = "scatter";
    trace2.name = "math grade"
    trace2.x = [];
    trace2.y = [];
    max = finMax(res, 'math.grade');
    min = finMin(res, 'math.grade')
    trace2.x = setting_trace_x(trace2, min, max);
    trace2.y = setting_trace_y(trace2, min, max);
    for(let x = 0; x < res.length; x++){
        trace2.y[res[x]['math.grade']*10-min*10] += 1;
    }
    trace2.domain = {
        row:0,
        column:1
    };

    let trace3 = {};
    trace3.mode = "lines+markers";
    trace3.type = "scatter";
    trace3.name = "sciences grade"
    trace3.x = [];
    trace3.y = [];
    max = finMax(res, 'sciences.grade');
    min = finMin(res, 'sciences.grade')
    trace3.x = setting_trace_x(trace3, min, max);
    trace3.y = setting_trace_y(trace3, min, max);
    for(let x = 0; x < res.length; x++){
        trace3.y[res[x]['sciences.grade']*10-min*10] += 1;
    }
    trace3.domain = {
        row:1,
        column:0
    };

    let data =[];
    data.push(trace1);
    data.push(trace2);
    data.push(trace3);
    let layout = {
        margin:{
            t:10,
            l:0,
        }
        
    }
    Plotly.newPlot(myGraph1, data, layout);
}
function drawPieChart(res){
    let myGraph2 = document.getElementById('myGraph2');
    let trace1 = {};
    trace1.type = "pie";
    trace1.title = "the ratio of male to female"
    trace1.labels = ['男生', '女生'];
    trace1.values = [0, 0];
    trace1.hole = 0.5;
    for (let x=0; x<res.length; x++){
        if(res[x]['gender']=='M'){
            trace1.values[0]+=1;
        }
        else{
            trace1.values[1] +=1;
        }
    }

    let data = [];
    data.push(trace1);
    let layout = {
        margin:{
            t:10,
            l:0,
        },
        grid:{
            rows:2,
            columns:2
        }
    }
    Plotly.newPlot(myGraph2, data, layout);
}
function drawBarChart(res){
    let myGraph3 = document.getElementById('myGraph3');
    let trace1 = {};
    trace1.type = "bar";
    trace1.title  = "age"
    let max = 0;
    let min = 1e9;
    trace1.x = [];
    trace1.y = [];
    for(let x = 0; x < res.length; x++){
        if(max < res[x]['age'])
            max = res[x]['age'];
        if(min > res[x]['age'])
            min = res[x]['age']
    }
    for(let i = min; i<max; i++){
        trace1.x[i-min] = i;
        trace1.y[i-min] = 0;
    }
    for(let x = 0; x < res.length; x++){
        trace1.y[res[x]['age']-min] += 1;
    }
    trace1.text = trace1.y;
    let data =[];
    data.push(trace1);
    let layout = {
        margin:{
            t:0
        },
    };
    Plotly.newPlot(myGraph3, data, layout);
}