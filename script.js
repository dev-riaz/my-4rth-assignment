let interviewList = [];
let rejectList = [];
let currentStatus = 'all';


let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');
let jobsCount = document.getElementById('jobs-count')

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardsSection = document.getElementById('all-cards-section');
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filter-section')

// Dashboard count calculation
function calculate() {
    const cardCount = allCardsSection.querySelectorAll('.card-container').length;

    total.innerText = cardCount;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectList.length;

    if (currentStatus === 'interview-filter-btn') {
        jobsCount.innerText = interviewList.length + ' of 8 jobs';
    } else if (currentStatus === 'rejected-filter-btn') {
        jobsCount.innerText = rejectList.length + ' of 8 jobs';
    } else {
        jobsCount.innerText = cardCount + ' of 8 jobs';
    }

}
calculate();

// Filter tab toggle
function toggleStyle(id) {
    allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-[#FFFFFF]');
    interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-[#FFFFFF]');
    rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-[#FFFFFF]');

    allFilterBtn.classList.add('bg-[#ffffff]', 'text-[#64748B]');
    interviewFilterBtn.classList.add('bg-[#ffffff]', 'text-[#64748B]');
    rejectedFilterBtn.classList.add('bg-[#ffffff]', 'text-[#64748B]');

    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove('bg-[#ffffff]', 'text-[#64748B]');
    selected.classList.add('bg-[#3B82F6]', 'text-[#FFFFFF]');


    if (id === 'interview-filter-btn') {
        allCardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();

    } else if (id === 'all-filter-btn') {
        allCardsSection.classList.remove('hidden');
        filterSection.classList.add('hidden');

    } else if (id === 'rejected-filter-btn') {
        allCardsSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
    calculate();
};

// Event delegation for buttons
mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('interview-btn')) {
        const parentNode = (event.target.parentNode.parentNode.parentNode);
        const companyName = parentNode.querySelector('.company-name').innerText;
        const skill = parentNode.querySelector('.skill').innerText;
        const jobDetails = parentNode.querySelector('.job-details').innerText;
        const applied = parentNode.querySelector('.applied').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;


        parentNode.querySelector('.applied').innerText = 'INTERVIEW';
        const cardInfo = {
            companyName,
            skill,
            jobDetails,
            applied: 'INTERVIEW',
            jobDescription

        }

        const companyExit = interviewList.find(item => item.companyName === cardInfo.companyName)
        if (!companyExit) {
            interviewList.push(cardInfo);
        }

        rejectList = rejectList.filter(item => item.companyName !== cardInfo.companyName);

        calculate();

        if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }

    } else if (event.target.classList.contains('rejected-btn')) {
        const parentNode = (event.target.parentNode.parentNode.parentNode);
        const companyName = parentNode.querySelector('.company-name').innerText;
        const skill = parentNode.querySelector('.skill').innerText;
        const jobDetails = parentNode.querySelector('.job-details').innerText;
        const applied = parentNode.querySelector('.applied').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;

        parentNode.querySelector('.applied').innerText = 'REJECTED';
        const cardInfo = {
            companyName,
            skill,
            jobDetails,
            applied: 'REJECTED',
            jobDescription

        }

        const companyExit = rejectList.find(item => item.companyName === cardInfo.companyName)
        if (!companyExit) {
            rejectList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.companyName !== cardInfo.companyName);

        calculate();

        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        }

    } else if (event.target.closest('.delete-btn')) {
        const parentNode = (event.target.closest('.card-container'));
        const companyName = parentNode.querySelector('.company-name').innerText;

        interviewList = interviewList.filter(item => item.companyName !== companyName);

        rejectList = rejectList.filter(item => item.companyName !== companyName);

        parentNode.remove();
        calculate();

        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        } else if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }
        if (currentStatus === 'all' && allCardsSection.children.length === 0) {
            allCardsSection.innerHTML = `
            <div class=" bg-[#FFFFFF] text-center py-12 mt-6 border border-gray-500/20 rounded-[5px]">
                    <img class="block mx-auto" src="./image/jobs.png" alt="">
                    <h2 class=" text-[#002C5C] text-[24px] font-bold mt-3">No jobs available</h2>
                    <p class="text-[#64748B] text-[16px]">Check back soon for new job opportunities</p>
                </div>`;
            jobsCount.innerText = '0 jobs';
        }
    }

});


function renderInterview() {

    filterSection.innerHTML = '';
    if (interviewList.length < 1) {
        filterSection.innerHTML = ` <div class=" bg-[#FFFFFF] text-center py-12 border border-gray-500/20 rounded-[5px]">
                    <img class="block mx-auto" src="./image/jobs.png" alt="">
                    <h2 class=" text-[#002C5C] text-[24px] font-bold mt-3">No jobs available</h2>
                    <p class="text-[#64748B] text-[16px]">Check back soon for new job opportunities</p>
                </div>`;
        return;
    }

    for (let interview of interviewList) {
        let div = document.createElement('div')
        div.className = 'card-container container bg-[#FFFFFF] py-6 px-6 mt-6  border flex flex-col-reverse md:flex-row justify-between border-gray-500/20 rounded-[5px]'
        div.innerHTML = `
          <div>
                        <h3 class="company-name text-[#002C5C] text-[18px] font-semibold mt-3 md:mt-0">${interview.companyName}
                        </h3>
                        <p class="skill text-[#64748B] text-[16px] mb-3">${interview.skill}</p>
                        <p class="job-details text-[#64748B] text-[12px]">${interview.jobDetails}</p>
                        <div class="applied bg-[#EEF4FF] py-1 px-3 inline-block rounded-[5px] mt-3">${interview.applied}</div>
                        <p class="job-description text-[#323B49] text-[14px] mt-2">${interview.jobDescription}</p>
                        <div class="mt-4 space-x-2">
                            <button class="interview-btn btn btn-outline btn-success text-[#10B981] hover:text-white border-2 border-[#10B981]
                    text-[14px] font-semibold">Interview</button>
                            <button class="rejected-btn btn btn-outline btn-error text-[#EF4444] border-2 border-[#EF4444]
                    text-[14px] font-semibold hover:text-white">Rejected</button>
                        </div>
                    </div>
                    <div class="delete-btn rounded-full h-10 w-10 flex justify-center items-center
            border-gray-500/30 border">
                        <i class="fa-regular fa-trash-can"></i>
                    </div>
        `;
        filterSection.appendChild(div)
    }
};

function renderRejected() {
    filterSection.innerHTML = '';
    if (rejectList.length < 1) {
        filterSection.innerHTML = ` <div class=" bg-[#FFFFFF] text-center py-12 mb-6 border border-gray-500/20 rounded-[5px]">
                    <img class="block mx-auto" src="./image/jobs.png" alt="">
                    <h2 class=" text-[#002C5C] text-[24px] font-bold mt-3">No jobs available</h2>
                    <p class="text-[#64748B] text-[16px]">Check back soon for new job opportunities</p>
                </div>`;
        return;
    }

    for (let reject of rejectList) {
        let div = document.createElement('div')
        div.className = 'card-container container bg-[#FFFFFF] py-6 px-6 mt-6 mb-6 border flex flex-col-reverse md:flex-row justify-between border-gray-500/20 rounded-[5px]'
        div.innerHTML = `
          <div>
                        <h3 class="company-name text-[#002C5C] text-[18px] font-semibold mt-3 md:mt-0">${reject.companyName}
                        </h3>
                        <p class="skill text-[#64748B] text-[16px] mb-3">${reject.skill}</p>
                        <p class="job-details text-[#64748B] text-[12px]">${reject.jobDetails}</p>
                        <div class="applied bg-[#EEF4FF] py-1 px-3 inline-block rounded-[5px] mt-3">${reject.applied}</div>
                        <p class="job-description text-[#323B49] text-[14px] mt-2">${reject.jobDescription}</p>
                        <div class="mt-4 space-x-2">
                            <button class="interview-btn btn btn-outline btn-success text-[#10B981] hover:text-white border-2 border-[#10B981]
                    text-[14px] font-semibold">Interview</button>
                            <button class="rejected-btn btn btn-outline btn-error text-[#EF4444] border-2 border-[#EF4444]
                    text-[14px] font-semibold hover:text-white">Rejected</button>
                        </div>
                    </div>
                    <div class="delete-btn rounded-full h-10 w-10 flex justify-center items-center
            border-gray-500/30 border">
                        <i class="fa-regular fa-trash-can"></i>
                    </div>
        `;
        filterSection.appendChild(div)
    }
};


