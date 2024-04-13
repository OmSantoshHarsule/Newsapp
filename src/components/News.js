import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';

export class News extends Component {
  constructor(){
    super();
    this.state= {
      articles: [],
      loading: true,
      page: 1
    }
  }
  
  async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=3618f597ab104388a7fff5ca64b8f6cd&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
  }
    handlePrevClick= async()=> {
    console.log("Previoss");
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=3618f597ab104388a7fff5ca64b8f6cd&page=${this.state.page -1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
    
  } 
    handleNextClick=async ()=>{
    console.log("NExtttt");
    if(this.state.page +1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
      let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=3618f597ab104388a7fff5ca64b8f6cd&page=${this.state.page +1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    })}

  }
  render() {
    return (
      <div className='container my-3'>
       <div className='container my-3'><h1>Exciting India - Top Headings</h1></div>
       {this.state.loading && <Loading/>}
       <div className="row">
       {this.state.articles.map((element)=>{
        return <div className="col-md-3" key={element.url}>
          <NewsItem title={!element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>
       })}
      </div>
      <div className="container d-flex justify-content-between">       
       <button disabled={this.state.page <= 1}type="button" className="btn btn-dark"onClick={this.handlePrevClick}>&larr; Pervious </button>
      <button   type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
       
    </div>
    )
    }
  }
export default News