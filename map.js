import { select, json, geoPath, geoEquirectangular } from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const projection = geoEquirectangular()
                            .scale(1800)
                            .translate([width / 1.8, height / 0.52])
const pathGenerator = geoPath().projection(projection);

const townSlider = document.getElementById('townSlider');
const townCountDisplay = document.getElementById('townCountDisplay');

// ReloadTowns function accepting the town count as a parameter
// The town count is accepted as an input by the ReloadTowns function
function reloadTowns(numberoftowns) {
    json('https://raw.githubusercontent.com/ONSvisual/topojson_boundaries/master/geogUKregion.json')  
    .then(data => {
        const cities = topojson.feature(data, data.objects.UKregionmerc);

   //console.log(data);
        const paths = svg.selectAll('path')
        .data(cities.features);
        paths.enter().append('path')
        .attr('class', 'cities')
        .attr('d', d=> pathGenerator(d));
    
    });
/*const zoom = d3.zoom()
    .scaleExtent([0.5, 5]) // Set the minimum and maximum zoom scale
    .on('zoom', zoomed);

svg.call(zoom);

function zoomed(event) {
    // Update the transform attribute of the SVG container to apply the zoom
    svg.attr('transform', event.transform);
}

    const zoomSettings = {
        duration: 1000,  // Transition duration in milliseconds
        ease: 'd3.easeCubicOut',  // Easing function (you can adjust this)
    };

    var zoomSettings = {
        duration: 1000,
        ease: d3.easeCubicOut,
        zoomLevel:5
    };
    const zoomLevel = 5;  // Adjust the zoom level as needed
    const x = 10;  // Adjust the x translation as needed
    const y = 5;  // Adjust the y translation as needed

// Apply the transition to the SVG element
svg.transition()
    .duration(zoomSettings.duration)
    .ease(zoomSettings.ease)
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + zoomLevel + ')translate(' + -x + ',' + -y + ')');
    function clicked (d) {
        var x;
        var y;
        var zoomLevel;
        if (d && centered !== d) {
            var centered = path.centroid(d);
            x = centroid [0];
            y = centroid [1];
            zoomLevel = zoomSettings.zoomLevel;
            centered = d;
        } else {
            x = width / 2;
            y = height / 2;
            zoomLevel = 1;
            centered = null;
        }
    }*/
    
//json("http://34.38.72.236/Circles/Towns/").then(function(townData) { // To have the townData on the map
    fetch(`http://34.38.72.236/Circles/Towns/${numberoftowns}`)
        .then(function(response){
            return response.json();

        })
        .then(function(townData) {
            svg.selectAll(".town-circle").remove();

        
            svg.selectAll(".town-circle").data(townData)
            .enter().append("circle")
            .attr("class", "town-circle")
            .attr("cx", function(d) {
                return projection([d.lng, d.lat])[0];
            })
            .attr("cy", function(d) {
                    
                return projection([d.lng, d.lat])[1];
            })
            .attr("r", 3) 
            .append('title')
            .text(function(d){
                return "County: " + d.County + "\nTown: " + d.Town + "\nPopulation: " + d.Population;
            }); 
            console.log(townData);
    })
}

// In order to continually alter the town count and reload the towns, add an event listener to the slider
buttonSlider.addEventListener('input', function() {
    const selectedValue = buttonSlider.value;
    buttonCountDisplay.textContent = selectedValue; // Modify the value that is shown
    reloadTowns(selectedValue); // Towns should be refreshed with the desired value
});

document.getElementById("reloadButton").addEventListener("click", function(d){
    svg.selectAll(".town-circle").remove();
    reloadTowns(buttonSlider.value);
});

// first loading of the towns
window.onload = function() {
    reloadTowns(50); // starting town count valuesvg.selectAll("circle")
};  


   

     