import multer, { diskStorage } from "multer"

const storageConfig = diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        console.log("mul-file: ", file);
        cb(null, `image-${new Date().getTime()}-${file.originalname}`)
    }
})

// export an upload variable
export const upload = multer({ storage: storageConfig })