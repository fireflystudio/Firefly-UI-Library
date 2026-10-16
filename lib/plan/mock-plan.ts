import type { PlanResponse } from "./types";

/** Used when AI_MOCK=1 or no API key in development: a realistic plan so the builder can be tested offline. */
export const MOCK_RESPONSE: PlanResponse = {
  reply:
    "Proponuję stronę z ośmiu sekcji: hero z wizualizacją produktu, pasek klientów, trzy kroki działania, porównanie przed/po, liczby, opinię klienta, FAQ i zamknięcie z zapisem. Czy produkt ma już nazwę, której mam użyć w nagłówkach?",
  plan: {
    title: "Rezerwacje stolików dla restauracji",
    summary: "Aplikacja do rezerwacji stolików dla niezależnych restauracji, które chcą mniej telefonów i pełną salę.",
    language: "pl",
    sections: [
      {
        component: "navigation-sticky-v1",
        reason: "Prosty pasek z czterema linkami i jednym przyciskiem.",
        props: { links: [{ label: "Jak działa" }, { label: "Cennik" }, { label: "Opinie" }, { label: "FAQ" }], primaryCta: { label: "Wypróbuj za darmo" } },
      },
      {
        component: "hero-centered-v1",
        reason: "Produkt z ekranem, więc duża wizualizacja pod nagłówkiem.",
        props: {
          headline: "Pełna sala bez telefonu.",
          headlineMuted: "Rezerwacje same się układają.",
          body: "Goście rezerwują online, a Ty widzisz plan sali na jednym ekranie. Potwierdzenia i przypomnienia wychodzą same.",
          primaryCta: { label: "Wypróbuj za darmo" },
          secondaryCta: { label: "Umów prezentację" },
        },
        images: [
          {
            slot: "visual",
            orientation: "landscape",
            alt: "Wnętrze restauracji wieczorem, nakryte stoliki, kelner przy tablecie",
            prompt: "A small independent restaurant at golden hour, tables set with linen and glassware, a waiter glancing at a tablet by the host stand, warm window light, guests arriving in the background",
          },
        ],
      },
      {
        component: "logo-marquee-v1",
        reason: "Dowód społeczny tuż pod hero.",
        props: { label: "Zaufały nam restauracje", logos: ["Marta", "Osteria 12", "Sól i Pieprz", "Bistro Nowa", "Pod Lipą", "Kuchnia Zero", "Herbarium", "Stół 7"] },
      },
      {
        component: "steps-cards-v1",
        reason: "Trzy proste kroki wdrożenia.",
        props: {
          headline: "Trzy kroki",
          headlineMuted: "do pierwszej rezerwacji.",
          intro: "Wdrożenie zajmuje jedno popołudnie i nie wymaga nowego sprzętu.",
          steps: [
            { title: "Dodaj plan sali", body: "Narysuj stoliki i godziny otwarcia. Raz." },
            { title: "Wklej link", body: "Na stronę, do Google i na Instagram." },
            { title: "Przyjmuj gości", body: "Rezerwacje spływają do planu, przypomnienia wychodzą same." },
          ],
        },
      },
      {
        component: "before-after-compare-v1",
        reason: "Kontrast między telefonem a aplikacją.",
        props: {
          headline: "Zeszyt i telefon.",
          headlineMuted: "Albo jeden ekran.",
          beforeLabel: "Przed",
          afterLabel: "Po",
          before: { title: "Rezerwacje po staremu", points: ["Telefon dzwoni w środku serwisu", "Podwójne rezerwacje w zeszycie", "Goście nie przychodzą bez uprzedzenia", "Nikt nie wie, ile wolnych miejsc zostało"] },
          after: { title: "Rezerwacje w aplikacji", points: ["Goście rezerwują sami, o każdej porze", "Plan sali aktualizuje się na bieżąco", "Przypomnienia SMS zmniejszają no-show", "Wolne stoliki widać od razu"] },
        },
      },
      {
        component: "stats-grid-v1",
        reason: "Liczby i cytat w ciemnym pasie.",
        props: {
          tone: "dark",
          headline: "Mniej telefonów,",
          headlineMuted: "więcej gości.",
          statQuote: { text: "Przestaliśmy odbierać telefon w czasie serwisu. Sala i tak jest pełna.", author: "Anna Wrona", role: "Właścicielka, Osteria 12" },
          stats: [
            { value: "-62%", label: "telefonów w czasie serwisu" },
            { value: "3×", label: "mniej nieodwołanych rezerwacji" },
            { value: "15 min", label: "do pierwszej rezerwacji" },
            { value: "98%", label: "restauracji zostaje po roku" },
          ],
        },
      },
      {
        component: "testimonial-quote-v1",
        reason: "Jedna mocna opinia.",
        props: { tone: "light", quote: "W pierwszy weekend goście zarezerwowali więcej stolików niż przez cały poprzedni miesiąc telefonicznie.", name: "Michał Sadowski", role: "Szef kuchni i właściciel, Pod Lipą" },
        images: [
          {
            slot: "avatar",
            orientation: "square",
            alt: "Portret szefa kuchni w fartuchu",
            prompt: "Head-and-shoulders portrait of a chef in a linen apron standing in a small restaurant kitchen doorway, soft window light, relaxed expression",
          },
        ],
      },
      {
        component: "faq-split-v1",
        reason: "Odpowiedzi na typowe obawy.",
        props: {
          headline: "Masz pytania?",
          headlineMuted: "Odpowiadamy w jeden dzień.",
          cta: { label: "Napisz do nas" },
          items: [
            { question: "Czy potrzebuję nowego sprzętu?", answer: "Nie. Aplikacja działa na telefonie, tablecie i komputerze, który już masz." },
            { question: "Co z gośćmi, którzy dzwonią?", answer: "Rezerwację dodajesz ręcznie w dwóch kliknięciach. Trafia do tego samego planu sali." },
            { question: "Ile to kosztuje?", answer: "Jedna stała opłata miesięczna, bez prowizji od rezerwacji. Pierwsze 30 dni za darmo." },
            { question: "Czy mogę zrezygnować?", answer: "Tak, w dowolnym momencie, bez okresu wypowiedzenia." },
            { question: "Czy dane gości są bezpieczne?", answer: "Dane są przechowywane w Unii Europejskiej i widzi je tylko Twój zespół." },
          ],
        },
      },
      {
        component: "cta-newsletter-v1",
        reason: "Zamknięcie z zapisem na listę.",
        props: {
          tone: "dark",
          headline: "Zacznij od pierwszego stolika.",
          headlineMuted: "Reszta pójdzie sama.",
          body: "Zostaw adres, a wyślemy link do konta testowego i krótki przewodnik po wdrożeniu.",
          label: "Adres e-mail",
          placeholder: "twoj@restauracja.pl",
          buttonLabel: "Wypróbuj za darmo",
          confirmation: "Dziękujemy. Link do konta jest już w drodze.",
          privacyNote: "Zero spamu. Wypisujesz się jednym kliknięciem.",
          benefits: ["30 dni za darmo", "Bez karty", "Wdrożenie w jedno popołudnie"],
        },
      },
      {
        component: "footer-v1",
        reason: "Stopka z linkami i zapisem.",
        props: {
          tagline: "Rezerwacje, które same się układają.",
          columns: [
            { title: "Produkt", links: [{ label: "Jak działa" }, { label: "Cennik" }, { label: "Aktualizacje" }] },
            { title: "Firma", links: [{ label: "O nas" }, { label: "Kontakt" }, { label: "Polityka prywatności" }] },
          ],
          signup: { label: "Nowości raz w miesiącu", placeholder: "Adres e-mail", confirmation: "Dziękujemy, jesteś na liście." },
          legal: "© 2026 Rezerwacje. Wszystkie prawa zastrzeżone.",
        },
      },
    ],
  },
};
