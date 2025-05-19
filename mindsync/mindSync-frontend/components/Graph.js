import React, { useEffect } from "react";
import * as d3 from "d3";

const Graph = ({ nodes }) => {
  useEffect(() => {
    const width = 800,
      height = 600;
    const svg = d3.select("#graph").attr("width", width).attr("height", height);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink().id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .selectAll(".link")
      .data(nodes)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#999");

    const node = svg
      .append("g")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 10)
      .attr("fill", "#007bff");

    node.append("title").text((d) => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  }, [nodes]);

  return <svg id="graph"></svg>;
};

export default Graph;
