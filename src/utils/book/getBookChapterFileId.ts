import type { GetBookChapterFileIdProps } from "../../props/utils/book/getBookChapterFileIdProps";

export default function getBookChapterFileId({
    chapterId,
    subsectionId,
    content_mode,
}: GetBookChapterFileIdProps): string {
    if (content_mode === "subsection-file" && subsectionId) {
        return `${chapterId}_${subsectionId}`;
    }

    return chapterId;
}
