import React from 'react'
import { addToCart as addToCartReducer } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { getCartProduct } from '../features/cart/cartThunks'
import { selectedQuantityHandler } from '../features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'

const AddToCart = ({ product }) => {
  const navigate = useNavigate()
  const { product_id: id, stock, price } = product

  const dispatch = useDispatch()

  const selectHandler = e => dispatch(selectedQuantityHandler(+e.target.value))

  const renderOptions = [...Array(stock)].map((_, index) => {
    return (
      <option key={index} value={index + 1}>
        {index + 1}
      </option>
    )
  })

  const addToCartHandler = () => {
    dispatch(getCartProduct(id))
    navigate('/cart')
  }

  return (
    <article className='border-2'>
      <div className='grid grid-cols-2 border-b-2 p-2'>
        <p>Price</p>
        <p>${price}</p>
      </div>
      <div className='grid grid-cols-2 border-b-2 p-2'>
        <p>Status</p>
        {stock > 0 ? <p>In stock</p> : <p className='text-red-500 text-sm mt-1'>Out of stock</p>}
      </div>
      {stock > 0 && (
        <div className='grid grid-cols-2 border-b-2 p-2'>
          <p>Quantity</p>
          <select onChange={selectHandler}>{renderOptions}</select>
        </div>
      )}
      <button
        onClick={addToCartHandler}
        className='p-4 bg-black text-white w-full min-w-[300px] cursor-pointer disabled:bg-black/50 disabled:cursor-auto'
        disabled={stock === 0}
      >
        Add to cart
      </button>
    </article>
  )
}

export default AddToCart
