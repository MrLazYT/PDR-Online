import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Chapter } from "../types/chapter.type";
import { BookService } from "../services/book.service";
import type { MenuItem } from "../types/menuItem";
import TopMenu from "../components/TopMenu";

export default function Book() {
    const { bookType, chapterSlug } = useParams();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [chapterId, setChapterId] = useState<string>("");
    const [currentChapter, setCurrentChapter] = useState<Chapter>();
    const [chapterContent, setChapterContent] = useState<any[]>([]);
    const [openedExpertCommentId, setOpenedExpertCommentId] = useState<number>(-1);
    const navigate = useNavigate();

    const bookTypeToTitleMap: Record<string, string> = {
        pdr: "ПДР",
        "pidruchnyk-z-vodinnia": "Водіння авто",
        "pidruchnyk-po-vlashtuvanniu-avtomobilia": "Будова авто",
        "medychna-dopomoha": "Меддопомога",
        "vash-advokat": "Ваш адвокат",
        "penalty-information": "Таблиця штрафів",
        driving_license: "Загальна інформація",
    };

    const topMenuItems: MenuItem[] = [
        {
            title: "Усі довідники",
            link: "/dovidniki",
        },
        {
            title: bookTypeToTitleMap[bookType!],
            link: "",
        },
    ];

    useEffect(() => {
        async function getChapters() {
            const data = await BookService.getChapters(bookType!);

            setChapters(data);
        }

        getChapters();
    }, []);

    useEffect(() => {
        if (!chapterSlug || chapters.length == 0) return;

        const chapterId = chapterSlug?.replace("rozdil-", "");
        const chapter = chapters.find((chapter) => chapter.id == chapterId);

        setChapterId(chapterId!);
        setCurrentChapter(chapter);
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [chapters, chapterSlug]);

    useEffect(() => {
        if (chapterSlug) return;
        if (!bookType || chapters.length == 0) return;

        const chapterId = chapters[0].id;

        navigate(`/dovidniki/${bookType}/rozdil-${chapterId}`);
    }, [bookType, chapters, chapterSlug]);

    useEffect(() => {
        if (!bookType || !chapterId) return;

        async function getChapter() {
            const data = await BookService.getChapter(bookType!, "" + chapterId);

            if (!data) {
                if (!chapterId.includes(".")) {
                    navigate(`/dovidniki/${bookType}/rozdil-${chapterId}.1`);
                } else {
                    navigate(`/dovidniki/${bookType}`);
                }

                return;
            }

            const dataArr = Object.values(data) as string[];

            const fixed = dataArr.map((html: string) =>
                html
                    .replaceAll('data-src="/storage', 'data-src="https://green-way.com.ua/storage')
                    .replaceAll('src="/storage', 'src="https://green-way.com.ua/storage')
                    .replaceAll("background: url('/plugins", "background: url('https://green-way.com.ua/plugins")
                    .replaceAll("background:url('/plugins", "background: url('https://green-way.com.ua/plugins")
                    .replace(/src="data:image\/gif;base64,[^"]*"/g, "")
                    .replaceAll('data-src="https://', 'src="https://')
                    .replaceAll(
                        /<div id="video[^"]*" data-src="([^"]+)"><\/div>/g,
                        '<iframe class="iframe-video" src="https://www.youtube.com/embed/$1?autoplay=1&mute=1&loop=1&playlist=$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>',
                    ),
            );

            setChapterContent(fixed);
        }

        getChapter();
    }, [chapterContent, bookType, chapterId]);

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
                                to={`/dovidniki/${bookType}/rozdil-${chapter.id}`}
                                className={`link ${chapterId == chapter.id.replaceAll(".", "_") ? "selected-" : ""}chapter-item`}
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

                    {chapterContent.map((html, index) => {
                        const next = chapterContent[index + 1];
                        const nextStartsWithH3 = /<div[^>]*class="text"[^>]*>\s*<h3/.test(next ?? "");

                        return (
                            <div
                                key={index}
                                className={`text${nextStartsWithH3 ? " section-break" : ""}`}
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
