export interface Section {
  id: string;
  title: string;
  description?: string;
}

export interface Chapter {
  id: string;
  title: string;
  objective: string;
  summary?: string;
  sections: Section[];
}

export interface Syllabus {
  thesis: string;
  coreArgument: string;
  chapters: Chapter[];
}

export const masterSyllabus: Syllabus = {
  thesis: "The distinct attributes of the Human experience—Love, Reason, and Agency—constitute a living, irreducible ontology (\"The Humane\") that exercises dominion over the biological body, functions as the vital root of all civilization, and necessitates a Personal, Self-Sufficient, and Loving Creator.",
  coreArgument: "\"For Love, The Eternal God Gives us Reason and Agency.\"",
  chapters: [
    {
      id: "ch1",
      title: "The Breath and the Clay (Introduction)",
      objective: "To present the \"High Anthropology\" of the Humane and demonstrate the tragic cost of reducing the Human to the Machine or the Animal.",
      summary: "This introduction dismantles the reductive materialist view of the person. We establish that to see the Human as merely 'biological' is to miss the very essence of the Humane—the Triad of Reason, Love, and Agency.",
      sections: [
        { id: "1.1", title: "The Invitation: Three Visions of the Human", description: "Contrasting the Machine, the Animal, and the Image Bearer models of anthropology." },
        { id: "1.2", title: "The Cost of Reduction (The \"Price They Pay\")", description: "Analyzing the psychological and societal decay that follows the denial of human objective value." },
        { id: "1.3", title: "The Phenomenon: The Vital Triad", description: "Mapping the three faculties as the irreducible signature of the Humane." }
      ]
    },
    {
      id: "ch2",
      title: "The Spiritual Anatomy (The Dignity of the Faculties)",
      objective: "To define the Faculties as the \"Crown Jewels\" of the Human experience.",
      summary: "Each faculty—Reason, Love, and Agency—is independent yet interwoven. They are not biological accidents but purposeful gifts that allow for the perception of truth, the worship of the good, and the exercise of strength.",
      sections: [
        { id: "2.1", title: "Reason: The Dignity of Vision (νοῦς)", description: "Reason as the spark of intuition that perceives transcendent truth (The True)." },
        { id: "2.2", title: "Agency: The Dignity of Strength (θυμός)", description: "The irreducible power of the person to initiate sovereign movement in the world (The Effective)." },
        { id: "2.3", title: "Love: The Faculty of Worship (ἀγάπη)", description: "The motive force that orientates the entire person toward the highest good (The Good)." }
      ]
    },
    {
      id: "ch3",
      title: "Epistemology (The Trustworthiness of the Image)",
      objective: "To show that only the \"Image Bearer\" model validates knowledge.",
      summary: "Knowledge requires a bridge between the Mind and the World. If Reason is merely a survival module, we have no reason to trust it. Only as 'Image Bearers' can we claim a real grasp of the True.",
      sections: [
        { id: "3.1", title: "The Witness of Reason", description: "Why the analytical processing of a machine fails the test of truth-perception." },
        { id: "3.2", title: "The Witness of Culture", description: "How art and civilization testify to a reality beyond biological survival." }
      ]
    },
    {
      id: "ch4",
      title: "The Synthesis (The Logic of the Intertwined Gifts)",
      objective: "To demonstrate that the Triad is an ecosystem. Using the specific dependency logic from your research.",
      summary: "The faculties do not exist in isolation. They are co-constitutive. We use the Chariot Allegory to visualize how Reason guides, Agency moves, and Love directs the whole movement of the Human person.",
      sections: [
        { id: "4.1", title: "The Structural Unity (περιχώρησις)", description: "The mutual indwelling and inter-dependence of the three faculties." },
        { id: "4.2", title: "The Chariot Allegory (The Living Movement)", description: "A dynamic visualization of the person in purposeful motion toward a destination." }
      ]
    },
    {
      id: "ch5",
      title: "Ontology (The Root of Dependence)",
      objective: "To argue that the \"Humane\" is a contingent reality that hangs moment-by-moment on the Eternal Creator.",
      summary: "Nothing comes from nothing (Nemo Dat Quod Non Habet). The complex, purposeful faculties of the Human testify to a Source that possesses these attributes in their absolute form.",
      sections: [
        { id: "5.1", title: "The Argument from Lineage (Nemo Dat)", description: "If the Source is impersonal and irrational, the faculties cannot be personal and rational." },
        { id: "5.2", title: "The Positive Argument (The Logic of the Gift)", description: "Seeing the faculties as a divine gift necessitates a Giver." }
      ]
    },
    {
      id: "ch6",
      title: "Conclusion",
      objective: "To summarize the argument and extend the final invitation.",
      summary: "The Humane Argument is more than a syllogism; it is a description of the reality we inhabit. We are called to live according to the dignity of the faculties we have been given.",
      sections: [
        { id: "6.1", title: "Summary", description: "Recapping the movement from Faculty to Creator." },
        { id: "6.2", title: "The Invitation", description: "The call to steward the Image Bearer model in one's own life." },
        { id: "6.3", title: "Final Exhortation", description: "The enduring value of the Humane in a technological age." }
      ]
    }
  ]
};
