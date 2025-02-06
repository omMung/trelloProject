import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

//멀터 업로드 옵션 설정
export const multerOptions: MulterOptions = {
  storage: diskStorage({
    //로컬 저장 세팅
    destination: './cardfiles', //저장할 폴더명
    filename: (req, file, callback) => {
      //파일명 세팅
      const date = new Date();
      //현재 시간 변수 설정
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');

      const formattedDate = `${year}${month}${day}-${hour}${minute}`;
      const originalname = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_'); //대소문자 숫자,.을 제외한 모든것 _치환
      callback(null, `${formattedDate}-${randomCode()}-${originalname}`); //랜덤코드를 섞은 최종 파일명
    },
  }),
  fileFilter: (req, file, callback) => {
    callback(null, true);
  },
};
//랜덤 코드 생성
function randomCode(length: number = 4): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export const FileUploadInterceptor = FileInterceptor('file', multerOptions);
