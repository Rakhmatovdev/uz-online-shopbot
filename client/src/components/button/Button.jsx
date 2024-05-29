
const Button = (props) => {
    const {type,title,onClick,disabled} =props
  return (<button className={`btn ${type} ${disabled?"!bg-gray-500":""}`} disabled={disabled} onClick={onClick}>{title}</button>)
}

export default Button