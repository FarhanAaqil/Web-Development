import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from '../components/Graph';

const Dashboard = () => {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/nodes/{userId}')
      .then(response => {
        setNodes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching nodes', error);
