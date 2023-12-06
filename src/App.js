import './App.css';
import Layouts from './components/Layouts/Layouts';
import Aos from 'aos'
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useEffect } from 'react';

// import FirebaseFirestore from 'firebase/firestore'
// import { productsFirebase } from './firebaseConfig'
// import {collection, getDocs } from 'firebase/firestore'

function App() {
  // const [productsData ,setProductsData] = useState([])
  
  useEffect(() => {
    Aos.init();
  }, [])

  // useEffect(() => {
	// 	// this is where the code runs
  //   getData()
	// },[]);

  // const getData = async () => {
  //   const postsCol = collection(productsFirebase, 'products');
  //   const snapshot = await getDocs(postsCol);
  //   setProductsData(
  //     snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       product: doc.data()
  //     }))
  //   )
  // }
  
  // console.log(productsFirebase)
  // console.log(productsData)
  
  return (
    <div>

      <div>
        <Layouts />
      </div>

      {/* <div>
        {productsData.map((product, id) => (
          <div key={id}>
            <p>{product.id}</p>
            <p>{product.product.productName}</p>
            <img src={product.product.imgUrl} alt=''  className='h-[200px] w-[200px]'/>
          </div>
        ))}
      </div> */}

    </div>
  )
}

export default App;
