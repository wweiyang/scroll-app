import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGetImages(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])
  const [hasMore, setHasMore] = useState(false)

  const baseUrlUnsplash = "https://api.unsplash.com/"
  const accessKeyUnsplash = "6c446b49b72a4c559d9b9d67183d5c1de1981d16f309063c3b994086e6ce1a26"
  // const accessKeyUnsplash = "CsApImaAi09EuM7sLRJpYJsH9n1JrSMl1uBiu5HvxFM"
  const count = 10
  const orientation = "squarish"

  useEffect(() => {
    setLoading(true)
    setError(false)

    axios({
      method: 'GET',
      url: `${baseUrlUnsplash}/photos/random?client_id=${accessKeyUnsplash}&count=${count}&orientation=${orientation}`,
      params: { page: pageNumber },
    }).then(res => {
      console.log(res)
      console.log("pageNumber: " + pageNumber )

      // setImages(prevImages => {
      //   return [...new Set([...prevImages, ...res.data.map(item => {
      //     const container = {}
          
      //     container.id = item.id
      //     container.altDescription = item.alt_description
      //     container.imageUrl = item.urls.regular
      //     container.username = item.user.username
      //     container.creatorName = item.user.name

      //     return container
      //   })])]
      // })

      setImages(prevImages => {
        return [...prevImages, ...res.data]
      })

      setHasMore(res.data.length > 0)
      setLoading(false)
    }).catch(e => {
      setError(true)
    })
  }, [pageNumber])

  return { loading, error, images, hasMore }
}
