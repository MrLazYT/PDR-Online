import type { Answer } from "./answer.type";

export interface Question {
    id: number;
    section_id: number;
    text: string;
    expert_comment: string;
    pdd_section: string;
    h1: string;
    title: string;
    image: string;
    image_alt: string;
    image_title: string;
    video: string;
    author: string;
    answers: Answer[];
    rightAnswerId: string;
    rightAnswerIndex: number;
}
