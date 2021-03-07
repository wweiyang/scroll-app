import React, { useState, useRef, useCallback } from 'react'
import useGetImages from './useGetImages'

export default function App() {
  const [pageNumber, setPageNumber] = useState(1)

  const {
    images,
    hasMore,
    loading,
    error
  } = useGetImages(pageNumber)

  const observer = useRef()
  const lastImageElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const Post = ({image}) => {
    return (
      <div className="post-container">
        <img src={image.imageUrl} alt="" className="image"/>
          {/* <a
            className="creator-name"
            target="_blank"
            href={`https://unsplash.com/@${image.username}`}
          >
            {image.creatorName}
          </a> */}
          <div className="caption">
            Photo by <a href={`https://unsplash.com/@${image.username}?utm_source=your_app_name&utm_medium=referral`}>{image.creatorName}</a> on <a href="https://unsplash.com/?utm_source=scroll-app&utm_medium=referral">Unsplash</a>
          </div>
      </div>
    )
  }

  return (
    <>
      {images.map((image, index) => {
        if (images.length === index + 1) {
          return (
            <div ref={lastImageElementRef} key={index}>
              <Post image={image} />
            </div>
          )
        } else {
          return (
            <div key={index}>
                <Post image={image} />
            </div>
          )
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}

