function dateClassPattern(date) {
  const [year] = date.split('-');
  return year;
}

function brasilianDate(date) {
  return date.split('-').reverse().join('/');
}

function americanDate(date) {
  return date.split('/').reverse().join('-');
}

export {
  brasilianDate,
  americanDate,
  dateClassPattern,
};
