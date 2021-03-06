import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useImageSearch(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])
  const [hasMore, setHasMore] = useState(false)

  // const apiRoot = "https://jsonplaceholder.typicode.com/photos";
  const apiRoot = "http://api.unsplash.com/";
  const accessKey = "6c446b49b72a4c559d9b9d67183d5c1de1981d16f309063c3b994086e6ce1a26";
  const count = 10;

  // useEffect(() => {
  //   setImages([])
  // }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      // url: `${apiRoot}/?_start=${pageNumber}&_limit=${count}`,
      url: `${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`,
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      console.log(res)
      console.log("pageNumber: " + pageNumber )
      setImages(prevImages => {
        return [...new Set([...prevImages, ...res.data.map(item => {
          const container = {}
          
          container.id = item.id
          container.imageUrl = item.urls.small
          container.creatorName = item.user.name

          return container
        })])]
      })
      setHasMore(res.data.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [pageNumber])

  return { loading, error, images, hasMore }
}
