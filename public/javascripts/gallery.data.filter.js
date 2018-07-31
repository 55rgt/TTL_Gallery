(function () {

    let fs = require('fs');
    let _ = require('lodash');

    function Filter(originalText) {

        let that = this;

        this.original = JSON.parse(originalText);
        this.current = that.original;

        this.resetData = function(){
            this.current = this.deepCopy(this.original);
        };

        this.setCurrentData = function (data) {
            this.current = this.deepCopy(data);
        };

        this.getCurrentData = function () {
            return this.current;
        };

        /** consecutive
         * true: 필터링 된 데이터에 다시 필터링한다.
         * false: 원본 데이터에 필터링 한다. */
        /** 글자 단위로 검색 가능하게 만들었음. consecutive 인자가 없으면 true로 인식함 */
        this.filterByTagName = function (name, consecutive) {

            let data = arguments.length === 2 && !consecutive ? this.deepCopy(that.original) : this.deepCopy(that.current);
            data = _.filter(data, function(ele){ return ele.tags.some(elem => elem.includes(name)); });
            this.setCurrentData(data);
        };

        this.filterByNumberRange = function (min, max, consecutive) {

            let data = arguments.length === 2 && !consecutive ? this.deepCopy(that.original) : this.deepCopy(that.current);
            data = _.filter(data, function(ele){ return parseInt(ele.numberOfPeople) >= min && parseInt(ele.numberOfPeople) <= max; });
            this.setCurrentData(data);

        };

        /** 완전 복사. */
        this.deepCopy = function(data){
            return JSON.parse(JSON.stringify(data));
        }
    }



    fs.readFile('../data/gallery.json', 'utf8', function (err, data) {

        if (err) return console.log(err);
        let a = new Filter(data);

        a.filterByTagName('윤');
        a.filterByNumberRange(1, 10, true);
        console.log(a.getCurrentData());

    });



})();