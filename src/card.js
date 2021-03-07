import React from 'react'

export default function Card({image}) {
    return (
      <div className="card-container">
        <img src={image.imageUrl} alt={image.altDescription} className="image"/>
        <div className="caption">
          Photo by <a href={`https://unsplash.com/@${image.username}?utm_source=your_app_name&utm_medium=referral`} target="_blank" rel="noopener noreferrer">{image.creatorName}</a> on <a href="https://unsplash.com/?utm_source=scroll-app&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a>
        </div>
      </div>
    )
}