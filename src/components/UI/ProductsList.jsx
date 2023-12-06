import ProductCart from './ProductCart'

const ProductsList = ({ data }) => {

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 w-full gap-4 px-2'>
      {data.map((item,index) => (
        <div key={index}> 
          <ProductCart key={item.id} item={item} />
        </div>
      ))}
    </div>
  )
}

export default ProductsList
