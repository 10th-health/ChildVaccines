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

        // Add smooth scroll for vaccination schedule
        window.scrollBy({
            top: 200,
            behavior: 'smooth'
        });
    } else if (selectedAge) {
        vaccinationGrid.innerHTML = '<p style="text-align: center;">لا توجد تطعيمات لهذا العمر</p>';
    }
}

function getAgeDisplayText(ageGroup) {
    const ageTexts = {
        "0-9": ["حديثي الولادة", "عمر شهرين", "عمر 4 شهور", "عمر 6 شهور", "عمر 9 شهور"],
        "12-18": ["عمر سنة", "عمر سنة ونصف"],
        "TB": ["الدرن"]
    };
    return ageTexts[ageGroup] || [ageGroup];
}

function search() {
    const ageGroup = document.getElementById('ageGroup').value;
    const day = document.getElementById('day').value;
    const center = document.getElementById('center').value;
    let resultHTML = '';

    let results = new Map(); // Using Map to group results by center

    for (let c in vaccinationCentersData) {
        if (center && c !== center) continue;
        
        for (let ag in vaccinationCentersData[c]) {
            if (ag === 'location') continue;
            
            // Handle the new age group matching
            let shouldInclude = false;
            if (!ageGroup) {
                shouldInclude = true;
            } else if (ag === "12-18" && (ageGroup === "12" || ageGroup === "18")) {
                shouldInclude = true;
            } else if (ageGroup === ag) {
                shouldInclude = true;
            }
            
            if (!shouldInclude) continue;
            
            if (!day || vaccinationCentersData[c][ag].includes(day)) {
                const key = `${c}|${day ? day : vaccinationCentersData[c][ag].join(', ')}|${vaccinationCentersData[c].location}`;
                
                if (!results.has(key)) {
                    results.set(key, {
                        center: c,
                        days: day ? [day] : vaccinationCentersData[c][ag],
                        location: vaccinationCentersData[c].location,
                        ages: new Set()
                    });
                }
                
                // Add appropriate age displays
                if (ag === "12-18") {
                    if (!ageGroup || ageGroup === "12") {
                        results.get(key).ages.add("عمر سنة");
                    }
                    if (!ageGroup || ageGroup === "18") {
                        results.get(key).ages.add("عمر سنة ونصف");
                    }
                } else {
                    const ageDisplays = ageGroup ? [getAgeGroupDisplay(ag)] : getAgeDisplayText(ag);
                    ageDisplays.forEach(age => results.get(key).ages.add(age));
                }
            }
        }
    }

    const resultElement = document.getElementById('result');
    
    if (results.size > 0) {
        resultHTML = '<table><tr><th>المركز الطبي</th><th>الفئة العمرية</th><th>الأيام المتاحة</th><th>الموقع</th></tr>';
        results.forEach(result => {
            const agesArray = Array.from(result.ages);
            resultHTML += `<tr>
                <td>${result.center}</td>
                <td>${agesArray.join(' - ')}</td>
                <td>${result.days.join(', ')}</td>
                <td>${result.location ? `<a href="${result.location}" target="_blank">رابط الموقع</a>` : 'غير متوفر'}</td>
            </tr>`;
        });
        resultHTML += '</table>';
    } else if (ageGroup || day || center) {
        resultHTML = '<p>لا توجد نتائج مطابقة للبحث</p>';
    }

    document.getElementById('result').innerHTML = resultHTML;

    // Simple scroll to results
    if (resultHTML) {
        window.scrollBy({
            top: 200,
            behavior: 'smooth'
        });
    }
}

function getAgeGroupDisplay(ageGroup) {
    // First get the selected text from the dropdown
    const ageSelect = document.getElementById('ageGroup');
    const selectedOption = Array.from(ageSelect.options).find(option => option.selected);
    
    if (selectedOption && selectedOption.value === ageGroup) {
        return selectedOption.text; // Return the actual text shown in the dropdown
    }
    
    switch(ageGroup) {
        case "12":
            return "عمر سنة";
        case "18":
            return "عمر سنة ونصف";
        case "TB":
            return "الدرن";
        default:
            return ageGroup;
    }
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

    // Clear results when leaving vaccination centers or vaccination table tabs
    if (tabName !== 'vaccinationCenters') {
        // Clear vaccination centers results
        document.getElementById('result').innerHTML = '';
        document.getElementById('ageGroup').selectedIndex = 0;
        document.getElementById('day').selectedIndex = 0;
        document.getElementById('center').selectedIndex = 0;
    }
    
    if (tabName !== 'vaccinationTable') {
        // Clear vaccination table results
        document.getElementById('vaccinationGrid').innerHTML = '';
        document.getElementById('ageSelect').selectedIndex = 0;
    }
    
    // إذا كان التاب هو حاسبة العمر، استعادة النتائج السابقة
    if (tabName === 'ageCalculator' && currentResults) {
        document.getElementById('birthDate').value = currentResults.birthDate;
        document.getElementById('ageResult').innerHTML = currentResults.ageResult;
        document.getElementById('vaccinationSchedule').innerHTML = currentResults.schedule;
    }
}

function calculateAge() {
    const birthDateInput = document.getElementById('birthDate').value;
    if (!birthDateInput) {
        alert('الرجاء إدخال تاريخ الميلاد');
        return;
    }

    const birthDate = new Date(birthDateInput);
    const today = new Date();

    let ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12;
    ageInMonths += today.getMonth() - birthDate.getMonth();

    if (today.getDate() < birthDate.getDate()) {
        ageInMonths--;
    }

    const years = Math.floor(ageInMonths / 12);
    const months = ageInMonths % 12;

    let ageText = '';
    if (years > 0) {
        ageText += `${years} سنة `;
    }
    if (months > 0) {
        ageText += `${months} شهر`;
    }
    if (years === 0 && months === 0) {
        const days = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
        ageText = `${days} يوم`;
    }

    document.getElementById('ageResult').innerHTML = `
        <h3>عمر طفلك:</h3>
        <p>${ageText}</p>
    `;

    showAllVaccinationSchedule(birthDate);
    currentResults = {
        birthDate: birthDateInput,
        age: ageText
    };

    // Add smooth scroll for age calculator results
    window.scrollBy({
        top: 200,
        behavior: 'smooth'
    });
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

function resetVaccinationSchedule() {
    // Reset the age select dropdown
    document.getElementById('ageSelect').selectedIndex = 0;
    // Clear the vaccination grid
    document.getElementById('vaccinationGrid').innerHTML = '';
}

let currentResults = null;

document.addEventListener('DOMContentLoaded', function() {
    const ageGroupSelect = document.getElementById('ageGroup');
    const daySelect = document.getElementById('day');
    const centerSelect = document.getElementById('center');
    const ageSelect = document.getElementById('ageSelect');

    // Add change event listeners to all select elements
    ageGroupSelect.addEventListener('change', search);
    daySelect.addEventListener('change', search);
    centerSelect.addEventListener('change', search);
    ageSelect.addEventListener('change', handleSearch); // Add listener for vaccination schedule
});

function resetSelections() {
    document.getElementById('ageSelect').selectedIndex = 0;
    document.getElementById('ageGroup').selectedIndex = 0;
    document.getElementById('day').selectedIndex = 0;
    document.getElementById('center').selectedIndex = 0;
    // Clear the results
    document.getElementById('result').innerHTML = '';
}
