
// Toggle Menu for Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
/*
// Form Submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert('ขอบคุณสำหรับข้อความของคุณ!');
        document.getElementById('contact-form').reset();
    } else {
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
    }
});
*/

let currentLang = 'th'; // ภาษาเริ่มต้น

// ฟังก์ชันโหลดภาษา
async function loadLanguage(lang) {
    const response = await fetch(`lang/${lang}.json`);
    const data = await response.json();
    return data;
}

// ฟังก์ชันอัปเดตข้อความในหน้าเว็บ
function updateContent(data) {
    document.getElementById('welcome').textContent = data.welcome;
    document.getElementById('about-link').textContent = data.about;
    document.getElementById('projects-link').textContent = data.projects;
    document.getElementById('skills-link').textContent = data.skills;
    document.getElementById('contact-link').textContent = data.contact;
    document.getElementById('about-title').textContent = data.about;
    document.getElementById('hello-title').textContent = data.hello;
    document.getElementById('projects-title').textContent = data.projects;
    document.getElementById('skills-title').textContent = data.skills;
    document.getElementById('contact-title').textContent = data.contact;
    document.getElementById('name').placeholder = data.name_placeholder;
    document.getElementById('email').placeholder = data.email_placeholder;
    document.getElementById('message').placeholder = data.message_placeholder;
    document.getElementById('submit-btn').textContent = data.submit;
    document.getElementById('footer-text').textContent = data.footer;
}

// สลับภาษา
document.getElementById('lang-th').addEventListener('click', async () => {
    if (currentLang !== 'th') {
        currentLang = 'th';
        const data = await loadLanguage('th');
        updateContent(data);
    }
});

document.getElementById('lang-en').addEventListener('click', async () => {
    if (currentLang !== 'en') {
        currentLang = 'en';
        const data = await loadLanguage('en');
        updateContent(data);
    }
});

// โหลดภาษาเริ่มต้นเมื่อหน้าเว็บโหลด
window.addEventListener('load', async () => {
    const data = await loadLanguage(currentLang);
    updateContent(data);
});


// ฟังก์ชันสลับธีม
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
       // themeToggle.textContent = 'โหมดกลางคืน';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
       // themeToggle.textContent = 'โหมดกลางวัน';
        localStorage.setItem('theme', 'dark');
    }
}

// ตรวจสอบธีมที่ผู้ใช้เลือกไว้ล่าสุด

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('theme-toggle');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'โหมดกลางวัน';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = 'โหมดกลางคืน';
    }
}


// เพิ่ม Event Listener สำหรับปุ่มสลับธีม
//document.getElementById("theme-toggle").checked = true ;
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// โหลดธีมเมื่อหน้าเว็บโหลด
window.addEventListener('load', loadTheme);

// ฟังก์ชันอัปเดตข้อความในหน้าเว็บ
function updateContent(data) {

    document.getElementById('about-link').textContent = data.about;
    document.getElementById('projects-link').textContent = data.projects;
    document.getElementById('skills-link').textContent = data.skills;
    document.getElementById('contact-link').textContent = data.contact;

    //banner section
   
    document.querySelector(" #left .hello").textContent = data.hello;
    document.querySelector("#left .name h1").textContent = data.myName;
    document.querySelector("#left .description").textContent = data.description;

    document.querySelector("#education .container  h2").textContent = data.education;
    //exp sut
    document.querySelector("#education .container  p").textContent = data.yearOfBachelor;
    document.querySelector(".project-item .data#suranaree h3").textContent = data.suranaree;
    document.querySelector(".project-item .data#suranaree #bachelor").textContent = data.bachelor;
    //exp blm
    document.querySelector(".project-item .data#banglamung  p").textContent = data.yearOfHighSchool;
    document.querySelector(".project-item .data#banglamung h3").textContent = data.banglamung;
    document.querySelector(".project-item .data#banglamung #plan").textContent = data.plan;
    //exp pc5
    document.querySelector(".project-item .data#PattayaCity5School  p").textContent = data.yearOfSchool;
    document.querySelector(".project-item .data#PattayaCity5School h3").textContent = data.PattayaCity5School;
    //exp ak
    document.querySelector(".project-item .data#AksornPattayaSchool  p").textContent = data.yearOfPrimary;
    document.querySelector(".project-item .data#AksornPattayaSchool h3").textContent = data.AksornPattayaSchool;

    //work exp
    document.querySelector("#work-experience .container  h2").textContent = data.workEXP;
    //exp KFC
    document.querySelector(".project-item .data#KFC p").textContent = data.yearOfWorkKFC;
    document.querySelector(".project-item .data#KFC h3").textContent = data.kfc;
    document.querySelector(".project-item .data#KFC #description").textContent = data.kfcDescription;

    //exp army
    document.querySelector(".project-item .data#army p").textContent = data.yearOfWorkArmy;
    document.querySelector(".project-item .data#army h3").textContent = data.army;
    document.querySelector(".project-item .data#army #description").textContent = data.armyDescription;
    
    //exp rukcom
    document.querySelector(".project-item .data#rukcom p").textContent = data.yearOfWorkRukCom;
    document.querySelector(".project-item .data#rukcom h3").textContent = data.RukCom;
    document.querySelector(".project-item .data#rukcom #description").textContent = data.RukComDescription;

    //exp freelancer
    document.querySelector(".project-item .data#freelancer p").textContent = data.yearOfWorkFreelancer;
    document.querySelector(".project-item .data#freelancer h3").textContent = data.freelancer;
    document.querySelector(".project-item .data#freelancer #description").textContent = data.freelancerDescription;

   //exp u2t
   document.querySelector(".project-item .data#u2t p").textContent = data.yearOfWorkU2t;
   document.querySelector(".project-item .data#u2t h3").textContent = data.u2t;
   document.querySelector(".project-item .data#u2t #description").textContent = data.u2tDescription;


   //exp scs
   document.querySelector(".project-item .data#scs p").textContent = data.yearOfWorkScs;
   document.querySelector(".project-item .data#scs h3").textContent = data.scs;
   document.querySelector(".project-item .data#scs #description").textContent = data.scsDescription;

   document.querySelector("#skills .container h2").textContent = data.skills;
   document.querySelector("#contact .container h2").textContent = data.contact;

   document.querySelector("#contact-form #name_label").textContent = data.name_lable;
   document.querySelector("#contact #contact-form #email_label").textContent = data.email_lable;
   document.querySelector("#contact-form #message_label").textContent = data.message_lable;
   document.querySelector("#contact-form #submit_label").textContent = data.submit;
   document.getElementById('name').placeholder = data.name_placeholder;
   document.getElementById('email').placeholder = data.email_placeholder;
   document.getElementById('message').placeholder = data.message_placeholder;

    //document.getElementById('submit-btn').textContent = data.submit;
    document.getElementById('footer-text').textContent = data.footer;

    // อัปเดตข้อความปุ่มสลับธีม
    const themeToggle = document.getElementById('theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = data.light_mode;
    } else {
        themeToggle.textContent = data.dark_mode;
    }
}