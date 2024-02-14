
const helloWorld = (request, response) => {
    response.status(200).json({ msg: "Hello World !" })
}

module.exports = {
    helloWorld
}