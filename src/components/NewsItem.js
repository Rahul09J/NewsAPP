import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
      let {title,description,imageURL,newsUrl} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
        <img src={imageURL?imageURL:"https://www.shutterstock.com/image-photo/coronavirus-breaking-news-headline-clippings-260nw-1699456762.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
