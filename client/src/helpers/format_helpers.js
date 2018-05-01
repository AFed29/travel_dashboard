const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const prettyDate = function(date) {
  return stringDate = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}


module.exports = {
  prettyDate
};
