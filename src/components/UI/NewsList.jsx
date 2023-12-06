import React from 'react'
import NewItem from './NewItem'
import newsData from '../../assets/data/newsData'

const NewsList = () => {
  return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
            {newsData.map((item) => (
                <NewItem key={item.id} item={item} />
            ))}
        </div>
        )
    }

export default NewsList

