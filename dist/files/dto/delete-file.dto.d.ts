import { File } from '../entities/file.entity';
declare const DeleteFileDto_base: import("@nestjs/mapped-types").MappedType<Pick<File, "fileName">>;
export declare class DeleteFileDto extends DeleteFileDto_base {
    fileName: string;
}
export {};
