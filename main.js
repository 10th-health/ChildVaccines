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
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    // Reset search results and selections
    if (tabName === 'vaccinationTable') {
        document.getElementById('vaccinationGrid').innerHTML = '';
        resetSelections();
    } else if (tabName === 'vaccinationCenters') {
        document.getElementById('result').innerHTML = '';
        resetSelections();
    }
}
