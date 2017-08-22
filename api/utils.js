let statWords = (matchedWords) => {
  return matchedWords.reduce((stats, word) => {
    if (stats.hasOwnProperty(word)) {
      stats[word] = stats[word] + 1;
    } else {
      stats[word] = 1;
    }
    return stats;
  }, {});
};

const sortObject = (obj) => {
  var sortable = [];
  for (var word in obj) {
    sortable.push([word, obj[word]]);
  }

  return sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
};

module.exports = { statWords, sortObject };
