// The teamtraining curriculum, as built in the LMS (Tutor LMS, aigeletterdheid.training).
// One source for the /training programma section and anything else that lists lessons.
// Each module also opens with an introduction lesson in the LMS; `lessons` lists the topic lessons.

export type Module = {
  n: number;
  title: string;
  summary: string;
  lessons: string[];
  quizQuestions: number;
};

export const CURRICULUM: Module[] = [
  {
    n: 1,
    title: "Begrijpen wat AI is",
    summary:
      "Wat AI wel en niet is. Je haalt de magie eraf en leert dat AI patronen herkent en met waarschijnlijkheden rekent. Dat verklaart waarom het zo krachtig is, en tegelijk waarom het fouten maakt die overtuigend klinken.",
    lessons: [
      "Wat is AI en wat is het niet?",
      "De soorten AI",
      "Waarschijnlijkheden, geen zekerheden",
      "Rubbish in = rubbish out",
      "Waarom AI fouten maakt",
      "De vier risicocategorieën",
    ],
    quizQuestions: 6,
  },
  {
    n: 2,
    title: "Veilig en verantwoord werken met AI",
    summary:
      "Hier wordt kennis gedrag. Je leert wat je nooit invoert, hoe je output kritisch beoordeelt en waar jouw verantwoordelijkheid ligt.",
    lessons: [
      "Wat je nooit invoert",
      "Bias en hallucinaties herkennen en controleren",
      "Automation bias en te veel vertrouwen",
      "De mens blijft verantwoordelijk",
      "Transparantie en eerlijkheid",
      "Jouw rol: goedgekeurde tools, shadow AI, melden",
    ],
    quizQuestions: 6,
  },
  {
    n: 3,
    title: "Slim werken met AI",
    summary:
      "AI goed aansturen. Je leert een sterke prompt opbouwen, gericht bijsturen en de output controleren. Met een paar bouwstenen til je je resultaten naar een heel ander niveau.",
    lessons: [
      "Anatomie van een goede prompt",
      "Itereren: het is een gesprek",
      "Herbruikbare patronen",
      "Prompten en de tools",
      "Output controleren",
      "De valkuilen",
    ],
    quizQuestions: 6,
  },
  {
    n: 4,
    title: "AI toepassen in je werk",
    summary:
      "AI inzetten in je eigen werk. Je leert waar de winst zit, hoe je per taak een veilige keuze maakt en met welke drie toepassingen je meteen begint. Want kennis die je niet toepast, vervaagt snel.",
    lessons: [
      "Jouw gebruik van AI",
      "De beslisboom: wel of geen AI, en wanneer juist niet",
      "Do's en don'ts in de praktijk",
      "Jouw eerste drie toepassingen",
    ],
    quizQuestions: 4,
  },
];

export const TOTAL_LESSONS = CURRICULUM.reduce((n, m) => n + m.lessons.length, 0); // 22
export const TOTAL_QUIZ_QUESTIONS = CURRICULUM.reduce((n, m) => n + m.quizQuestions, 0); // 22
