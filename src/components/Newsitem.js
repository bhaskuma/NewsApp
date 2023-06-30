import React, { Component } from 'react'
export class Newsitem extends Component {
  
  render() {
    let {title,description,imageUrl,newsurl,date,author,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
        {/* <span className="position-absolute top-0 translate-middle badge rounded-pill" style={{left:'90%', zIndex:"1"}}>{source}</span> */}
        <span className="badge rounded-pill text-bg-danger">{source}</span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author? "Unkonown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} className="btn btn-sm btn-primary" target='_blank'>Read more</a>
          </div>
        </div>
      </div>
    )
  }
}


export default Newsitem
