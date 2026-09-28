// The AI-risicocheck: questions and how they group into the five scores.
// Shared by the scan page and the email, so both always show the same wording.

export const QUESTIONS = [
  { q: "Weet je precies welke AI-tools je mensen gebruiken voor hun werk?", options: ["Nee, geen idee", "Grofweg, maar niet zeker", "Van de meeste teams wel", "Ja, we hebben er goed zicht op"] },
  { q: "Is er afgesproken welke bedrijfsdata wél en niet in een AI-tool mag?", options: ["Nee, niets afgesproken", "Informeel, niet op papier", "Er ligt iets, maar niet iedereen kent het", "Ja, duidelijk en bij iedereen bekend"] },
  { q: "Hoe groot is het verschil in AI-vaardigheid tussen je mensen?", options: ["Enorm: van expert tot totale leek", "Groot, het leunt op een paar mensen", "Wisselend, maar redelijk", "Klein: iedereen heeft een basis"] },
  { q: "Wordt AI-output gecontroleerd voordat het naar buiten gaat?", options: ["Nee, gaat vaak één op één de deur uit", "Soms, hangt van de persoon af", "Meestal wel bij belangrijk werk", "Ja, dat is een vaste stap"] },
  { q: "Gebruiken mensen AI-tools buiten het zicht van IT (shadow AI)?", options: ["Vast wel, maar we weten het niet", "Waarschijnlijk, deels", "Een beetje, we houden het redelijk bij", "Nauwelijks, we hebben het in beeld"] },
  { q: "Weten je mensen hoe ze gevoelige of vertrouwelijke data herkennen voordat ze het delen?", options: ["Nee", "Sommigen wel", "De meesten wel", "Ja, dat is aangeleerd"] },
  { q: "Werkt iedereen vanuit dezelfde afspraken over verantwoord AI-gebruik?", options: ["Nee, iedereen doet het anders", "Deels, informeel", "Grotendeels wel", "Ja, één gedeelde basis"] },
  { q: "Kunnen leidinggevenden het AI-gebruik van hun team beoordelen en bijsturen?", options: ["Nee, ze weten zelf te weinig van AI", "Beperkt", "De meesten wel", "Ja, ze hebben de kennis en de kaders"] },
  { q: "Als er iets misgaat met AI (datalek, foute output), zou je het merken?", options: ["Nee, pas als het echt fout is", "Misschien, met geluk", "Waarschijnlijk wel", "Ja, we zouden het snel zien"] },
  { q: "Krijgen nieuwe medewerkers uitleg over veilig AI-gebruik?", options: ["Nee", "Informeel, van collega's", "Er is iets, maar niet up-to-date", "Ja, vast onderdeel van de onboarding"] },
];

export const DIMENSIONS = [
  { label: "Zicht op AI-gebruik", indices: [0, 4] },
  { label: "Bescherming van data", indices: [1, 5] },
  { label: "Gedeelde basiskennis", indices: [2, 6] },
  { label: "Controle op output", indices: [3, 8] },
  { label: "Sturing & onboarding", indices: [7, 9] },
];
