const checkError = (err) => {
    if (err.includes('E11000')) {
        if (err.includes('username')) return 'Your username is already exits'
        else if (err.includes('email')) return 'Your email is already exits'
    }
    return err
}

module.exports = {checkError}