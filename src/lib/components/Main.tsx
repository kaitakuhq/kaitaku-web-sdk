import React, { useEffect, useState } from 'react';

// interface Props {
//     token: string
// }

// interface CommentResponse {
//     categoryId: string
//     comments: Comment[]
// }
// interface Comment {
//     comment: string
// }

export const Hello = () => {
    const [categories] = useState([1, 2, 3,])
    // const [commentResp, setCommentResp] = useState<CommentResponse>({ categoryId: "1234", comments: [] })

    useEffect(() => {

    }, [])

    return (
        <div>

            {
                categories.map(() => (
                    <div>Categrddddfffdory 341</div>
                ))
            }
            {/* {
                commentResp.comments.map(v = (
                    <div>{v.categoryId}</div>
                ))
            } */}
            <div>Hello f</div>
        </div>
    )
}
