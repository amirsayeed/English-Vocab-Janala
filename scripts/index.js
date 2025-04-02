const loadLessonsCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/levels/all")
    const data = await response.json()
    displayCategory(data.data)
}

const displayCategory = (levels) => {

    const lessonCategory = document.getElementById("lesson-category-container");
    levels.forEach(level => {
        const div = document.createElement("div");
        div.innerHTML = `
        <button id="all-btn" onclick = "loadWordsByCategory(${level.level_no})" class = "btn select-btn rounded-lg font-semibold text-sm hover:bg-[#422AD5] text-[#422AD5] hover:text-white">
            <span><i class = "fa-solid fa-book-open"></i><span>
            <span> Lesson - ${level.level_no}</span> 
        </button>
        `
        lessonCategory.appendChild(div);
    });

    const selectedCategory = document.getElementsByClassName("select-btn")
    for (const selectBtn of selectedCategory) {
        selectBtn.addEventListener("click", function () {
            removeActiveCategory();
            this.classList.add("active", "bg-[#422AD5]", "text-white");
        });
    }
}

const loadWordsByCategory = async (levelId) => {
    showElement("loading");
    const response = await fetch(`https://openapi.programming-hero.com/api/level/${levelId}`);
    const data = await response.json();
    if (data.data) {
        hideElement("loading");
    }
    displayWordsByLevel(data.data);
}

const displayWordsByLevel = (words) => {

    const wordsContainer = document.getElementById("lesson-words-container");
    wordsContainer.innerHTML = '';

    if (words.length == 0) {
        hideElement("loading");
        const div = document.createElement("div");
        div.classList.add("col-span-full", "flex", "flex-col", "justify-center", "items-center", "gap-2", "py-4");
        div.innerHTML = `
        <img class="w-[100px]" src="./assets/alert-error.png" alt=""/>
        <p class="hind-siliguri text-sm text-[#79716B]"> এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
        <p class="hind-siliguri text-2xl font-medium text-[#292524]"> নেক্সট Lesson এ যান </p>
        `
        wordsContainer.appendChild(div);
        return;
    }

    words.forEach((word) => {
        const div = document.createElement("div");
        div.classList.add('bg-[#F8F8F8]', 'rounded-lg');
        div.innerHTML = `
        <div class = "card h-[250px] card-border bg-base-100 hover:bg-[#00BCFF60] shadow-md p-6 space-y-3">
            <div class ="flex flex-col justify-center items-center gap-4">
                <h2 class = "inter text-[#000000] font-bold text-3xl">${word.word}</h2> 
                <p class="inter text-[#000000] font-medium text-lg">Meaning /Pronounciation</p>
                <p class = "hind-siliguri text-[#18181B] font-semibold text-xl text-center px-2">
                <span>"${word?.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</span>
                <span>/</span>
                <span>${word.pronunciation}"</span>
                </p>
            </div>
            <div class="flex justify-between">
                <button class="btn bg-[#1A91FF1A]" onclick="loadWordDetails('${word.id}')">
                <i class ="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF1A]" onclick="pronounceWord('${word.word}')">
                <i class ="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordsContainer.appendChild(div);
    })
}

const loadWordDetails = async (wordId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/word/${wordId}`);
    const data = await response.json();
    displayWordDetails(data.data);
}

const displayWordDetails = (word) => {
    document.getElementById("word_details").showModal();
    const detailContainer = document.getElementById("details-container");

    detailContainer.innerHTML = `
    <div class = "card card-border bg-base-100 p-4">
        <div class ="space-y-3 text-[#000000]">
        <h2 class = "poppins text-3xl font-semibold"> ${word.word} 
        <span> ( <i class = "fa-solid fa-microphone"></i>: ${word.pronunciation})</span></h2> 
        <p class="poppins font-semibold text-2xl">Meaning</p>
        <p class="hind-siliguri font-medium text-2xl">${word?.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>
        <p class = "font-semibold text-2xl"> Example </p> 
        <p class="poppins text-xl">${word.sentence} </p>
        <p class = "hind-siliguri font-medium text-2xl"> সমার্থক শব্দ গুলো </p>
        <div id="synonyms-container" class="flex gap-2 poppins">
        
        </div>
        </div> 
    </div>
    `
    const synonyms = word?.synonyms;
    if (synonyms?.length) {
        const synonymsContainer = document.getElementById("synonyms-container");

        for (const synonym of synonyms) {
            const button = document.createElement("button");
            button.classList.add("btn", "bg-[#EDF7FF]", "rounded-lg", "p-2", "text-center", "text-xl", "font-medium");
            button.innerText = synonym;
            synonymsContainer.appendChild(button);
        }
    }
}

const showElement = (id) => {
    document.getElementById(id).style.display = "block";
}

const hideElement = (id) => {
    document.getElementById(id).style.display = "none";
}

const removeActiveCategory = () => {
    const activeBtn = document.getElementsByClassName("active");
    for (const btn of activeBtn) {
        btn.classList.remove("active", "bg-[#422AD5]", "text-white");
    }
}

const pronounceWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN';
    window.speechSynthesis.speak(utterance);
}

loadLessonsCategory()