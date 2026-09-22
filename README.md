# Grandma TV

### A Zero-Interface Interaction Model for Simplified Media Consumption

**Grandma TV** is an experimental **Human-Computer Interaction (HCI)** system that explores how digital media interfaces can be simplified by reducing the number of interaction choices presented to the user.

Instead of presenting menus, buttons, navigation bars, icons, or on-screen controls, Grandma TV uses the **entire screen as an interaction surface**.

The prototype uses a simple spatial interaction model:

| User Action          | System Response  |
| -------------------- | ---------------- |
| Left click anywhere  | Previous channel |
| Right click anywhere | Next channel     |

The goal is not to remove functionality, but to **reduce the interaction required to access that functionality**.

> **Core idea: Increase content variety without increasing interaction complexity.**

---

## 1. HCI Motivation

Modern media platforms provide access to enormous amounts of content, but this accessibility often comes with increasing interface complexity.

A typical media interface may require users to:

* identify buttons
* interpret icons
* locate navigation controls
* operate menus
* scroll through lists
* distinguish between different interactive elements
* understand changing interface layouts

For users who are unfamiliar with conventional graphical user interfaces, these interactions can introduce unnecessary cognitive and motor demands.

Grandma TV explores an alternative design approach:

> **What if the interface itself became almost invisible?**

Rather than asking the user to understand the interface, the system provides a small number of predictable interaction rules.

---

# 2. Research Problem

The project investigates the relationship between:

**Content variety** and **interaction complexity**.

Traditional media interfaces often increase the number of interaction elements as the number of available channels or content sources increases.

Grandma TV explores whether this relationship can be changed.

```text
Traditional Interface

More Content
     ↓
More Menus
     ↓
More Buttons
     ↓
More Navigation
     ↓
Higher Interaction Complexity
```

Grandma TV proposes:

```text
More Content
     ↓
Same Interaction Model
     ↓
Left Click / Right Click
     ↓
Lower Interaction Complexity
```

The system therefore treats **interaction simplicity as a design constraint**, rather than adding interface elements as functionality grows.

---

# 3. HCI Research Focus

Grandma TV is primarily an **HCI experiment**, rather than simply a browser extension.

The project investigates several HCI concepts.

### 3.1 Interface Minimization

The system deliberately removes visible controls.

There are no:

* navigation bars
* channel buttons
* menus
* thumbnails
* search boxes
* visible interaction areas

The user interacts directly with the content environment.

---

### 3.2 Spatial Interaction

The entire screen acts as an interaction region.

Instead of:

> "Move the mouse to the next-channel button."

the interaction becomes:

> "Click anywhere."

This changes the relationship between **interaction location** and **system action**.

The spatial location of the click becomes largely irrelevant.

---

### 3.3 Reduced Choice

Conventional interfaces expose many possible actions.

Grandma TV intentionally provides only two primary navigation actions:

```text
LEFT CLICK  →  PREVIOUS
RIGHT CLICK →  NEXT
```

This creates a small interaction vocabulary.

The user does not need to discover which part of the interface performs the action.

---

### 3.4 Consistency

The same interaction rule is maintained regardless of the currently displayed content.

For example:

```text
Citizen TV
    ↓
Right Click
    ↓
KTN TV
    ↓
Right Click
    ↓
KCB TV
    ↓
Right Click
    ↓
ZEE DUNIA
```

The interface does not change its navigation mechanism as the content changes.

---

### 3.5 Recognition vs. Recall

Traditional interfaces often require users to recognize controls from visual elements.

Grandma TV instead attempts to establish a small number of memorable rules:

```text
Left = Back
Right = Forward
```

This provides an opportunity to investigate whether a minimal interaction vocabulary can reduce the need to visually search for controls.

---

# 4. Interaction Model

The current prototype implements a binary navigation model.

```text
                  SCREEN
        ┌─────────────────────────┐
        │                         │
        │      VIDEO CONTENT      │
        │                         │
        │                         │
        │                         │
        │                         │
        └─────────────────────────┘
              ↙             ↘
        LEFT CLICK      RIGHT CLICK
             ↓               ↓
        PREVIOUS           NEXT
         CHANNEL           CHANNEL
```

The interaction surface is deliberately larger than a conventional button.

Instead of:

```text
[ Previous ]       [ Next ]
```

the prototype effectively uses:

```text
┌─────────────────────────────┐
│                             │
│       CLICK ANYWHERE        │
│                             │
└─────────────────────────────┘
```

---

# 5. Design Principles

The prototype follows several HCI design principles.

### Principle 1 — Minimize Interaction Choices

The user should not have to choose between many controls.

### Principle 2 — Make Actions Spatially Independent

The user should not have to accurately position the pointer over a particular button.

### Principle 3 — Maintain Consistent Interaction

The same action should produce the same result throughout the system.

### Principle 4 — Reduce Visual Interface Elements

The interface should avoid presenting unnecessary controls.

### Principle 5 — Preserve Functionality

Reducing interface complexity should not require removing access to multiple content sources.

### Principle 6 — Support Learnability

The interaction model should be understandable after minimal instruction.

---

# 6. System Implementation

Grandma TV is implemented as a Microsoft Edge browser extension using **Manifest V3**.

The system operates on normal YouTube pages rather than embedding YouTube inside an extension interface.

### Architecture

```text
┌──────────────────────────────┐
│        Microsoft Edge        │
│                              │
│        YouTube Page          │
│                              │
│  ┌────────────────────────┐  │
│  │    Video / Content     │  │
│  │                        │  │
│  │ Transparent Interaction│  │
│  │        Overlay         │  │
│  └────────────────────────┘  │
│                              │
└──────────────┬───────────────┘
               │
        Mouse Interaction
               │
       ┌───────┴────────┐
       │                │
   Left Click       Right Click
       │                │
       ↓                ↓
   Previous            Next
```

The extension injects a transparent full-screen interaction layer over the YouTube page.

The layer captures mouse interaction without introducing visible interface controls.

---

# 7. Current Interaction Implementation

The prototype currently supports:

* Full-screen transparent interaction surface
* Left-click navigation
* Right-click navigation
* Suppression of the standard right-click context menu
* Multiple configurable channels
* Automatic identification of the currently selected channel
* Navigation between configured YouTube videos

Current channels include:

```text
Citizen TV
KTN TV
KCB TV
ZEE DUNIA
```

The channel list is stored separately from the interaction logic, allowing additional channels to be added without redesigning the interface.

---

# 8. Project Structure

```text
GrandmaTV/
│
├── manifest.json
├── background.js
├── content.js
└── shows.js
```

### `manifest.json`

Defines the browser extension and its permissions.

### `content.js`

Implements the interaction model and captures mouse events.

### `shows.js`

Contains the available channels/content sources.

### `background.js`

Provides background extension functionality.

---

# 9. Why This Is an HCI Experiment

Grandma TV can be viewed as an investigation into **interface complexity rather than interface functionality**.

A conventional approach might ask:

> "How can we design a better TV interface?"

Grandma TV asks a different question:

> **"How much interface do we actually need?"**

This distinction is important.

The system does not attempt to provide a more visually sophisticated interface.

Instead, it experiments with **removing the interface altogether** while retaining basic navigation functionality.

---

# 10. Proposed HCI Evaluation

A future study can compare Grandma TV with a conventional media interface.

For example:

### Condition A — Conventional Interface

Participants navigate YouTube using the normal interface.

### Condition B — Grandma TV

Participants navigate using:

```text
Left click  → Previous
Right click → Next
```

Participants could be asked to perform tasks such as:

> "Navigate from Citizen TV to ZEE DUNIA."

---

## Evaluation Metrics

### Task Completion Time

How long does a participant take to complete a navigation task?

### Task Success Rate

How often does the participant successfully reach the requested channel?

### Interaction Count

How many mouse interactions are required?

### Error Rate

How frequently does the participant perform an unintended action?

### Learning Time

How long does it take participants to understand the interaction model?

### Usability

A standardized questionnaire such as the **System Usability Scale (SUS)** could be used.

### Cognitive Workload

A workload instrument such as **NASA-TLX** could be considered if the study requires workload measurement.

---

# 11. Example Research Questions

The project can be developed around questions such as:

### RQ1

**Can a zero-interface interaction model reduce the number of interaction steps required to navigate digital media content?**

### RQ2

**How does removing visible navigation controls affect task completion time and error rate?**

### RQ3

**How quickly can users learn a two-action spatial interaction model?**

### RQ4

**Does a globally clickable interaction surface reduce the need for precise pointer positioning?**

### RQ5

**How does interface minimization affect perceived usability and cognitive workload during media navigation?**

---

# 12. Hypothesis

A possible experimental hypothesis is:

> **H1:** A simplified two-action interaction model can reduce navigation interaction complexity for selected media-navigation tasks compared with a conventional graphical interface.

A corresponding null hypothesis could be:

> **H0:** There is no statistically significant difference in navigation interaction complexity between the simplified interaction model and the conventional interface.

These hypotheses can be tested experimentally rather than assumed from the prototype.

---

# 13. Intended Use Case

The original motivation for Grandma TV came from a practical household scenario.

A computer connected to a television can provide access to online media, but conventional computer interfaces can introduce unnecessary interaction requirements for users who primarily want to watch content.

The prototype therefore explores an appliance-like interaction model:

```text
Computer
   +
Internet
   +
Television
   +
Minimal Interaction
        ↓
   Media Appliance
```

The objective is not to redesign YouTube itself.

Instead, Grandma TV explores whether an existing computer can be transformed into a simpler media-consumption system through an interaction layer.

---

# 14. Limitations

The current prototype has several limitations.

### Browser Dependency

The system currently depends on Microsoft Edge and YouTube.

### Limited Interaction Vocabulary

Only two primary navigation actions are currently supported.

### Limited Content Model

Channels are manually configured rather than dynamically discovered.

### Context Sensitivity

Global mouse interaction may conflict with normal webpage interactions.

### Accessibility Trade-offs

A design that simplifies one interaction dimension may create difficulties for users who cannot comfortably use a mouse or distinguish mouse buttons.

Therefore, the project should not assume that minimal interaction is universally better.

The purpose of the research is to **measure the effects of the interaction model**.

---

# 15. Future Work

Possible future development includes:

* Fullscreen activation
* Automatic startup
* Larger channel collections
* Remote-control integration
* Keyboard interaction
* Voice interaction
* Gesture-based navigation
* Accessibility alternatives
* Persistent user channel configuration
* Automatic recovery from YouTube navigation changes
* Usability testing with different user groups
* Controlled HCI experiments
* Comparative evaluation against conventional interfaces

---

# 16. Broader HCI Research Direction

Grandma TV can be extended beyond television.

The same principle could be investigated in other domains where users need to access a small set of repeated actions without navigating a conventional GUI.

For example:

```text
Media Players
      ↓
Information Kiosks
      ↓
Public Displays
      ↓
Smart TVs
      ↓
Educational Systems
      ↓
Assistive Interfaces
```

This raises a broader HCI question:

> **Can functionality be increased while keeping the interaction vocabulary constant?**

This is the central research direction of the project.

---

# 17. Conceptual Contribution

Grandma TV proposes a simple interaction principle:

> **Increase content variety without increasing interaction complexity.**

Rather than scaling the interface with the number of available functions, the system keeps the interaction vocabulary small and scales the content behind it.

Conceptually:

```text
                CONTENT
                   ↑
                   │
                   │       ●
                   │      ●
                   │     ●
                   │    ●
                   │   ●
                   │  ●
                   │ ●
                   └────────────────→
                     Interaction Complexity
```

The research question is whether the interaction model can remain stable while the number of available content sources increases.

---

# 18. Project Status

**Status:** Experimental HCI Prototype

The current implementation demonstrates the core interaction concept.

The next stage is to move from a working prototype toward **empirical HCI evaluation**.

That means measuring the system with real participants rather than assuming that a simpler interface automatically produces better usability.

---

# 19. Project Identity

**Project:** Grandma TV

**Domain:** Human-Computer Interaction (HCI)

**Areas:**

* Interaction Design
* User Interface Design
* Accessibility
* Usability
* Spatial Interaction
* Interface Minimization
* Cognitive Load
* Media Interaction

**Prototype:** Microsoft Edge Extension

---

## Core Research Idea

> **Grandma TV explores whether a digital media system can provide more content without requiring a more complex interface.**

The project treats **simplicity as an interaction design variable that can be experimentally measured.**
