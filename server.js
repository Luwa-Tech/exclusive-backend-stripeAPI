//sk_test_51NbkexEQoG2EqoC4ZNnnQePfWgaeB4Kn06K8mJj6WfJknVoXc3TpbzGkeAIOOHwp3Z7YVUC8jD774DHtBsskgWJy00bHaMWBJ6
const express = require("express")
const server = express()
const cors = require("cors")

const PORT = process.env.PORT || 3500

server.use(cors())
server.use(express.static("public"))
server.use(express.json())

server.use("/checkout", require("./routes/checkout"))

server.listen(PORT, () => console.log(`server running on port ${PORT} successfully`))