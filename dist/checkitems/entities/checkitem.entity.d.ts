import { CheckList } from '../../checklists/entities/checklist.entity';
export declare class CheckItem {
    id: number;
    checkListId: number;
    memberId: number;
    title: string;
    position: number;
    status: boolean;
    checkList: CheckList;
}
