let interviewList = [];
let rejectList = [];



let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allCardsSection = document.getElementById('all-cards-section');

function calculate() {
    total.innerText = allCardsSection.children.length;
    interviewCount = interviewList.length;
    rejectedCount = rejectList.length;
}
calculate();

// toggling
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');
const filterSection = document.getElementById('filter-section')
// console.log(allFilterBtn,interviewFilterBtn,rejectedFilterBtn);

function toggleStyle(id) {
    allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-[#FFFFFF]');
    interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-[#FFFFFF]');
    rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-[#FFFFFF]');

    allFilterBtn.classList.add('bg-[#ffffff]', 'text-[#64748B]');
    interviewFilterBtn.classList.add('bg-[#ffffff]', 'text-[#64748B]');
    rejectedFilterBtn.classList.add('bg-[#ffffff]', 'text-[#64748B]');

    const selected = document.getElementById(id);
    
    selected.classList.remove('bg-[#ffffff]', 'text-[#64748B]')
    selected.classList.add('bg-[#3B82F6]', 'text-[#FFFFFF]')

    if (id === 'interview-filter-btn') {
        allCardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
    } else if (id === 'rejected-filter-btn') {
        allCardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
    } else if (id === 'all-filter-btn'){
        allCardsSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
    }
}
