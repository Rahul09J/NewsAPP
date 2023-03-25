import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country:'in',
        pageSize:8,
        category:'general'
    }
    static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string

    }

    capatalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    constructor(props) {
        super(props);
        this.state = {
            articles : [],
            loading : true,
            page:1
        }
        document.title = `${this.capatalizeFirstLetter(this.props.category)}  - NewsRush`;
    }

    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles : parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    }
    async componentDidMount(){
        this.updateNews();
    }

    handlenextClick=async ()=>{
        this.setState({
            page: this.state.page+1,
        })
        this.updateNews();
    }

    handleprevClick=async ()=>{
        this.setState({
            page: this.state.page-1,
        })
        this.updateNews();
    }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>NewsRush - Top {this.capatalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles?.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageURL={element.urlToImage} newsUrl={element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name} />
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
