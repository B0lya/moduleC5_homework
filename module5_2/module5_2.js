const jsonString = `
{
  "list": [
    {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
    },
    {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
    }
  ]
}
`;

const result = {};
result.list = [];

const data = JSON.parse(jsonString);
const list = data.list;

for (let entry of list) {
  const person = {
    name: entry.name,
    age: Number(entry.age),
    prof: entry.prof
  }
  result.list.push(person);
}

console.log(result);