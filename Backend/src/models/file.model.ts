import mongoose from "mongoose";
 
interface IFile {
    image: Buffer
  }

const fileSchema = new mongoose.Schema({
    file:
    {
        data: Buffer,
        contentType: String
    }
});
 
const File = mongoose.model<IFile>('File', fileSchema);

export { File, IFile };