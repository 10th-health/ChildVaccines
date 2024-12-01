function handleSearch() {
    const selectedAge = document.getElementById('ageSelect').value;
    const vaccinationGrid = document.getElementById('vaccinationGrid');
    vaccinationGrid.innerHTML = '';

    if (selectedAge && vaccinationData[selectedAge]) {
        vaccinationData[selectedAge].forEach(vaccine => {
            const card = document.createElement('div');
            card.className = 'vaccine-card';
            card.innerHTML = `
                <h3>${vaccine.name}</h3>
                <p><strong>المرض:</strong> ${vaccine.disease}</p>
                <p><strong>الجرعة:</strong> ${vaccine.dose}</p>
                <p><strong>طريقة الإعطاء:</strong> ${vaccine.method}</p>
            `;
            vaccinationGrid.appendChild(card);
        });
    } else if (selectedAge) {
        vaccinationGrid.innerHTML = '<p style="text-align: center;">لا توجد تطعيمات لهذا العمر</p>';
    }
}

function getAgeGroupDisplay(ageGroup) {
    switch(ageGroup) {
        case "0-9":
            return "من عمر يوم حتي 9 اشهر";
        case "12-18":
            return "سنة - سنة ونصف";
        case "TB":
            return "الدرن";
        default:
            return ageGroup;
    }
}

function search() {
    const ageGroup = document.getElementById('ageGroup').value;
    const day = document.getElementById('day').value;
    const center = document.getElementById('center').value;
    let resultHTML = '';

    if (!ageGroup && !day && !center) {
        resultHTML = '<p>الرجاء اختيار معيار واحد على الأقل للبحث</p>';
    } else {
        let results = [];

        for (let c in vaccinationCentersData) {
            if (center && c !== center) continue;
            
            for (let ag in vaccinationCentersData[c]) {
                if (ag === 'location') continue;
                if (ageGroup && ag !== ageGroup) continue;
                
                if (!day || vaccinationCentersData[c][ag].includes(day)) {
                    results.push({
                        center: c,
                        ageGroup: ag,
                        days: day ? [day] : vaccinationCentersData[c][ag],
                        location: vaccinationCentersData[c].location
                    });
                }
            }
        }

        if (results.length > 0) {
            resultHTML = '<table><tr><th>المركز الطبي</th><th>الفئة العمرية</th><th>الأيام المتاحة</th><th>الموقع</th></tr>';
            results.forEach(r => {
                resultHTML += `<tr><td>${r.center}</td><td>${getAgeGroupDisplay(r.ageGroup)}</td><td>${r.days.join(', ')}</td><td>${r.location ? `<a href="${r.location}" target="_blank">رابط الموقع</a>` : 'غير متوفر'}</td></tr>`;
            });
            resultHTML += '</table>';
        } else {
            resultHTML = '<p>لا توجد نتائج مطابقة للبحث</p>';
        }
    }

    document.getElementById('result').innerHTML = resultHTML;
}

function resetSelections() {
    document.getElementById('ageSelect').selectedIndex = 0;
    document.getElementById('ageGroup').selectedIndex = 0;
    document.getElementById('day').selectedIndex = 0;
    document.getElementById('center').selectedIndex = 0;
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");

    // إذا كان التاب هو حاسبة العمر، استعادة النتائج السابقة
    if (tabName === 'ageCalculator' && currentResults) {
        document.getElementById('birthDate').value = currentResults.birthDate;
        document.getElementById('ageResult').innerHTML = currentResults.ageResult;
        document.getElementById('vaccinationSchedule').innerHTML = currentResults.schedule;
    }
}

function calculateAge() {
    const birthDateInput = document.getElementById('birthDate');
    const ageResult = document.getElementById('ageResult');
    const vaccinationSchedule = document.getElementById('vaccinationSchedule');
    
    if (!birthDateInput.value) {
        ageResult.textContent = 'الرجاء إدخال تاريخ الميلاد';
        vaccinationSchedule.innerHTML = '';
        return;
    }

    const birthDate = new Date(birthDateInput.value);
    const today = new Date();

    // حساب الفرق بالأيام
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // حساب السنين والشهور والأيام
    let years = Math.floor(diffDays / 365);
    let remainingDays = diffDays % 365;
    let months = Math.floor(remainingDays / 30.44);
    let days = Math.floor(remainingDays % 30.44);
    
    // تنسيق النص بالعربية
    let ageText = '';
    if (years > 0) {
        ageText += `${years} سنة `;
    }
    if (months > 0 || years === 0) {
        ageText += `${months} شهر `;
    }
    ageText += `${days} يوم`;
    
    ageResult.textContent = `عمر الطفل: ${ageText}`;
    showAllVaccinationSchedule(birthDate);

    // حفظ النتائج الحالية
    currentResults = {
        birthDate: birthDateInput.value,
        ageResult: ageResult.innerHTML,
        schedule: vaccinationSchedule.innerHTML
    };
}

function clearResults() {
    document.getElementById('birthDate').value = '';
    document.getElementById('ageResult').innerHTML = '';
    document.getElementById('vaccinationSchedule').innerHTML = '';
    currentResults = null;
}

function showAllVaccinationSchedule(birthDate) {
    const vaccinationSchedule = document.getElementById('vaccinationSchedule');
    vaccinationSchedule.innerHTML = '<h3>جدول التطعيمات:</h3>';
    
    const schedules = [
        { age: 'الميلاد', months: 0 },
        { age: 'شهرين', months: 2 },
        { age: '4 شهور', months: 4 },
        { age: '6 شهور', months: 6 },
        { age: '9 شهور', months: 9 },
        { age: '12 شهر', months: 12 },
        { age: '18 شهر', months: 18 }
    ];

    schedules.forEach(schedule => {
        const vaccineDate = addMonths(birthDate, schedule.months);
        const today = new Date();
        const isPast = vaccineDate < today;
        
        const statusClass = isPast ? 'past-vaccine' : 'future-vaccine';
        const statusText = isPast ? 'موعد سابق' : 'موعد قادم';
        
        // الحصول على التطعيمات من قاعدة البيانات
        const vaccines = vaccinationData[schedule.age] || [];
        
        // الحصول على المراكز المقترحة
        const suggestedCenters = getSuggestedCenters(schedule.months, vaccineDate);
        const dayName = getDayName(vaccineDate);

        const html = `
            <div class="vaccination-item ${statusClass}">
                <div class="vaccine-timing">
                    <strong>العمر:</strong> ${schedule.age}
                    <br>
                    <strong>التاريخ:</strong> ${formatDateGregorian(vaccineDate)} (${dayName})
                    <br>
                    <span class="status-text">${statusText}</span>
                </div>
                <div class="vaccine-list">
                    <strong>التطعيمات:</strong>
                    <ul>
                        ${vaccines.map(vaccine => `<li>${vaccine.name} - ${vaccine.disease}</li>`).join('')}
                    </ul>
                </div>
                ${suggestedCenters ? `
                <div class="suggested-centers">
                    <strong>المراكز المقترحة:</strong>
                    ${suggestedCenters}
                </div>
                ` : ''}
            </div>
        `;
        vaccinationSchedule.innerHTML += html;
    });
}

function getSuggestedCenters(ageInMonths, vaccineDate) {
    const dayOfWeek = getDayName(vaccineDate);
    let ageGroup;
    
    if (ageInMonths === 0) {
        ageGroup = "TB";
    } else if (ageInMonths <= 9) {
        ageGroup = "0-9";
    } else {
        ageGroup = "12-18";
    }

    let suggestedCenters = [];
    
    // البحث عن المراكز المتاحة في نفس اليوم
    for (let center in vaccinationCentersData) {
        if (vaccinationCentersData[center][ageGroup] && 
            vaccinationCentersData[center][ageGroup].includes(dayOfWeek)) {
            suggestedCenters.push(`
                <div class="center-item available-today">
                    <span>${center} - متاح اليوم</span>
                    <a href="${vaccinationCentersData[center].location}" target="_blank">عرض الموقع</a>
                </div>
            `);
        }
    }

    if (suggestedCenters.length === 0) {
        // البحث عن المراكز المتاحة في اليوم السابق أو التالي
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const currentDayIndex = days.indexOf(dayOfWeek);
        const previousDay = days[(currentDayIndex - 1 + 7) % 7];
        const nextDay = days[(currentDayIndex + 1) % 7];

        for (let center in vaccinationCentersData) {
            const availableDays = vaccinationCentersData[center][ageGroup] || [];
            
            if (availableDays.includes(previousDay)) {
                suggestedCenters.push(`
                    <div class="center-item next-day">
                        <span>${center} - متاح يوم ${previousDay}</span>
                        <a href="${vaccinationCentersData[center].location}" target="_blank">عرض الموقع</a>
                    </div>
                `);
            }
            if (availableDays.includes(nextDay)) {
                suggestedCenters.push(`
                    <div class="center-item next-day">
                        <span>${center} - متاح يوم ${nextDay}</span>
                        <a href="${vaccinationCentersData[center].location}" target="_blank">عرض الموقع</a>
                    </div>
                `);
            }
        }

        if (suggestedCenters.length > 0) {
            return `
                <div class="no-centers-today">لا توجد مراكز متاحة في هذا اليوم</div>
                <div class="alternative-days">المراكز المتاحة في الأيام المجاورة:
                    ${suggestedCenters.join('')}
                </div>`;
        }
        return `<div class="no-centers-today">لا توجد مراكز متاحة في هذا اليوم أو الأيام المجاورة</div>`;
    }

    return `<div class="centers-available">المراكز المتاحة في نفس يوم استحقاق التطعيم:${suggestedCenters.join('')}</div>`;
}

function getDayName(date) {
    const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return days[date.getDay()];
}

function addMonths(date, months) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
}

function formatDateGregorian(date) {
    return date.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        calendar: 'gregory'
    });
}

let currentResults = null;
