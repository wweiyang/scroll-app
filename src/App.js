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

  return (
    <>
      {images.map((image, index) => {
        if (images.length === index + 1) {
          return (
            <div ref={lastImageElementRef} key={index}>
              <img src={image.imageUrl} alt={image.description}/>
              <a
                className="credit"
                target="_blank"
                href={`https://unsplash.com/@${image.username}`}
              >
                {image.creatorName}
              </a>
            </div>
          )
        } else {
          return (
            <div key={index}>
                <img src={image.imageUrl} alt={image.description}/>
                <a
                  className="credit"
                  target="_blank"
                  href={`https://unsplash.com/@${image.username}`}
                >
                  {image.creatorName}
                </a>
            </div>
          )
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}

