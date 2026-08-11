# ![banner](https://github.com/edwardmcham/ChessSmackdown/blob/main/help/Content/img/chess_smackdown_banner.png)⚔️ Chess Smackdown (AI)

**A card-battle chess variant where captures are settled by a draw, not a rule.**

[**▶ Play now**](https://edwardmcham.github.io/ChessSmackdown/) · [📖 Player's Guide (HTML5)](https://edwardmcham.github.io/ChessSmackdown/help/) · [📄 Player's Guide (PDF)](https://edwardmcham.github.io/ChessSmackdown/help/Content/Resources/PrintPDF/ChessSmackdownPlayersGuide.pdf)

*Free, non-commercial browser game. No install, no account, no ads.*

---

## What is Chess Smackdown?

Standard chess, with one twist: **pieces don't just take each other — they fight for it.**

Move a piece onto an enemy square and both sides draw a card. Higher card wins the battle; the loser's piece comes off the board. Every capture is a coin flip with teeth, which means the "better" position doesn't always win the exchange — and that's the point.

Invented at a neighbor's kitchen table with his two sons (ages 15 and 12), Chess Smackdown started as a house rule and grew into a full digital build: a single-file browser game with a from-scratch AI opponent, animated card battles, sound design, and a complete player's guide.

## Why It Plays Differently Than Chess

- **🃏 Card battles decide every capture.** No capture is automatic — draw, compare, and the loser's piece is removed.
- **♟️ Check exists. Checkmate doesn't.** A king in check just means it's in danger — the only way to win is to actually capture it in a **King Battle**.
- **👑 King Battles are best-of-three.** Attack the King and you're in a 3-round battle for the game. Win the majority, win the game.
- **🎯 Snipers change the math.** Draw a Sniper and you auto-win the battle *and* remove a bonus piece — no card can beat it.
- **☠️ Armageddon.** Two Snipers collide in the same battle, and both pieces die — then each side loses up to three more. Unconditional, no exceptions, no mercy.
- **🤖 Play a real AI opponent.** Five distinct personalities (Aggressive, Cautious, Reckless, Positional, Random) running expectiminimax search with configurable thinking time, from instant to 3 minutes.

## Play Now

👉 **[edwardmcham.github.io/ChessSmackdown](https://edwardmcham.github.io/ChessSmackdown/)**

Choose Human (pass & play) or Computer, draw for color, and go. Full rules are in the in-game panel and the [Player's Guide](https://edwardmcham.github.io/ChessSmackdown/help/).

## Built With

- Vanilla JavaScript, HTML, and CSS — single self-contained file, no framework, no build step for the game itself
- Expectiminimax search with iterative deepening for the AI opponent
- Web Audio API and Web Speech API for battle sound effects and piece "smack talk"
- [MadCap Flare](https://www.madcapsoftware.com/products/flare/) for the HTML5 Help and printable PDF player's guide
- Node.js + jsdom for AI and game-logic test coverage, with Monte Carlo simulation validating move-selection probability

## Documentation

Full rules, King Battle mechanics, Sniper/Armageddon details, and how to play against the AI are documented in the player's guide:

- **[HTML5 Help](https://edwardmcham.github.io/ChessSmackdown/help/)** — searchable, browsable
- **[Printable PDF](https://edwardmcham.github.io/ChessSmackdown/help/Content/Resources/PrintPDF/ChessSmackdownPlayersGuide.pdf)** — for offline reference

## Credits & Attribution

Chess Smackdown uses several third-party audio and visual assets, credited in full in the opening comment block of the game file. Highlights:

- Sound effects from [Freesound.org](https://freesound.org) (CC-BY 3.0 / 4.0) and [Pixabay](https://pixabay.com/sound-effects/) (Pixabay Content License)
- Sniper and Armageddon animations generated with [Craiyon](https://www.craiyon.com/)

## License & Non-Commercial Notice

This project is released for free, non-commercial entertainment and portfolio purposes. Two embedded audio assets aren't cleared for commercial use — see the file's attribution header for the full breakdown. Not licensed for commercial redistribution.

## About the Developer

Built by **Edward McHam**, Senior Technical Writer / Documentation Engineer — part game, part docs-as-code case study. More projects at **[emcham.io](https://edwardmcham.github.io)**.