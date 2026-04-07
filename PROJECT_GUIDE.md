# The Humane Argument: Project Guide

The **Humane Argument** is a research-focused web application built to explore the "Vital Triad" of the human experience through high-fidelity visualizations and persistent annotation systems.

## 1. Philosophical Synthesis
The application is structured around the **Perichoresis** (mutual indwelling) of three core faculties:
- **Reason (Vision)**
- **Love (Worship)**
- **Agency (Strength)**

## 2. Key UI Features
- **Facutly Focal Points**: Interactive cards visualizing ontological dignity.
- **Triad Synthesis diagram**: Animated circular dependency visualization.
- **Chariot Allegory**: Dynamic movement model integrated into Chapter 4.
- **Annotation Engine**: Custom TipTap implementation for persistent philosophical research logs.

## 3. Technology Stack
- **Frontend**: Next.js 16 (App Router), React 19, Framer Motion.
- **Persistence**: Firebase Firestore + LocalStorage Hybrid Fallback.
- **Design**: Navy & Gold aesthetic using Vanilla CSS and Palatino typography.

## 4. Chapter Structure
The app includes 6 major chapters (18 sub-sections) covering:
- **Anthropology** (Intro)
- **Spiritual Anatomy** (Faculties)
- **Epistemology** (Knowledge Trust)
- **Synthesis** (Unity Allegory)
- **Ontology** (Dependence/Creator)
- **Conclusion**

## 5. Development Maintenance
- **Styles**: Check `src/app/globals.css` for the premium design variables.
- **Syllabus Data**: All content is managed in `src/lib/syllabus.ts`.
- **Persistence Logic**: Located in `src/lib/persistence.ts`.

---
> *The Humane is irreducible; the Image is trustworthy.*
