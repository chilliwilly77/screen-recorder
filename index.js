const group = arr => ({
  by: prop => {
    let res = {};
    arr.forEach(i => {
      const val = i[prop];
      if (res[val]) res[val].push(i);
      else res[val] = [i];
    });
    return res;
  }
});
const filterAge = (from, to) => ({age}) => age > from && age < to;
const filter30to40GroupedByGender = people => group(people.filter(filterAge(30, 40))).by('gender');

const people = [
  {name: 'me', gender: 'm', age: 31},
  {name: 'me', gender: 'm', age: 30},
  {name: 'me', gender: 'f', age: 39},
  {name: 'me', gender: 'm', age: 40},
  {name: 'me', gender: 'm', age: 39},
  {name: 'me', gender: 'f', age: 39},
  ];
console.info(filter30to40GroupedByGender(people));
