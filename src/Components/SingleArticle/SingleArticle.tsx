import { Avatar, Box, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import { useAppStore } from '../../zustand/store'
import './singleArticle.scss'

const SingleArticle = () => {
  const param = useParams()
  const [loading, setLoading] = useState(false)
  const singleArticle = useAppStore((state: any) => state.singleArticle)
  const setSingleArticle = useAppStore((state: any) => state.setSingleArticle)
  const getSingleArticle = async (slug: string | undefined) => {
    const res = await axios.get(`https://api.realworld.io/api/articles/${slug}`)
    setSingleArticle(res.data.article)
  }

  useEffect(() => {
    setLoading(true)
    getSingleArticle(param.slug).then(() => {
      setLoading(false)
    }).catch((err) => {
      console.log("error in fetching single article", err)
    })
  }, [])

  if (!singleArticle) {
    return null
  }

  return (
    <>
      {loading ? <div className='loaderWrapper'><ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      /></div> : (
        <>
          <Box className='headingWrapper'>
            <Text className='headingTitle' fontSize='4xl' as='b'>
              {singleArticle?.title}
            </Text>
            <Box className='headingUserInformation '>
              <Box className='usernameAvatarConatainerSingle'>
                <Box>
                  <Avatar size='sm' src={singleArticle?.author?.image} />
                </Box>
                <Box className='userName'>
                  <Text fontSize="sm" color="white">{singleArticle?.author?.username}</Text>
                  <Text fontSize="xs" color="white">{new Date(singleArticle?.updatedAt).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}</Text>
                </Box>
                <Box className='favouriteCounterSingleArticle'>
                  ❤️Favourite Articles({singleArticle.favoritesCount})
                </Box>
              </Box>
            </Box>

          </Box>
          <Box className='bodyWrapper'>
            <Text fontSize="xl">
              {singleArticle.body}
            </Text>
          </Box>
        </>
      )}
    </>

  )
}

export default SingleArticle