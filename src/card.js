import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Card(props) {
  const {image} = props

  return (
    <div className="card-container">
      {/* <img src={image.urls.regular} alt={image.alt_description} className="image"/> */}
      <LazyLoadImage
        src={image.urls.small}
        alt={image.alt_description}
        effect="blur"
      />
      <div className="caption">
        Photo by <a href={`https://unsplash.com/@${image.user.username}?utm_source=your_app_name&utm_medium=referral`} target="_blank" rel="noopener noreferrer">{image.user.name}</a> on <a href="https://unsplash.com/?utm_source=scroll-app&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a>
      </div>
    </div>
  )
}