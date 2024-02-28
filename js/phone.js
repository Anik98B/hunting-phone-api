const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones)

    // step:1- create an id
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more then 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    // console.log('is show all', isShowAll)

    // display only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone)
        // step:2- create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // step:3- set inner HTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
          </div>
        </div>
        `;
        // step:3- append child
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spiner
    toggleLoadingSpinner(false);
}
//
const handleShowDetails = async (id) => {
    // console.log('clicked show details', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    const phoneName = document.getElementById('show_detail_phone_name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show_detail_container');
    showDetailContainer.classList = `space-y-3`;
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt=""/>
        <p><span class="font-bold text-xm">Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p><span class="font-bold text-xm">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold text-xm">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
        <p><span class="font-bold text-xm">Memory: </span>${phone?.mainFeatures?.memory}</p>
        <p><span class="font-bold text-xm">Slug: </span>${phone?.slug}</p>
        <p><span class="font-bold text-xm">Release Date: </span>${phone?.releaseDate}</p>
        <p><span class="font-bold text-xm">Brand: </span>${phone?.brand}</p>
        <p><span class="font-bold text-xm">GPS: </span>${phone?.others?.GPS|| 'No GPS Available'}</p>
        <p><span class="font-bold text-xm">Sensors: </span>${phone?.mainFeatures?.sensors}</p>
    `

    //show the modal
    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

//  handle search recape
// const handleSearch2=()=>{
//     toggleLoadingSpinner(true);
//     const searchField= document.getElementById('search-field2');
//     const searchText=searchField.value;
//     loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true);
}

loadPhone()