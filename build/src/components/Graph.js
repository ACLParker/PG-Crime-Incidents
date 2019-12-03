import React from 'react';
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends React.Component {

    render() {

        /* Filter data for crime incidents that happened in September */
        let data = this.props.json.filter(e=>new Date(e.date).getYear() == this.props.num);
        if(this.props.month_num < 12){
            data = this.props.json.filter(e=>new Date(e.date).getYear() == this.props.num && new Date(e.date).getMonth() == this.props.month_num);
        }

        /* Multiple variable assignment for counters of crime incidents */
        let accident, assault, auto, be, homicide, robbery, sexOffense, theft, vandalism;
        accident = assault = auto = be = homicide = robbery = sexOffense = theft = vandalism = 0;

        /* Regex match string: ^[A-Z]+ */
        /* Find total of each crime incident in data */
        data.forEach(function(item){
            if(item.clearance_code_inc_type.startsWith("ACCIDENT")){
                accident += 1;
            } else if (item.clearance_code_inc_type.startsWith("ASSAULT")){
                assault += 1;
            } else if (item.clearance_code_inc_type.startsWith("AUTO")){
                auto += 1;
            } else if (item.clearance_code_inc_type.startsWith("B & E")){
                be += 1;
            } else if (item.clearance_code_inc_type.startsWith("HOMICIDE")){
                homicide += 1;
            } else if (item.clearance_code_inc_type.startsWith("ROBBERY")){
                robbery += 1;
            } else if (item.clearance_code_inc_type.startsWith("SEX")){
                sexOffense += 1;
            } else if (item.clearance_code_inc_type.startsWith("THEFT")){
                theft += 1;
            } else if (item.clearance_code_inc_type.startsWith("VANDALISM")){
                vandalism += 1;
            }
        });

        CanvasJS.addColorSet("sunsetShades",
        [//colorSet Array

        "#003f5c",
        "#2f4b7c",
        "#665191",
        "#a05195",
        "#d45087",
        "#f95d6a",
        "#ff7c43",
        "#ffa600",
        "#ffd100"
    ]);

        /* Canvas JS Graph variables */
		const options = {
            height: 500,
            colorSet: "sunsetShades",
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", //"light1", "light2", "dark1", "dark2"
			title:{
				text: this.props.month + " Crime Incidents in " + this.props.year
			},
			data: [{
				type: "column", //change type to bar, line, area, pie, column etc
				//indexLabel: "{y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
				dataPoints: [
					{ label: "ACCIDENT", y: accident },
					{ label: "ASSAULT", y: assault },
					{ label: "AUTO", y: auto },
                    { label: "B&E", y: be },
                    { label: "HOMICIDE", y: homicide},
					{ label: "ROBBERY", y: robbery },
					{ label: "SEX OFFENSE", y: sexOffense },
					{ label: "THEFT", y: theft },
					{ label: "VANDALISM", y: vandalism }
				]
			}]
		}
		
		return (
		<div className="graph-div">
			<CanvasJSChart options = {options} 
                /* onRef={ref => this.chart = ref} */
            />
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default Graph;