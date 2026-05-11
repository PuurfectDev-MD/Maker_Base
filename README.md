# What is Maker Base?

Maker Base is a dedicated platform for makers and developers to document concepts, ideas, and methodologies for future reference. It focuses on human-written knowledge to ensure deep understanding of internal systems, components, and workflows without relying on repetitive AI queries.

---

## The Motivation
When working on complex projects, forgetting the minute details of how a component or signal functions was incredibly frustrating for me. So I gave my best shot to solve that very issue. Maker Base was born from my desire to have a "Master Knowledge Base" where every detail is documented by the person who learned it. And also to eliminate the guilt that I have when not understanding what Im working with in a project :)

The goal is to move away from asking AI the same questions repeatedly and instead build a personal (or community) library of verified, human-explained technical notes for thorough understanding concepts and mechanisms so you dont feel guilty when vibecoding some parts of your project to speed things up. (You CAN vibe code the stuff you can do it yourself and understand so let makerbase help you understand those fundamentals! )

Maker base sole purpose is to make you get concepts and navigate the ever evolving techincal field with strong fundamentals.


## Features
- Write and organise notes by tags/topics
- View public notes visible without login
- Editor with tons of feature for a good writing exprience
- Signup and Login with Google and email with password
- Three themes — warm ivory, blueprint, chalkboard
- Activity calendar and monthly chart on your about page
- Option to private your notes
- Edit, update and delete your notes
- Words count, streak, dot count all available in user dashboard


---

## Common Use Cases

* **How-To Guides:** Specific implementation steps for hardware or software.
    * *Example:* How to properly wire an SPI TFT display to an Arduino.
    * *Example:* How to implement skeletons in SvelteKit 5.
* **Conceptual Deep-Dives:** Breaking down complex theories.
    * *Example:* What is a PWM signal and why is it necessary?
    * *Example:* Understanding Object-Oriented Programming (OOP).
* **System Analysis:** Explaining the "under the hood" mechanics.
    * *Example:* How do compilers work?
    * *Example:* How I2C signals are converted to audio from a microphone module.

---

## Built With

* **Framework:** [SvelteKit 5](https://svelte.dev/) 
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Backend & Auth:** [Supabase](https://supabase.com/)
* **Rich Text Editor:** [Tiptap](https://tiptap.dev/)
* **Data Visualization:** [LayerChart](https://layerchart.com/)
* **For caching:** [Redis](https://app.redislabs.com/)
---


## Future Vision

* **Community Hub:** A global chat and real-time feed for new maker posts.
* **Maker Journaling:** Capabilities to track day-to-day project progress.
* **Project Synthesis:** Create a "Project" and link existing notes to generate a Master PDF.
    * *Example:* Link your "I2C" and "Audio Module" notes to automatically generate a prerequisite summary and wiring guide for a Music Player project.

---

## Contributing

I am actively looking for contributors to help bring these ideas to life! If you're interested in any of the following, feel free to open an issue or submit a PR.

### AI implementation

* **AI Fact-Checking:** Implement an AI-driven fact-checking system via API to help users validate written content in real-time.
Refer to this if you are planning on contributing for this feature - [Check this out](https://www.blocknotejs.org/docs/features/ai). Im not looking for AI text generation though, just AI correction.

![Ai feature image](/images/aifeature.png)

### Journalling 

* **Export & Project Generation:** Develop a feature to bundle related notes into a "Project" and generate consolidated PDF or Markdown file exports.

### Social & Community

* **Account Following System:** A social layer allowing users to follow fellow makers, stay updated on new notes, and even chat with them? (thats rather optimistic though.) Im thinking something close to what Github has!

* **Global Community Hub:** Completion of the Community Page, featuring real-time chat rooms organized by tags (e.g., #electronics, #javascript, #unity).

![Community page](/images/community.png)

---

I would be more than happy to work with you on any of these features or more. To contribute -

1. **Pick a feature** from the options given above or any bug you manage to find.
2. **Open an Issue** to discuss your planned implementation.
3. **Fork the repo** and submit a pull request.

I cant wait to work with you :) 

---

## Contact & Feedback

If you have suggestions for more features, bug fixes, or want to collaborate, feel free to reach out from the contact at :
🔗 **Contact:** [manishd.is-a.dev](https://manishd.is-a.dev)


---
## AI USE
For a lot of debugging (😥), help with the setup of google auth, creating migration scripts for db policies, creating rpc functions, info page load function and ui, minor UI tweaks and brainstorming ideas.
-(for code written by Manish)

---
*Created with ❤️ by a Maker, for Makers.*