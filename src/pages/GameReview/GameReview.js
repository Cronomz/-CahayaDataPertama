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
        onResizeWindow();
        window.addEventListener("resize", () => {
            onResizeWindow();
        })
        fetchData()
    }, [])

    useEffect(() => {
        // console.log("data: ", data);
    }, [data])

    useEffect(() => {
        // console.log("timeData: ", sortedDataTime);
    }, [sortedDataTime])

    useEffect(() => {
        // console.log("sources: ", sources);
    }, [sources])

    useEffect(() => {
        if (Object.keys(dataBySource).length && sources.length) {
            // Second Card
            setDataSourceSentiment(Constants.sentimentCounter(dataBySource[sources[chosenSource]]));

            // Third Card
            setDataSentimentAvgText(Constants.sourceSentimentAvgText(dataBySource[sources[chosenSource]]));

            // Fourth Card
            setSourcesSentimentByDay(Constants.sourceSentimentByDay(dataBySource[sources[chosenSource]]));
        }
    }, [chosenSource])

    useEffect(() => {
        // console.log("SourcesSentimentByDay: ", sourcesSentimentByDay)
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
    
    const onResizeWindow = () => {
        document.getElementsByClassName("game-review")[0].style.transform = `scale(${Math.min(1800, window.innerWidth)/1800})`;
        // document.getElementsByClassName("game-review")[0].style.marginTop = "-550px"
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
            setChosenSource(chosenSource - 1);
        } else {
            setChosenSource(sources.length - 1);
        }
    }

    return (
        <div className="game-review">
            <Card style={{boxShadow: cardShadow, minHeight: "800px", maxWidth: "1800px", width: "auto"}}>
                <div className="page-title">CDP Game Reviews</div>
                <div style={{display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center"}}>
                    {/* First Card */}
                    <Card style={{boxShadow: cardShadow, height: "min-content"}}>
                        <div className='chart-title'>
                            Total Review Sources
                        </div>
                        <CustomPieChart data={dataBySourceLength}/>
                    </Card>

                    {/* Second Card */}
                    <Card style={{boxShadow: cardShadow, height: "min-content"}}>
                        <div className='chart-title'>
                            {sources[chosenSource]} Review Sentiments
                        </div>
                        <div style={{display: "flex", alignItems: 'center'}}>
                            <div className='left-btn-img' onClick={onClickLeftSource} >
                                <img src='assets/icons/left-arrow.png'/>
                            </div>
                            <CustomPieChart width={360} data={dataSourceSentiment}/>
                            <div className='' onClick={onClickRightSource}>
                                <img className='right-btn-img' src='assets/icons/left-arrow.png'/>
                            </div>
                        </div>
                    </Card>

                    {/* Third Card */}
                    <Card style={{boxShadow: cardShadow, height: "min-content"}}>
                        <div className='chart-title'>
                            Average Words in {sources[chosenSource]} Review
                        </div>
                        <CustomBarChart data={dataSentimentAvgText} 
                                        width={500}
                                        xDataKey={["Positive", "Negative", "Neutral"]}
                        />
                    </Card>
                    
                    {/* Fourth Card */}
                    <Card style={{boxShadow: cardShadow, height: "min-content"}}>
                        <div className='chart-title'>
                            {sources[chosenSource]} Sentiments Review by Day
                        </div>
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
