const Constants = {
    gameReviewAPI: "https://ivanbudianto.github.io/test-json/test.json",
    sentiment: {
        "Positive": 1,
        "Neutral": 0,
        "Negative": -1
    },
    partitionBy: (data, partition) => {
        let tempData = {};
        let keys = []
        data.forEach((element) => {
            if (keys.indexOf(element[partition]) == -1) {
                keys.push(element[partition]);
                tempData[element[partition]] = [element];
            } else {
                tempData[element[partition]].push(element);
            }
        });
        return tempData;
    },
    sentimentCounter: (data) => {
        let tempData = [];
        let sentiments = [];
        data.forEach((e, index) => {
            let indexOf = sentiments.indexOf(e.sentiment);
            if(indexOf == -1) {
                sentiments.push(e.sentiment);
                tempData.push({name: e.sentiment, value: 1});
            } else {
                tempData[indexOf] = {name: e.sentiment, value: (tempData[indexOf].value+1)}
            }
        });
        return tempData;
    },
    sourceSentimentAvgText: (data) => {
        let tempData = [];
        let sentiments = [];
        data.forEach((e, index) => {
            let indexOf = sentiments.indexOf(e.sentiment);
            if(indexOf == -1) {
                sentiments.push(e.sentiment);
                tempData.push({name: e.sentiment, numSentiment: 1, numWord: Constants.textWordCounter(e.full_text)});
            } else {
                tempData[indexOf] = {name: e.sentiment, numSentiment: (tempData[indexOf].numSentiment+1), numWord: (tempData[indexOf].numWord + Constants.textWordCounter(e.full_text))}
            }
        });
        tempData.forEach((e, index) => {
            tempData[index] = {name: e.name, value: (e.numWord/e.numSentiment)}
        })

        console.log("avg text", tempData);
        return tempData;
    },

    sourceSentimentByDay: (data) => { // data has to be already sorted by time
        let curDate = new Date(0);
        let dataCurDate = [];
        let tempData = [];

        for (let i = 0; i < data.length; i++) {
            let datei = new Date(data[i].timestamp);
            if (datei.getDate() == curDate.getDate()) {
                dataCurDate.push(data[i]);
            } else {
                let sentimentsCount = Constants.sentimentCounter(dataCurDate);
                let tempCurData = {};
                tempCurData.timestamp = data[i].timestamp;
                sentimentsCount.forEach((e, index) => {
                    tempCurData[e.name] = e.value;
                })
                tempData.push(tempCurData);
                curDate = datei;
                dataCurDate = [];
                dataCurDate.push(data[i]);
            }
        }

        tempData.forEach((e, index) => {
            if (e.Positive == null) {
                e.Positive = 0;
            }
            if (e.Negative == null) {
                e.Negative = 0;
            }
            if (e.Neutral == null) {
                e.Neutral = 0;
            }
        })

        return tempData;
    },

    timestampToDate: (time) => {
        let date = new Date(time)
        return [date.getFullYear() + "-" + ((date.getMonth()+1) < 10?"0":"") + (date.getMonth()+1) + "-" + (date.getDate() < 10? "0": "") + date.getDate()];
    },

    textWordCounter: (text) => {
        if (text) {
            return text.split(" ").length+1;
        } else {
            return 0;
        }
    }

}

export default Constants;