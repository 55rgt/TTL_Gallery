function FilterReceiver(originalText){

    let filter = new Filter(originalText);
    let tags = [];
    let min = 0;
    let max = 10000;
    let filterJson = {};


    this.getFilter = function () {
        return filter;
    };

    this.setTags = function (names) {
        tags = names;
    };

    this.getTags = function () {
        return tags;
    };

    this.setValue = function (minValue, maxValue) {
        max = maxValue;
        min = minValue;
    };

    // 이벤트가 발생할 때 호출한다.
    this.setFilterJson = function () {

        filterJson["tags"] = tags;
        filterJson["min"] = min;
        filterJson["max"] = max;
    };

    this.getFilterJson = function () {

        return filterJson;
    };

    this.updateFilter = function () {
        this.setFilterJson();
        console.log(this.getFilterJson());
        filter.filterByTagNames(tags, false);
        filter.filterByNumberRange(min, max);
    };

    this.getFilteredData = function () {
        return filter.getCurrentData();
    };


}