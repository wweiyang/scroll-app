import React, { useState, useRef, useCallback } from 'react'
import useImageSearch from './useImageSearch'

export default function App() {
  // const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const {
    images,
    hasMore,
    loading,
    error
  } = useImageSearch(pageNumber)

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

  // function handleSearch(e) {
  //   setQuery(e.target.value)
  //   setPageNumber(1)
  // }

  return (
    <>
      {/* <input type="text" value={query} onChange={handleSearch}></input> */}
      {images.map((image, index) => {
        if (images.length === index + 1) {
          return <div ref={lastImageElementRef} key={image.id}>
            <p>{image.creatorName}</p>
            <img src={image.imageUrl} />
          </div>
        } else {
          return (
            <div key={image.id}>
                <img src={image.imageUrl} />
                <p>{image.creatorName}</p>
            </div>
          )
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}

