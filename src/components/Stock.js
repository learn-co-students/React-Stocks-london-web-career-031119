import React from 'react'


const Stock = (props) => {

  const { ticker, name, type, price } = props.stock

  return (
    <div onClick={() => props.handleStockClick(props.stock)} >

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="meta-text"> {type}</p>
          <p className="card-text">{`${ticker}: ${price}`}</p>
        </div>
      </div>
    </div>
  )
}


export default Stock
