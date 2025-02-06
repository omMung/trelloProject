import { List } from 'src/lists/entities/list.entity';
import { Member } from 'src/members/entities/member.entity';
import { User } from 'src/users/entities/user.entity';
import { visibEnum } from '../dto/visibility.enum';
export declare class Board {
    id: number;
    userId: number;
    visibility: visibEnum;
    color: String;
    title: String;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    lists: List[];
    members: Member[];
}
