
const graph = {
    A: { B: 4, C: 2 },      
    B: { A: 4, C: 5, D: 10 },  
    C: { A: 2, B: 5, D: 3 },
    D: { B: 10, C: 3 }
};

function dijkstra(graph, start) {
    // memoiriser les distances entre start node et toutes les autres nodes
    let distances = {};

    // garder la trace de nodes visited
    let visited = new Set();

    // Get all the nodes of the graph
    let nodes = Object.keys(graph);

    // determiner la distance la plus courte pour chaque node
    for (let node of nodes) {
        distances[node] = Infinity;
    }
    
    // condition : la distance entre start node a elle meme est egale a zero 
    distances[start] = 0;

    // faire les boucles juqua que tout les nodes soit vistés
    while (nodes.length) {
        // triage de nodes selon la distance
        nodes.sort((a, b) => distances[a] - distances[b]);
        let closestNode = nodes.shift();

        // verification si la distance p etre a linfini et faire break
        if (distances[closestNode] === Infinity) break;

        // Mark the chosen node as visited
        visited.add(closestNode);

        // For each neighboring node of the current node
        for (let neighbor in graph[closestNode]) {
            // If the neighbor hasn't been visited yet
            if (!visited.has(neighbor)) {
                // Calculate tentative distance to the neighboring node
                let newDistance = distances[closestNode] + graph[closestNode][neighbor];
                
                // If the newly calculated distance is shorter than the previously known distance to this neighbor
                if (newDistance < distances[neighbor]) {
                    // Update the shortest distance to this neighbor
                    distances[neighbor] = newDistance;
                }
            }
        }
    }

    // Return la distance la plus courte du nœud de départ à tous les nodes
    return distances;
}

// Example asked in the checkpoint to find shortest distances from node A to all other nodes in the graph
console.log(dijkstra(graph, "A")); 

// trying to find shortest distances from the other nodes to all other nodes in the graph
console.log(dijkstra(graph, "B"));
console.log(dijkstra(graph, "C")); 
console.log(dijkstra(graph, "D"));