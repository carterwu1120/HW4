// get data
d3.csv("https://raw.githubusercontent.com/ryanchung403/dataset/main/train_data_titanic.csv").then(
    res=>{
        console.log(res);
        drawBarChart(res);
        drawPieChart(res);
    }
)

function drawBarChart(res){
    let myGraph = document.getElementById('myGraph');
    let trace1 = {};
    trace1.type = "bar";
    trace1.x = ["S", "C", "Q"];
    trace1.y = [0, 0, 0];
   
    for (let x=0; x<res.length; x++){
        if(res[x]['Embarked']=='S'){
            trace1.y[0] +=1;
        }
        else if(res[x]['Embarked']=='C'){
            trace1.y[1] +=1;
        }
        else{
            trace1.y[2] += 1;
        }
    }
    let data =[];
    data.push(trace1);
    let layout = {
        margin:{
            t:0
        },
        barmode:'stack'
    };
    Plotly.newPlot(myGraph, data, layout);
}
function drawPieChart(res){
    let myGraph = document.getElementById('myGraph2');
    let trace1 = {};
    trace1.type = "pie";
    trace1.title = "男女比"
    trace1.labels = ['男生', '女生'];
    trace1.values = [0, 0];
    trace1.hole = 0.5;
    for (let x=0; x<res.length; x++){
        if(res[x]['Sex']=='male'){
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