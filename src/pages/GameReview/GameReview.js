import './GameReview.css';
import { useEffect, useState } from 'react';
import Constants from '../../Global';
import Chart from '../../components/Chart/Chart';
import CustomPieChart from '../../components/PieChart/CustomPieChart';
import Card from '../../components/Card/Card';
import CustomBarChart from '../../components/BarChart/CustomBarChart';

const cardShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";

function GameReview(props) {
    
    const [fetching, setFetching] = useState(false);

    const [data, setData] = useState([]);
    const [sortedDataTime, setSortedDataTime] = useState([]);

    const [sources, setSources] = useState([]);
    const [dataBySource, setDataBySource] = useState({});

    const [dataBySourceLength, setDataBySourceLength] = useState([]);

    const [chosenSource, setChosenSource] = useState(0);
    const [dataSourceSentiment, setDataSourceSentiment] = useState([]);

    const [dataSentimentAvgText, setDataSentimentAvgText] = useState([]);

    const [sourcesSentimentByDay, setSourcesSentimentByDay] = useState([]);


    useEffect(()=> {
        fetchData()
    }, [])

    useEffect(() => {
        console.log("data: ", data);
    }, [data])

    useEffect(() => {
        console.log("timeData: ", sortedDataTime);
        if (sortedDataTime[0]) {
            console.log("month0: ", (new Date(sortedDataTime[0].timestamp)).getMonth(), (new Date(sortedDataTime[0].timestamp)))
            console.log("month1: ", (new Date(sortedDataTime[9999].timestamp)).getMonth(), (new Date(sortedDataTime[9999].timestamp)))
        }
    }, [sortedDataTime])

    useEffect(() => {
        console.log("sources: ", sources);
    }, [sources])

    useEffect(() => {
        console.log("change", dataBySource, sources)
        if (Object.keys(dataBySource).length && sources.length) {
            console.log("change")
            // Second Card
            setDataSourceSentiment(Constants.sentimentCounter(dataBySource[sources[chosenSource]]));

            // Third Card
            setDataSentimentAvgText(Constants.sourceSentimentAvgText(dataBySource[sources[chosenSource]]));

            // Fourth Card
            setSourcesSentimentByDay(Constants.sourceSentimentByDay(dataBySource[sources[chosenSource]]));
        }
    }, [chosenSource])

    useEffect(() => {
        console.log("SourcesSentimentByDay: ", sourcesSentimentByDay)
    }, [sourcesSentimentByDay])

    const fetchData = () => {
        let url = Constants.gameReviewAPI;

        setFetching(true);
        fetch(url, {
            method: "GET",
        })
        .then(async (res) => {
            res = await res.json();
            setFetching(false);
            setData(res);
            let sortRes = [...res];
            sortRes.sort((a, b) => {return a.timestamp-b.timestamp});
            setSortedDataTime(sortRes);
            // setFiles(res.results);
            // console.log(res)
            let partitionBySource = Constants.partitionBy(sortRes, "source");
            setDataBySource(partitionBySource);
            setSources(Object.keys(partitionBySource));

            // First Card
            let tempDataBySourceLength = []
            Object.keys(partitionBySource).forEach(function(e, index) {
                tempDataBySourceLength.push({name: e, value: partitionBySource[e].length})
            })
            setDataBySourceLength(tempDataBySourceLength);

            // Second Card
            setDataSourceSentiment(Constants.sentimentCounter(partitionBySource[Object.keys(partitionBySource)[chosenSource]]));

            // Third Card
            setDataSentimentAvgText(Constants.sourceSentimentAvgText(partitionBySource[Object.keys(partitionBySource)[chosenSource]]));

            // Fourth Card
            setSourcesSentimentByDay(Constants.sourceSentimentByDay(partitionBySource[Object.keys(partitionBySource)[chosenSource]]));
        })
    }
    

    const onClickRightSource = () => {
        if (chosenSource < sources.length - 1) {
            setChosenSource(chosenSource+1);
        } else {
            setChosenSource(0);
        }
    }

    const onClickLeftSource = () => {
        if (chosenSource > 0) {
            setChosenSource(chosenSource-1);
        } else {
            setChosenSource(sources.length - 1);
        }
    }

    return (
        <div className="game-review">
            <Card style={{boxShadow: cardShadow, minHeight: "800px", maxWidth: "1800px", width: "auto"}}>
                <div style={{marginBottom: "20px"}}>Game Reviews</div>
                <div style={{display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center"}}>
                    {/* First Card */}
                    <Card style={{boxShadow: cardShadow, height: "min-content"}}>
                        <div className='chart-title'>
                            Review Sources
                        </div>
                        <CustomPieChart data={dataBySourceLength}/>
                    </Card>

                    {/* Second Card */}
                    <Card style={{boxShadow: cardShadow, height: "min-content"}}>
                        <div className='chart-title'>
                            {sources[chosenSource]} Review
                        </div>
                        <div style={{display: "flex", alignItems: 'center'}}>
                            <div onClick={onClickLeftSource} ><img src='assets/icons/left-arrow.png'/></div>
                            <CustomPieChart width={360} data={dataSourceSentiment}/>
                            <div onClick={onClickRightSource}><img className='right-btn-img' src='assets/icons/left-arrow.png'/></div>
                        </div>
                    </Card>

                    {/* Third Card */}
                    <Card style={{boxShadow: cardShadow, height: "min-content"}}>
                        <div className='chart-title'>
                            {sources[chosenSource]} Review
                        </div>
                        <CustomBarChart data={dataSentimentAvgText} 
                                        width={500}
                                        xDataKey={["Positive", "Negative", "Neutral"]}
                        />
                    </Card>
                    
                    {/* Fourth Card */}
                    <Card style={{boxShadow: cardShadow, height: "min-content"}}>
                        <Chart data={sourcesSentimentByDay} 
                                yDataKey={["Positive", "Negative", "Neutral"]} 
                                labelY={`Number of ${sources[chosenSource]} Reviews`}
                                xAxisFormatter={Constants.timestampToDate}
                        />
                    </Card>

                    
                </div>
            </Card>
        </div>
    );
}

export default GameReview;
