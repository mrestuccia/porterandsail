class Recommendations {
  constructor(obj) {
    this.tags = obj.tags;
    this.places = obj.places;

    this.stats = {};
    this.sorted = [];

    this.statsLocations = {};
    this.locations = [];

    //Initial Methods
    this.stats = this._statWords(this.tags);
    this.sorted = this._sortObject(this.stats);
  }


  // Private
  // Create an object of words and frequency
  _statWords(tags) {
    return tags.reduce((stats, word) => {
      if (stats.hasOwnProperty(word)) {
        stats[word] = stats[word] + 1;
      } else {
        stats[word] = 1;
      }
      return stats;
    }, {});
  }

  // Sort the object this.stats returning
  // an array of sorted words and frequency
  _sortObject(stats) {
    let sorted = [];
    for (let word in stats) {
      sorted.push([word, stats[word]]);
    }

    return sorted.sort(function (a, b) {
      return b[1] - a[1];
    });
  }


  // Public
  // Getters
  getSortedTags() {
    return this.sorted.map(item => item[0]);
  }

  getTags() {
    return this.tags;
  }

  getSorted() {
    return this.sorted;
  }

  getPlaces() {
    return this.places;
  }

  getHotelPlaces() {
    return this.locations.map(item => item[0]);
  }

  // Setters
  setHotelPLaces(JsonPlaces) {
    let arrNames = JsonPlaces.map(item => {
      return item[0].place.name;
    });

    this.statsLocations = this._statWords(arrNames);

    this.locations = this._sortObject(this.statsLocations);
  }
}


module.exports = Recommendations;
