
url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"



d3.json(url).then(function(data) {
  console.log(data);
});


function init() {

    
    let dropdownMenu = d3.select("#selDataset");

    
    d3.json(url).then((data) => {
        
        
        let names = data.names;

        
        names.forEach((id) => {

            
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        
        let sample_one = names[0];

        
        console.log(sample_one);

    
        createMetadata(sample_one);
        createBarChart(sample_one);
        createBubbleChart(sample_one);


    });
};

function optionChanged(value) {
    { 

    
    console.log(value); 

    
    createMetadata(value);
    createBarChart(value);
    createBubbleChart(value);
};
    
}



function createMetadata(sample) {

    
    d3.json(url).then((data) => {

        
        let metadata = data.metadata;

        
        let value = metadata.filter(result => result.id == sample);

        
        console.log(value)

        
        let valueData = value[0];

        
        d3.select("#sample-metadata").html("");

        
        Object.entries(valueData).forEach(([key,value]) => {

            
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};


function createBarChart(sample) {
    
    d3.json(url).then((data) => {
        
        let bardata = data.samples 
        
        let barArray = bardata.filter(sampleObject => sampleObject.id == sample);
        
        let result = barArray[0];
        
        let sample_values = result.sample_values;
        let otu_ids = result.otu_ids
        let otu_labels = result.otu_labels

        
        let yticks = otu_ids.slice(0,10). map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        
        let trace1 = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
            
        };
        
        
        let layout = {
            title: 'Top 10 OTUs per Individual',
            showlegend: false,
            yaxis: {title: 'OTU (Operational Taxonomic Unit) ID' }  
        };
        
        Plotly.newPlot("bar", [trace1], layout)
    });
};


function createBubbleChart(sample) {

    
    d3.json(url).then((data) => {
        
        
        let bubbleData = data.samples;

        
        let bubbleArray = bubbleData.filter(sampleObject => sampleObject.id == sample);
        let result = bubbleArray[0];

        
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        

        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Picnic"
            }
        };


        let layout = {
            title: "Bacteria Culture Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };


        Plotly.newPlot("bubble", [trace1], layout)
    });

};
init();