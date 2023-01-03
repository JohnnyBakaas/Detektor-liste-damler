const fs = require("fs");

const zones = [
  {
    name: "A",
    xMax: -28599.046,
    xMin: -78254.357,
    yMax: 87604.17,
    yMin: 46604.17,
  },
  {
    name: "B",
    xMax: -21056.265,
    xMin: -28599.046,
    yMax: 87604.17,
    yMin: 46604.17,
  },
  {
    name: "C",
    xMax: 60711.576,
    xMin: 11056.265,
    yMax: 109105.931,
    yMin: 68105.931,
  },
  {
    name: "D",
    xMax: -152943.735,
    xMin: -193943.735,
    yMax: 46604.17,
    yMin: -3051.141,
  },
  {
    name: "E",
    xMax: -111943.735,
    xMin: -152943.735,
    yMax: 46604.17,
    yMin: -3051.141,
  },
  {
    name: "F",
    xMax: -70943.735,
    xMin: -111943.735,
    yMax: 46604.17,
    yMin: -3051.141,
  },
  {
    name: "G",
    xMax: -29943.735,
    xMin: -70943.735,
    yMax: 46604.17,
    yMin: -3051.141,
  },
  {
    name: "H",
    xMax: 11056.265,
    xMin: -29943.735,
    yMax: 46604.17,
    yMin: -3051.141,
  },
  {
    name: "I",
    xMax: 60711.576,
    xMin: 11056.265,
    yMax: 68105.931,
    yMin: 27105.931,
  },
  {
    name: "J",
    xMax: 60711.576,
    xMin: 11056.265,
    yMax: 27105.931,
    yMin: -13894.069,
  },
];

const checkZone = (cords) => {
  for (let i = 0; i < zones.length; i++) {
    if (cords.x > zones[i].xMin && cords.x < zones[i].xMax) {
      //console.log(zones[i].name);
      return zones[i].name;
    }
  }
};

fs.readFile("Table1.csv", "utf-8", (error, data) => {
  if (error) throw error;

  const lines = data.split("\n");
  const page = lines.map((line) => line.split(";"));

  const full = [];
  const missing = [];

  //console.log(page[1]);

  for (let i = 0; i < page.length; i++) {
    let wtf = page[i][2] == " ";
    if (!wtf) {
      //[ '"Count"', '"Name"', '"ID"', '"Position X"', '"Position Y"' ]
      //console.log(page[i][2], i);
      full.push({
        count: page[i][0],
        name: page[i][1],
        id: page[i][2],
        position: { x: page[i][3], y: page[i][4] },
      });
    }
  }

  for (let i = 0; i < full.length; i++) {
    checkZone(full[i].position);
    full[i].position = checkZone(full[i].position);
  }

  let csvString = "";

  for (let i = 0; i < full.length; i++) {
    csvString += full[i].count;
    csvString += ",";
    csvString += full[i].name;
    csvString += ",";
    csvString += full[i].id;
    csvString += ",";
    csvString += full[i].position;
    csvString += "\n";
  }

  fs.writeFile("file.csv", csvString, (error) => {
    if (error) throw error;
  });

  console.log(full);
});
