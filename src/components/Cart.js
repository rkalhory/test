import {useEffect,useState} from "react";
import axios from '../services/Axios'

function Cart() {

    const [products,setProducts]=useState([])
    const [cartList,setCartList]=useState([])

    useEffect(()=>{
        axios.get('/products')
            .then((res)=> {
                setProducts(res?.data?.products)
            })
            .catch((error)=> {
                setProducts([])
                console.log(error)
            })

    },[])

    function addCart(item) {
        if(cartList.some(p => p.id === item.id)){
            const t = cartList.map((p) =>
                p.id === item.id ? { ...p, count: parseInt(p.count)+1 } : p
                );
            setCartList(t);
        }else{
            setCartList(cartList=>[...cartList,{
                id:item?.id,
                title:item?.title,
                pic:item?.images[0],
                count:1
            }])
        }
    }
    function reduce(item) {
        if(parseInt(item.count)-1<=0){
            removeItem(item?.id)
        }else{
            const t = cartList.map((p) =>
                p.id === item.id ? { ...p, count: parseInt(p.count)-1 } : p
            );
            setCartList(t);
        }

    }
    function removeItem(id) {
        let temp=cartList.filter((p)=>p.id !== id)
        setCartList(temp)
    }


    return (
        <>
            <div className='cart'>
                <h2>سبد خرید</h2>
                {!cartList?.length?'سبد خرید خالی است.':(
                    <div className='cart-list'>
                        {cartList.map(p=>(
                            <div key={p?.id} className='item'>
                                <img src={p?.pic} alt='pic'/>
                                <div>
                                    <h2>{p?.title}</h2>
                                    <span> تعداد:{p?.count}</span>
                                </div>
                                <div className='actions'>
                                    <button type='button' onClick={()=>addCart(p)} title='افزایش'>+</button>
                                    <button type='button' onClick={()=>reduce(p)} title='کاهش'>-</button>
                                    <button type='button' onClick={()=>removeItem(p.id)} title='حذف'>x</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {!products?.length?'در حال بارگذاری...':<div className='list'>
                {products?.map(item => (
                        <div className='item' key={item?.id}>
                            <img src={item?.images[0]} alt={item?.title}/>
                            <h2>{item?.title}</h2>
                            <button type='button' onClick={() => addCart(item)}>add</button>
                        </div>
                    )
                )}
            </div>}
        </>
    );
}

export default Cart;
