import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import bodyParser from 'body-parser'
import path from 'path'
import Pusher from 'pusher'
import mongoPosts from './mongoPosts.js'

Grid.mongo = mongoose.mongo

const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1336331",
    key: "d93ce0b478cdfa09f46c",
    secret: "a74d5e345e9b9c7b4096",
    cluster: "us2",
    useTLS: true
});

app.use(bodyParser.json());
app.use(cors())

const mongoURI = 'mongodb+srv://admin:7gbKlU2anTLOeSWd@cluster0.bh0fr.mongodb.net/facebook?retryWrites=true&w=majority'

const conn = mongoose.createConnection(mongoURI);

mongoose.connect(mongoURI)

mongoose.connection.once('open', () => {
    console.log('Connected1')

    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change', (change) => {
        console.log(change)

        if (change.operationType === 'insert') {
            console.log('pushing')

            pusher.trigger('post', 'inserted')
        }
    })
})

let gfs

conn.once('open', () => {
    console.log('Connected2')

    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('images')
})

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            {
                const filename = `image-${Date.now()}${path.extname(file.originalname)}`

                const fileInfo = {
                    filename: filename,
                    bucketName: 'images'
                }

                resolve(fileInfo)
            }
        })

    }
})

const upload = multer({ storage })

app.get('/', (req, res) => res.status(200).send('hi'))

app.post('/upload/image', upload.single('file'), (req, res) => {
    res.status(201).send(req.file)
})

app.post('/upload/post', (req, res) => {
    const dbPost = req.body

    mongoPosts.create(dbPost, (data) => {
        res.status(201).send(data)
    })
})
app.get('/retrieve/image/single', (req, res) => {
    gfs.files.findOne({ filename: req.query.name }, (err, file) => {
        if (file) {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            console.log('Failed to find file')
        }
    })
})

app.get('/retrieve/posts', (req, res) => {
    mongoPosts.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            data.sort((b, a) => {
                return a.timestamp - b.timestamp;
            });
            res.status(200).send(data)
        }
    })
})
app.listen(port, () => console.log(`we got localhost:${port}`))
