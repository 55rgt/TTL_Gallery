function FilterReceiver(originalText){

    let filter = new Filter(originalText);
    let tags;
    let min;
    let max;
    let filterJson;


    this.setTags = function (names) {
        tags = names;
    };

    this.setValue = function (minValue, maxValue) {
        max = maxValue;
        min = minValue;
    };

    // 이벤트가 발생할 때 호출한다.
    this.setFilterJson = function () {

        filterJson.tags = tags;
        filterJson.min = min;
        filterJson.max = max;
    };

    this.updateFilter = function () {
        this.setFilterJson();
        filter.filterByTagNames(tags, false);
        filter.filterByNumberRange(min, max);
    };

    this.getFilteredData = function () {
        return this.filter.getCurrentData();
    };


}