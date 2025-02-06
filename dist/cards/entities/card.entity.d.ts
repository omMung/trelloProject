import { Comment } from 'src/comments/entities/comment.entity';
import { JoinMember } from 'src/card-members/entities/card-member.entity';
import { CheckList } from 'src/checklists/entities/checklist.entity';
import { CardLabel } from 'src/card-labels/entities/card-label.entity';
import { List } from 'src/lists/entities/list.entity';
export declare class Card {
    id: number;
    listId: number;
    title: string;
    position: number;
    color: string;
    description: string;
    status: boolean;
    startDate: string;
    dueDate: string;
    comment: Comment[];
    joinMember: JoinMember[];
    checkList: CheckList[];
    cardLabel: CardLabel[];
    list: List;
}
