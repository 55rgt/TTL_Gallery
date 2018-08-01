(function () {

    let fs = require('fs');

    fs.readFile('../public/data/gallery.csv', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        let dataManager = new DataManager(data, true, "#");
        dataManager.preprocess();
        dataManager.toJSON();
        dataManager.saveJSON('../public/data/gallery.json');
    });

    function DataManager(dataFile, dataHeader, dataDelimiter) {

        let that = this;
        this.dataState = [];
        this.dataHeader = dataHeader;
        this.dataDeimiter = dataDelimiter;
        this.JSONList = [];
        this.JSONData = '';
        this.lines = dataFile.split("\n");
        this.delimiters = that.lines[0].split(",");
        this.startLineIndex = dataHeader ? 1 : 0;

        this.preprocess = function () {

            for (let i = 0; i < that.delimiters.length; i++) that.dataState.push(false);
            for (let i = 0; i < that.delimiters.length; i++) {
                for (let j = that.startLineIndex; j < that.lines.length; j++) {
                    if (that.lines[j].split(",")[i].includes(dataDelimiter)) {
                        that.dataState[i] = true;
                        break;
                    }
                }
            }

        };

        this.toJSON = function () {


            for (let i = that.startLineIndex; i < that.lines.length; i++) {



                let line = that.lines[i];
                let obj = {};

                obj['index'] = that.startLineIndex === 0 ? i + 1 : i;

                for (let j = 0; j < that.dataState.length; j++) {
                    let element = line.split(",")[j].trim();

                    if (that.dataState[j]) {
                        let arr = [];
                        let elements = element.split(that.dataDeimiter);
                        elements.forEach(function (e) {
                            arr.push(e);
                        });
                        if (that.dataHeader) obj[that.delimiters[j].trim()] = arr;
                        else obj[('header_' + j)] = arr;
                    }
                    else {
                        if (that.dataHeader) obj[that.delimiters[j].trim()] = element;
                        else obj[('header_' + j)] = element;
                    }
                }
                that.JSONList.push(obj);
            }
            that.JSONData = JSON.stringify(that.JSONList, undefined, 4);
        };

        this.saveJSON = function (path) {
            fs.writeFile(path, that.JSONData, function () {
                console.log("저장 완료");
            });
        }
    }
})();
