import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {

    
    constructor() {
        super();
        this.state = {
            articles : [],
            loading : true,
            page:1
        }
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=6ad10884d56d4f26be278ffc685c234d&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles : parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    }

    handlenextClick=async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=6ad10884d56d4f26be278ffc685c234d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page+1,
            articles : parsedData.articles,
            loading:false
        })
    }

    handleprevClick=async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=6ad10884d56d4f26be278ffc685c234d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page-1,
            articles : parsedData.articles,
            loading:false
        })
    }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>NewsRush - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles?.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageURL={element.urlToImage} newsUrl={element.url} />
                        </div>
                        
            })}
        </div>

        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" onClick={this.handleprevClick} className="btn btn-dark">&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handlenextClick} className="btn btn-dark">Next &rarr;</button>
        </div>
        

      </div>
    )
  }
}

export default News
