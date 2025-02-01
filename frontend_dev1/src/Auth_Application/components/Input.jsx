const Input = ({icon:Icon, ...props}) => {
    return (
        <div className = 'relative mb-6'> 
            <div>
                <Icon/>
            </div>
            
            <input
              {...props}
            />

        </div>
    )
}
export default Input;