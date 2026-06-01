import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Chapter } from "../types/chapter.type";
import { BookService } from "../services/book.service";
import type { MenuItem } from "../types/menuItem";
import TopMenu from "../components/TopMenu";
import { bookTypeToTitleMap } from "../constants/books/bookTypeToTitleMap";
import type { Book } from "../types/book.type";
import getBookChapterFileId from "../utils/book/getBookChapterFileId";
import fixBookHtml from "../utils/book/fixBookHtml";

export default function Book() {
    const { bookType, chapterSlug, subsectionSlug } = useParams();
    const [isChapterLoading, setIsChapterLoading] = useState<boolean>(false);
    const [currentBook, setCurrentBook] = useState<Book>();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [activeSubsection, setActiveSubsection] = useState<string>("");
    const [currentChapter, setCurrentChapter] = useState<Chapter>();
    const [chapterContent, setChapterContent] = useState<any[]>([]);
    const [openedExpertCommentId, setOpenedExpertCommentId] = useState<number>(-1);
    const chapterId = chapterSlug?.replace("rozdil-", "") ?? "";
    const subsectionId = subsectionSlug?.replace("chastyna-", "") ?? "";
    const navigate = useNavigate();

    const currentBookTitle = bookType ? (bookTypeToTitleMap[bookType!] ?? "Довідник") : "Довідник";

    const topMenuItems: MenuItem[] = [
        {
            title: "Усі довідники",
            link: "/dovidniki",
        },
        {
            title: currentBookTitle,
            link: "",
        },
    ];

    useEffect(() => {
        async function getCurrentBook() {
            if (!bookType) return;

            const data = await BookService.getBooks();

            const book = data.find((book: Book) => book.link === bookType);

            setCurrentBook(book);
        }

        getCurrentBook();
    }, [bookType]);

    useEffect(() => {
        async function getChapters() {
            if (!bookType) return;

            const data = await BookService.getChapters(bookType);

            setChapters(data);
        }

        getChapters();
    }, [bookType]);

    useEffect(() => {
        if (chapters.length == 0) return;

        const chapter = chapters.find((chapter) => chapter.id == chapterId);

        setCurrentChapter(chapter);
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [chapters, chapterSlug]);

    useEffect(() => {
        if (!currentBook || !bookType || !chapterId || subsectionSlug) return;
        if (currentBook.content_mode !== "subsection-file") return;

        const firstSubsection = chapters.find(
            (chapter) =>
                chapter.chapterId === chapterId && chapter.subsectionId !== "0" && chapter.subsectionId !== undefined,
        );

        if (!firstSubsection) return;

        navigate(`/dovidniki/${bookType}/rozdil-${chapterId}/chastyna-${firstSubsection.subsectionId}`, {
            replace: true,
        });
    }, [currentBook, bookType, chapterId, subsectionSlug, chapters, navigate]);

    useEffect(() => {
        if (chapterSlug) return;
        if (!bookType || chapters.length == 0) return;

        const chapterId = chapters[0].id;

        navigate(`/dovidniki/${bookType}/rozdil-${chapterId}`);
    }, [bookType, chapters, chapterSlug]);

    useEffect(() => {
        async function getChapter() {
            if (!currentBook || !bookType || !chapterId) return;

            try {
                setIsChapterLoading(true);
                setChapterContent([]);

                const fileId = getBookChapterFileId({
                    chapterId,
                    subsectionId,
                    content_mode: currentBook.content_mode,
                });

                const data = await BookService.getChapter(bookType, fileId);

                if (!data) {
                    if (!chapterId.includes(".")) {
                        navigate(`/dovidniki/${bookType}/rozdil-${chapterId}`);
                    } else {
                        navigate(`/dovidniki/${bookType}`);
                    }

                    return;
                }

                const dataArr = Object.values(data) as string[];

                const fixed = dataArr.map(fixBookHtml);

                setChapterContent(fixed);
            } finally {
                setIsChapterLoading(false);
            }
        }

        getChapter();
    }, [bookType, chapterId, currentBook, subsectionId]);

    useEffect(() => {
        if (!subsectionId || !chapterContent.length) return;

        const headers = document.querySelectorAll(".chapter-content h3");

        const target = Array.from(headers).find((el) =>
            el.textContent?.trim().startsWith(`${chapterId}.${subsectionId}`),
        );

        if (!target) return;

        const currentSectionBlock = target.parentElement;

        if (!currentSectionBlock) return;

        currentSectionBlock.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [subsectionId, chapterContent]);

    useEffect(() => {
        const headers = document.querySelectorAll(".chapter-content h3");

        if (!headers.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visible.length > 0) {
                    const text = visible[0].target.textContent || "";

                    const match = text.match(/^(\d+\.\d+)/);

                    if (match) {
                        setActiveSubsection(match[1]);
                    }
                }
            },
            {
                rootMargin: "-80px 0px -60% 0px",
                threshold: 0,
            },
        );

        headers.forEach((header) => observer.observe(header));

        return () => observer.disconnect();
    }, [chapterContent]);

    useEffect(() => {
        const expertComments = document.getElementsByClassName("info-pdd expert");
        const handlers: (() => void)[] = [];

        for (let i = 0; i < expertComments.length; i++) {
            const handler = () => {
                setOpenedExpertCommentId((prev) => (prev === i ? -1 : i));
            };

            expertComments[i].addEventListener("click", handler);
            handlers.push(handler);

            const commentQuestion = expertComments[i].getElementsByClassName("comment_question")[0];

            if (openedExpertCommentId != i) {
                commentQuestion?.classList.add("collapsed");
            } else {
                commentQuestion?.classList.remove("collapsed");
            }
        }

        return () => {
            for (let i = 0; i < expertComments.length; i++) {
                expertComments[i].removeEventListener("click", handlers[i]);
            }
        };
    }, [chapterContent, openedExpertCommentId]);

    return (
        <div className="container">
            <TopMenu topMenuItems={topMenuItems} selectedItem={1} />

            <div className="book-content-container">
                <div className="content-block">
                    <p className="content-title">Зміст</p>

                    <div className="content-items">
                        {chapters.map((chapter, index) => (
                            <Link
                                key={index}
                                to={`/dovidniki/${bookType}/rozdil-${chapter.chapterId}/${chapter.subsectionId !== "0" && chapter.subsectionId !== undefined ? `chastyna-${chapter.subsectionId}` : ""}`}
                                className={`link ${chapterId == chapter.id || activeSubsection == `${chapter.chapterId}.${chapter.subsectionId}` ? "selected-" : ""}chapter-item`}
                            >
                                {chapter.type === "main" ? (
                                    <span className="bold">Розділ {chapter.chapterId}</span>
                                ) : (
                                    ""
                                )}
                                {chapter.type === "main" ? ": " : ""}
                                {chapter.title}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="chapter-content">
                    <h1 className="chapter-title">
                        {currentChapter?.chapterId}. {currentChapter?.title}
                    </h1>

                    {isChapterLoading ? (
                        <div className="bookLoader">Завантаження розділу...</div>
                    ) : (
                        chapterContent.map((html, index) => {
                            const next = chapterContent[index + 1];
                            const nextStartsWithH3 = /<div[^>]*class="text"[^>]*>\s*<h3/.test(next ?? "");

                            return (
                                <div
                                    key={index}
                                    id={`subsection-${index + 1}`}
                                    className={`text${nextStartsWithH3 ? " section-break" : ""}`}
                                    dangerouslySetInnerHTML={{ __html: html }}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
