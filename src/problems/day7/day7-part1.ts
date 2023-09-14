import { readFileToString } from "../../utilities";

import Graph from "graphology";
import { allSimplePaths } from "graphology-simple-path";

const filepath = "src/data/day7/day7-data.txt";
const testFilepath = "src/data/day7/day7-dataTEST.txt";

const KEYS: string[] = [];

function getData(filepath: string) {
  return readFileToString(filepath).split("\r\n");
}

export function solveD7P1() {
  const bags = extractPatterns(getData(filepath));
  bags.forEach((bag) => KEYS.push(bag[0]));
  const graph = buildGraph(bags);
  const answer = traverse(graph);
  console.log(answer);
  return answer;
}

function traverse(graph: Graph) {
  const destinationKey = "shiny gold";
  let count = 0;

  for (const key of KEYS) {
    if (key !== destinationKey) {
      if (allSimplePaths(graph, key, destinationKey).length !== 0) {
        count++;
      }
    }
  }
  return count;
}

// build graph of nodes and edges from parsed data;
function buildGraph(bags: string[][]) {
  const graph = new Graph({ multi: true, allowSelfLoops: false });

  for (const bag of bags) {
    for (const string of bag) {
      if (!graph.hasNode(string)) {
        graph.addNode(string);
      }
    }
    const key = bag[0];
    for (let i = 1; i < bag.length; i++) {
      graph.addEdge(key, bag[i]);
    }
  }
  return graph;
}

// extract all patterns from full data set.
function extractPatterns(data: string[]): string[][] {
  const patterns: string[][] = [];
  for (const input of data) {
    const pattern = extractPattern(input);
    if (pattern.length >= 1) {
      patterns.push(pattern);
    }
  }
  return patterns;
}

// use regex matching to extract the relevant information.
function extractPattern(input: string): string[] {
  const pattern: RegExp = /([a-z]+\s[a-z]+)\s|\b(\s+[a-z]+\s[a-z]+)\s/gi;

  const matches: RegExpMatchArray | null = input.match(pattern);

  if (matches) {
    return matches
      .map((match) => match.trim())
      .filter(
        (match) => match !== "" && match !== "bags contain" && match !== "no other"
      );
  } else {
    return [];
  }
}

/*
                        Dead end tree. Total depth = 3.
                                light red
                              /             \
                        bright white       muted yellow x2
                        /                 //                \\
                   shiny gold        shiny gold x2        faded blue x9
                                                                \
                                                              dead end



                              total depth = 3;
                                dark orange
                              /             \
                   bright white * 3       muted yellow x4
                        /                 //                \\
                   shiny gold        shiny gold x2        faded blue x9
                                                                \
                                                              dead end


                              total depth = 4;
                             ___shiny gold___
                         /                         \
               dark olive                     vibrant plum x2
              /          \                    /               \
      faded blue x3    dotted black x4   faded blue       dotted black
           /                 \                |                  \
      dead end            dead end        dead end             dead end






def countNodesLeadingToDestination(start_node, destination_node, visited, graph, memo):
    if start_node == destination_node:
        return 1

    if (start_node, destination_node) in memo:
        return memo[(start_node, destination_node)]

    visited.add(start_node)
    count = 0

    for child_node in graph[start_node]:
        if child_node not in visited:
            count += countNodesLeadingToDestination(child_node, destination_node, visited, graph, memo)
        else:
            # Handle cycles or infinite loops here
            pass

    visited.remove(start_node)
    memo[(start_node, destination_node)] = count
    return count

def nodesLeadingToDestinationCount(graph, destination_node):
    count_map = {}
    memo = {}

    for node in graph:
        visited = set()
        count = countNodesLeadingToDestination(node, destination_node, visited, graph, memo)
        count_map[node] = count

    return count_map

# Example graph (adjacency list representation)
graph = {
    'a': ['b', 'c'],
    'b': ['c', 'd'],
    'c': ['d'],
    'd': ['e', 'f'],
    'e': [],
    'f': []
}

destination_node = 'f'
result = nodesLeadingToDestinationCount(graph, destination_node)
print(result)

*/
