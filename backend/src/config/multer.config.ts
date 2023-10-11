import { MulterModuleOptions } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename(req, file, callback) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e3);
      const extension = extname(file.originalname)
      const filename = file.originalname + uniqueSuffix + extension;
      callback(null, filename);
    },
  })
};