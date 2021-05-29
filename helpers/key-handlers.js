const onEnter = (e, callback) => {
    if (e.keyCode === 13) 
        callback(e)
} 

export { onEnter }