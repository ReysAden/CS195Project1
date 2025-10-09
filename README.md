# Connections Clone

## Project Description

This is a clone of the popular NYT Connections game where players must identify four distinct categories among 16 words. Each category contains four words that share a common theme. Players have 4 attempts to correctly identify all groups before the game ends.

**Features:**
- Interactive grid of 16 word tiles
- Visual feedback for selected items
- Smooth animations when connections are found
- Color-coded groups (Planets, Colors, Animals, Fruits)
- Shuffle functionality 
- Debug output panel for development
- Mobile-responsive design

## What I Learned

The "new thing" I learned was **CSS transitions** and how to integrate them with JavaScript for smooth animations. Specifically, I learned:

- How to use `transition: transform 0.5s ease-in-out` to create smooth movement animations
- The difference between `translateY()`, `scale()`, and other transform functions
- How timing functions like `linear`, `ease-in-out`, and `ease` affect animation feel
- Synchronizing JavaScript `setTimeout()` with CSS transition durations
- How to chain animations (jump up → move in DOM → settle down)

**Example usage:**
```css
.grid-item {
    transition: transform 0.5s ease-in-out;
}
```
```javascript
item.style.transform = 'translateY(-20px) scale(1.05)'; // Animates smoothly
```

## Challenges Faced

The biggest challenge was getting the connection animations to work exactly like the real Connections game. The main issues were:

1. **Abrupt DOM movements**: When using `insertBefore()` to move elements, they would "teleport" instantly to new positions
2. **Animation timing**: Synchronizing the visual animation with DOM manipulation required careful timing with `setTimeout()`
3. **Smooth transitions**: Understanding that transitions only animate when properties actually change, not just when classes are added

## AI Usage Documentation

**AI Tool Used:** Claude (Anthropic)

**What I used AI for:**
- Understanding CSS transition syntax and timing functions
- Learning how to combine multiple transform functions (`translateY()` + `scale()`)
- Debugging animation timing issues
- Guidance on DOM manipulation methods like `insertBefore()`

**Specific instances:**

1. **CSS Transition Breakdown**: AI explained each part of `transition: background-color 0.3s, transform 0.5s ease-in-out;`
   - Helped me understand that this creates two separate transitions
   - Explained what "ease-in-out" means (slow → fast → slow)

2. **Transform Functions**: When I asked about `item.style.transform = 'translateY(-20px) scale(1.05)';`, AI broke down:
   - `translateY(-20px)` = Move up 20 pixels
   - `scale(1.05)` = Make 5% bigger
   - How to combine multiple transforms

3. **Animation Timing**: AI guided me through the setTimeout timing issue:
   ```javascript
   setTimeout(() => {
       // DOM manipulation here
   }, 500); // Must match CSS transition duration
   ```

## AI Reflection

AI assistance worked well for understanding CSS concepts and debugging timing issues - it provided clear explanations with specific examples that I could immediately test. The step-by-step breakdown approach helped me learn the underlying concepts rather than just copying code. However, AI sometimes suggested overly complex solutions initially, and I had to ask for simpler approaches that better matched my learning level and project scope.

## How to Play

1. Click on four words that you think share a common theme
2. Click "Submit" to check your guess
3. If correct, the group will be highlighted and moved to the top
4. If incorrect, you lose one of your 4 tries
5. Use "Shuffle" to rearrange the remaining words
6. Win by finding all four groups before running out of tries

---

*Built for Drake CS195: Full Stack Web Development - Project One*
