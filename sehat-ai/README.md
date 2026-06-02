# 🌿 Sehat AI — Pakistan Ka Pehla AI Health Assistant

Pakistan ka pehla Roman Urdu AI health assistant, powered by Google Gemini.

---

## 🚀 Deploy Karne Ke Steps (Step by Step)

### Step 1: GitHub Pe Upload Karo

1. **github.com** pe jao
2. **"New repository"** click karo (+ icon top right mein)
3. Repository name likho: `sehat-ai`
4. **Public** select karo
5. **"Create repository"** click karo

Ab terminal ya GitHub Desktop se yeh commands chalao:
```bash
git init
git add .
git commit -m "Sehat AI - first commit"
git branch -M main
git remote add origin https://github.com/AAPKA_USERNAME/sehat-ai.git
git push -u origin main
```

---

### Step 2: Vercel Pe Deploy Karo

1. **vercel.com** pe jao
2. **"Add New Project"** click karo
3. GitHub account connect karo (agar nahi kiya)
4. `sehat-ai` repository select karo
5. **"Import"** click karo

---

### Step 3: Gemini API Key Add Karo (ZAROORI!)

Vercel mein:
1. Project settings mein jao
2. **"Environment Variables"** click karo
3. Yeh add karo:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** Aapki Gemini API key (aistudio.google.com se)
4. **"Save"** karo

---

### Step 4: Deploy!

1. **"Deploy"** button dabao
2. 2-3 minute wait karo
3. Aapki site live ho jayegi! 🎉

URL kuch aisa hoga: `https://sehat-ai-xyz.vercel.app`

---

## 🔑 Gemini API Key Kaise Len?

1. **aistudio.google.com** pe jao
2. Google account se login karo
3. **"Get API Key"** click karo
4. **"Create API Key"** click karo
5. Key copy karo — Vercel mein paste karo

**Free limit:** Gemini 1.5 Flash mein 1 million tokens/month FREE hain!

---

## 🛠️ Local Development (Apne Computer Pe Chalana)

```bash
# 1. Dependencies install karo
npm install

# 2. .env.local file banao
cp .env.local.example .env.local
# Ab .env.local mein apni Gemini API key daalo

# 3. Start karo
npm run dev

# 4. Browser mein kholo
# http://localhost:3000
```

---

## 📱 Features

- ✅ Roman Urdu mein AI jawab
- ✅ Chat history save hoti hai
- ✅ Mobile responsive
- ✅ Quick suggestions
- ✅ Emergency alerts
- ✅ Professional medical disclaimer
- ✅ Session management

---

## 🔄 Update Karna

Code mein koi bhi change karo aur yeh run karo:
```bash
git add .
git commit -m "Update: [kya change kiya]"
git push
```
Vercel automatically redeploy kar dega! ⚡

---

## 📞 Emergency Numbers (Pakistan)

- **Rescue / Ambulance:** 1122
- **Edhi Foundation:** 115
- **Chippa:** 1020

---

Made with ❤️ for Pakistan 🇵🇰
