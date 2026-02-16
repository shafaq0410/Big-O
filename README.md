# 🔥 Big O Analyzer - Your Code's Complexity Exposed 🔥

<div align="center">

![Big O Vibes](https://img.shields.io/badge/Complexity-O(n²)%20%3F%20We'll%20tell%20ya-blueviolet?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/Powered%20By-Claude%20AI-00D9FF?style=for-the-badge&logo=anthropic)
![Vibes](https://img.shields.io/badge/Vibes-Immaculate-FF69B4?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-No%20Cap-success?style=for-the-badge)

### *When your algorithm hits different* 😤

**Paste code. Get roasted (respectfully). Learn complexity. Become 10x dev.**

[🚀 Try It Live](#) | [⭐ Star This Repo](#) | [🐛 Report Bugs](#)

---

</div>

## 🎯 What's This About?

Ever looked at your code and thought *"is this O(n) or am I cooked?"* 🤔

This tool uses **actual AI** (not your friend who took one CS class) to analyze your algorithm's time and space complexity. No cap, it's accurate AF.

### The Vibe Check ✨

```python
# Your code be like:
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):
            # ... nested loops go brrrr
            
# Big O Analyzer: "Bestie... that's O(n²) 💀"
```

---

## 🎮 Features That Hit Different

| Feature | Why It Slaps |
|---------|--------------|
| 🧠 **AI-Powered Analysis** | Claude Sonnet 4 - smarter than your TA |
| ⚡ **Instant Results** | Faster than your crush leaving you on read |
| 📊 **Time & Space Complexity** | Both complexities, because we're not basic |
| 🔍 **Detailed Breakdown** | Explains WHY your code is O(n²) (gently) |
| 🌈 **Multi-Language** | Python, JS, Java, C++ - we don't discriminate |
| 💅 **Beautiful UI** | Aesthetic = peak performance |

---

## 🚀 Quick Start (For the Impatient)

### Method 1: Just Use It Lol
1. Go to the [live site](https://big-o-one.vercel.app/)
2. Paste your sus code
3. Click "Analyze"
4. Get humbled (or validated)

### Method 2: Run Locally (Developer Arc)
```bash
# Clone this bad boy
git clone https://github.com/shafaq0410/Big-O.git

# Enter the matrix
cd Big-O

# Open index.html in browser
# (or use live server if you're fancy)
```

**That's it.** No npm install, no build step, no webpack config from hell. Just vibes. ✨

---

## 💡 How To Use (For CS Freshmen)

### Step 1: Paste Your Code
```javascript
// Example: Your sketchy algorithm
function findDuplicate(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = i+1; j < arr.length; j++) {
            if(arr[i] === arr[j]) return true;
        }
    }
    return false;
}
```

### Step 2: Get The Tea ☕
```
⏱️ Time Complexity: O(n²)
💭 "Nested loops detected. Your algorithm is taking the scenic route."

💾 Space Complexity: O(1)  
💭 "At least you're not wasting memory. W take."

📖 Detailed Analysis:
"This algorithm uses nested iteration to compare every element 
with every other element. While the space usage is chef's kiss,
the time complexity? Bestie, we need to talk about HashSets..."
```

### Step 3: Refactor Like a Chad
```javascript
// Glow up version ✨
function findDuplicate(arr) {
    const seen = new Set();
    for(let num of arr) {
        if(seen.has(num)) return true;
        seen.add(num);
    }
    return false;
}
// Now THAT'S O(n) energy 😎
```

---

## 🎭 The Complexity Hierarchy (Know Your Place)

```
O(1)      → "Built different" 😤
O(log n)  → "Binary search chad" 🧠
O(n)      → "Respectable. Acceptable." ✅
O(n log n) → "Merge sort supremacy" 📈
O(n²)     → "We've all been there..." 😅
O(2ⁿ)     → "Bro what are you doing" 💀
O(n!)     → "Traveling salesman has entered the chat" ☠️
```

---

## 🎨 Screenshots That Go Hard

<div align="center">

### Before Analysis
*"Maybe my nested loops aren't that bad?"*
![Copium](https://media.giphy.com/media/92wH9E5FNKtqVMPapQ/giphy.gif)

### After Analysis  
*"Oh... OH NO"*
![Reality Check](https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif)

</div>

---

## 🛠️ Tech Stack (For The Nerds)

- **Frontend**: HTML, CSS, Vanilla JS (we keep it 💯)
- **AI Engine**: Claude Sonnet 4 via Anthropic API
- **Styling**: Custom CSS (no Tailwind, we're not NPCs)
- **Fonts**: JetBrains Mono (because we have taste)
- **Deployment**: Vercel (one-click deploy goes crazy)
- **Framework**: None. We're built different. 😤

---

## 🎓 Learn Big O (Study Arc Activated)

### Common Complexities Explained

**O(1) - Constant Time** 
```python
def get_first(arr):
    return arr[0]  # One and done ✅
```
*Vibe: Instagram influencer - always consistent*

**O(n) - Linear Time**
```python
def find_max(arr):
    max_val = arr[0]
    for num in arr:  # Check 'em all
        if num > max_val:
            max_val = num
    return max_val
```
*Vibe: Main character energy - touches everyone once*

**O(n²) - Quadratic Time**
```python
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):  # Nested = sus
            # comparison logic
```
*Vibe: That one friend who overthinks everything*

**O(log n) - Logarithmic Time**
```python
def binary_search(arr, target):
    # Splits the problem in half each time
    # Galaxy brain moves only
```
*Vibe: Efficiency king/queen 👑*

---

## 🤝 Contributing (Join The Squad)

Found a bug? Want to add features? Pull requests welcome!

```bash
# Fork it
# Clone it  
# Code it
# Push it
# PR it

# Become a contributor 🌟
```

**Contribution Ideas:**
- [ ] Add more language support
- [ ] Complexity comparison feature
- [ ] Dark/Light theme toggle
- [ ] Code optimization suggestions
- [ ] Meme generator for bad complexity
- [ ] Achievement system (analyzed 100 algorithms 🏆)

---

## 🐛 Known Issues (We're Working On It)

- Sometimes the AI gets too real with the roasts 💀
- May cause existential crisis about your coding skills
- Addictive - you'll analyze EVERYTHING
- Might make you rewrite your entire codebase

---

## 📜 License

MIT License - Do whatever you want, we're chill like that 😎

---

## 🙏 Acknowledgments

- **Claude AI** - For being smarter than all of us
- **Stack Overflow** - For teaching us what NOT to do
- **LeetCode** - For the trauma that inspired this
- **Caffeine** - The real O(1) performance booster
- **You** - For actually reading this README (rare W)

---

## 💬 Testimonials (Real Developers™)

> *"This tool roasted my code harder than my code review"* - Anonymous SWE Intern

> *"Finally understand why my interviews keep failing"* - CS Student 

> *"O(n²)? More like O(no) 💀"* - Senior Dev (probably lying)

> *"I thought my algorithm was O(n). Turns out it was O(n³). Thanks, I hate it."* - Backend Developer

---

## 🎯 Roadmap (Coming Soon™)

- [x] Launch MVP
- [x] Make it look pretty
- [ ] Add complexity visualization graphs
- [ ] Integrate with GitHub Actions
- [ ] Mobile app (maybe)
- [ ] Chrome extension (imagine)
- [ ] Code comparison mode
- [ ] Multiplayer (??? why not)

---

## 📞 Contact & Socials

**Found a bug?** Open an issue
**Want to chat?** Start a discussion  
**Just vibing?** Star the repo ⭐

---

<div align="center">

### 🔥 If This Helped You, Drop a Star 🔥

**Remember: O(n²) isn't always bad... but it usually is.** 💀

Made with 💜 and questionable life choices

**Now go forth and optimize your algorithms, you beautiful nerd** 🚀

---

![Visitor Count](https://visitor-badge.laobi.icu/badge?page_id=shafaq0410.Big-O)
![GitHub Stars](https://img.shields.io/github/stars/shafaq0410/Big-O?style=social)
![GitHub Forks](https://img.shields.io/github/forks/shafaq0410/Big-O?style=social)

</div>

---

<div align="center">

```
  ____  _         ___    
 | __ )(_) __ _  / _ \   
 |  _ \| |/ _` || | | |  
 | |_) | | (_| || |_| |  
 |____/|_|\__, | \___/   
          |___/          
    Analyzer 2024
```

**No algorithms were harmed in the making of this tool**  
*(Except maybe yours)*

</div>
