import { useEffect, useState } from 'react'

const Data = () => {
    const [productsData, setProductsData] = useState([])

    useEffect(() =>{
        const fetchProducts = async() => {
            const response = await fetch('http://localhost:3031/products')
            const data = await response.json()
            setProductsData(data)
        }
        fetchProducts()
    }, [])

    return productsData;
}

// export default Data;
export default Data;

export const useProducts = () => Data();
