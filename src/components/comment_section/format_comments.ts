import { IMAGES_BASE_URL } from '../../utils/image_src';

// db
interface User {
    id: string;
    full_name: string;
    username: string;
    image_src: string | null;
}

interface Reply {
    id: string;
    text: string;
    user: User;
    user_id: string;
    entity_id: string;
    parent_id: string | null;
    created_at: string;
    updated_at: string;
    entity_source: string;
}

interface Comment {
    id: string;
    user_id: string;
    parent_id: string | null;
    entity_id: string;
    entity_source: string;
    text: string;
    created_at: string;
    updated_at: string;
    user: User;
    replies: Reply[];
}

// front

export interface ReplyInterface {
    user_id: string;
    comment_id: string;
    fullName: string;
    userProfile: string;
    text: string;
    avatarUrl: string;
    date: string;
};

export interface CommentFormatInterface {
    user_id: string;
    comment_id: string;
    fullName: string;
    userProfile: string;
    text: string;
    avatarUrl: string;
    date: string;
    replies: ReplyInterface[]
}


export default function formatComments(comments: Comment[]): CommentFormatInterface[] {
    const arr: CommentFormatInterface[] = [];

    comments.forEach(c => {

        const reply: ReplyInterface[] = []

        c.replies.forEach(r => {
            reply.push({
                user_id: r.user_id,
                comment_id: r.id,
                fullName: r.user.full_name,
                userProfile: `/designers/${r.user.username}`,
                text: r.text,
                avatarUrl: r.user.image_src ? `${IMAGES_BASE_URL}/${r.user.image_src}` : '/img/avatar.png',
                date: r.created_at,
            })
        })

        arr.push({
            user_id: c.user_id,
            comment_id: c.id,
            fullName: c.user.full_name,
            userProfile: `/designers/${c.user.username}`,
            text: c.text,
            avatarUrl: c.user.image_src ? `${IMAGES_BASE_URL}/${c.user.image_src}` : '/img/avatar.png',
            date: c.created_at,
            replies: reply
        })
    })

    return arr
}