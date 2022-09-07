const express = require('express')
const fileUpload = require('express-fileupload')
const config = require('config')

const app = express()

app.use(
  fileUpload({
    createParentPath: true,
  })
)
app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).json({ msg: 'Нет загруженного файла' })
  }
  const file = req.files.file
  if (!file) return res.json({ error: 'Неправильное блять имя файла' })
  const newFileName = encodeURI(Date.now() + '-' + file.name)
  file.mv(`${__dirname}/client/public/uploads/${newFileName}`, (err) => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    }
    console.log('file was upload')
    res.json({
      fileName: file.name,
      filePath: `/uploads/${newFileName}`,
    })
  })
})
const PORT = config.get('port') || 6000
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))
