//sk_test_51NbkexEQoG2EqoC4ZNnnQePfWgaeB4Kn06K8mJj6WfJknVoXc3TpbzGkeAIOOHwp3Z7YVUC8jD774DHtBsskgWJy00bHaMWBJ6
const express = require("express")
const server = express()
const cors = require("cors")
const stripe = require("stripe")("sk_test_51NbkexEQoG2EqoC4ZNnnQePfWgaeB4Kn06K8mJj6WfJknVoXc3TpbzGkeAIOOHwp3Z7YVUC8jD774DHtBsskgWJy00bHaMWBJ6")

const PORT = process.env.PORT || 3500

server.use(cors())
server.use(express.static("public"))
server.use(express.json())

server.listen(PORT, () => console.log(`server running on port ${PORT} successfully`))


//change price to discount price for each item except soccercleats

//gamepad: price_1Nc463EQoG2EqoC4WgLge1nq
//wiredKeyboard: price_1Nc47DEQoG2EqoC42cYxPVD8
//gamingMonitor: price_1Nc48uEQoG2EqoC4JdC3fhBL
//comfortChair: price_1Nc4AnEQoG2EqoC4Lq9QWMof
//northCoat: price_1Nc3YuEQoG2EqoC48JipyBWD
//gucciduffelbag: price_1Nc4ByEQoG2EqoC4EWqJly96
//rgbCooler: price_1Nc4DNEQoG2EqoC4gMA2UUGp
//bookShelf: price_1Nc3eaEQoG2EqoC4L0ZeGeFP
//dogFood: price_1Nc3gWEQoG2EqoC4YXtrt4Tq
//canonCamera: price_1Nc4F2EQoG2EqoC49JsNE0Ig
//gamingLaptop: price_1Nc3jzEQoG2EqoC4wwKcvUw7
//productSet: price_1Nc3llEQoG2EqoC4L7TocHTO
//kidsElectricCar: price_1Nc3nKEQoG2EqoC4fvxeeXrp
//soccerCleats: price_1Nc3tWEQoG2EqoC4RxDSCgU3
//usbGamepad: price_1Nc3yvEQoG2EqoC4MXnq7Af8
//satinJacket: price_1Nc40mEQoG2EqoC4q2kI7bpi