/* eslint-disable @typescript-eslint/no-explicit-any */

import { scaleBand, scaleLinear, axisBottom, axisLeft, max } from 'd3';
import {select, selectAll, Selection} from 'd3-selection'

export default class BarChart {
    private _data: Array<any>;
    private _width: number; 
    private _height: number;  

    constructor(data: Array<any>, width?: number, height?: number){ //debugger;
        this._data = data;
        this._width = width || 500; 
        this._height = height || 500;  
    }

    public generate(parent: any): Selection<any, any, any, any> {
        const padding = 20;
        const padLeft = 50; 

        const x = scaleBand()
            .rangeRound([0, this._width - padLeft])
            .padding(0.1);

        const y = scaleLinear()
            .rangeRound([this._height - padding, 0]);

        x.domain(this._data.map(d => d.Run).sort((a, b) => (a - b)));

        y.domain([0, max(this._data, d => d.Speed)]);

        parent.append("g")
            .attr('id', 'x-axis')
            .attr("transform", `translate(${padLeft}, ${this._height - padding})`)
            .call(axisBottom(x));

        parent.append("g")
            .attr('id', 'y-axis')
            .attr("transform", `translate(${padLeft}, 0)`)
            .call(axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Speed");

        parent.selectAll(".bar")
            .data(this._data)
            .enter().append("rect")
            .classed('bar', true)
            .attr("x", d => Number(x(d.Run)))
            .attr("y", d => y(Number(d.Speed)))
            .attr("width", x.bandwidth())
            .attr("height", d => (this._height - padding) - y(Number(d.Speed)))
            .attr("transform", `translate(${padLeft}, 0)`);

        return parent;
    }
}
