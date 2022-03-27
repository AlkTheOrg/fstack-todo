import { FC } from 'react'

const style = {
  height: '52px',
  width: '100%',
}

export const TodoWrapper:FC<any> = ({ children }) => {
  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default TodoWrapper
