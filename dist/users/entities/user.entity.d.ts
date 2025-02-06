import { Member } from '../../members/entities/member.entity';
import { Board } from '../../boards/entities/board.entity';
import { JoinMember } from '../../card-members/entities/card-member.entity';
import { Alarm } from '../../alarms/entities/alarm.entity';
import { Comment } from '../../comments/entities/comment.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    isVerified: boolean;
    verifyCode: string;
    createdAt: Date;
    updatedAt: Date;
    boards: Board[];
    members: Member[];
    joinMembers: JoinMember[];
    comments: Comment[];
    alarms: Alarm[];
}
